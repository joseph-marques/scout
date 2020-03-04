package scout

import (
	"context"
	"fmt"
	"net/http"
	"time"

	graphql "github.com/graph-gophers/graphql-go"
)

type resolver struct{}

type scoutResolver struct {
	ID        graphql.ID          `firebase:"ID"`
	FirstName string              `firebase:"FirstName"`
	LastName  string              `firebase:"LastName"`
	Bio       string              `firebase:"Bio"`
	Roles     *[]*roleResolver    `firebase:"Roles"`
	Skills    *[]string           `firebase:"Skills"`
	IsListed  *bool               `firebase:"IsListed"`
	Services  *[]*serviceResolver `firebase:"Services"`
	// rating: ReviewSummary
}

type roleResolver struct {
	Title       *string `firebase:"Title"`
	Institution *string `firebase:"Institution"`
	Tenure      *string `firebase:"Tenure"`
}

func (s *scoutResolver) Rating() *reviewSummaryResolver {
	return nil
}

func (s *scoutResolver) Reviews(ctx context.Context) (*[]*reviewResolver, error) {
	reviews, err := db.Collection("Users").Doc(string(s.ID)).Collection("Reviews").Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	resolvers := []*reviewResolver{}
	for _, review := range reviews {
		rr := &reviewResolver{}
		if err := review.DataTo(rr); err != nil {
			return nil, err
		}
		resolvers = append(resolvers, rr)
	}

	return &resolvers, nil
}

type reviewResolver struct {
	AuthorID  graphql.ID `firebase:"Author"`
	SubjectID graphql.ID `firebase:"Subject"`
	Rating    float64    `firebase:"Rating"`
	Text      *string    `firebase:"Tenure"`
}

func (r *reviewResolver) Author(ctx context.Context) (*scoutResolver, error) {
	return (&resolver{}).Scout(ctx, ScoutQueryArgs{ID: r.AuthorID})
}

func (r *reviewResolver) Subject(ctx context.Context) (*scoutResolver, error) {
	return (&resolver{}).Scout(ctx, ScoutQueryArgs{ID: r.SubjectID})
}

func (s *scoutResolver) AppointmentsWithMe(ctx context.Context) (*[]*appointmentResolver, error) {
	reviews, err := db.Collection("Appointments").Where("With", "==", string(s.ID)).Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	resolvers := []*appointmentResolver{}
	for _, review := range reviews {
		ar := &appointmentResolver{}
		if err := review.DataTo(ar); err != nil {
			return nil, err
		}
		timeStr := ar.WhenInternal.Format(time.RFC3339)
		ar.When = &timeStr
		resolvers = append(resolvers, ar)
	}

	return &resolvers, nil
}

func (s *scoutResolver) AppointmentsWithOthers(ctx context.Context) (*[]*appointmentResolver, error) {
	reviews, err := db.Collection("Appointments").Where("Requester", "==", string(s.ID)).Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	resolvers := []*appointmentResolver{}
	for _, review := range reviews {
		ar := &appointmentResolver{}
		if err := review.DataTo(ar); err != nil {
			return nil, err
		}
		timeStr := ar.WhenInternal.Format(time.RFC3339)
		ar.When = &timeStr
		resolvers = append(resolvers, ar)
	}

	return &resolvers, nil
}

type appointmentResolver struct {
	When         *string
	WhenInternal *time.Time                     `firebase:"When"`
	Status       *appointmentStatus             `firebase:"Status"`
	ServiceID    graphql.ID                     `firebase:"Service"`
	RequesterID  graphql.ID                     `firebase:"Requester"`
	WithID       graphql.ID                     `firebase:"With"`
	Note         *string                        `firebase:"Note"`
	Comments     *[]*appointmentCommentResolver `firebase:"Comments"`
}

func (r *appointmentResolver) Requester(ctx context.Context) (*scoutResolver, error) {
	return (&resolver{}).Scout(ctx, ScoutQueryArgs{ID: r.RequesterID})
}

func (r *appointmentResolver) With(ctx context.Context) (*scoutResolver, error) {
	return (&resolver{}).Scout(ctx, ScoutQueryArgs{ID: r.WithID})
}

func (r *appointmentResolver) Service(ctx context.Context) (*serviceResolver, error) {
	s, err := (&resolver{}).Scout(ctx, ScoutQueryArgs{ID: r.WithID})
	if err != nil {
		return nil, err
	} else if s.Services == nil {
		return nil, fmt.Errorf("no service with id %q found", r.ServiceID)
	}

	for _, service := range *s.Services {
		if service != nil && service.ID == r.ServiceID {
			return service, nil
		}
	}
	return nil, fmt.Errorf("no service with id %q found", r.ServiceID)
}

type appointmentStatus int64

const (
	statusUnknown appointmentStatus = iota
	statusRequested
	statusConfirmed
	statusPast
)

type appointmentCommentResolver struct {
	AuthorID graphql.ID `firebase:"Author"`
	Comment  string     `firebase:"Comment"`
}

func (r *appointmentCommentResolver) Author(ctx context.Context) (*scoutResolver, error) {
	return (&resolver{}).Scout(ctx, ScoutQueryArgs{ID: r.AuthorID})
}

type serviceResolver struct {
	ID          graphql.ID `firebase:"ID"`
	Title       *string    `firebase:"Title"`
	Description *string    `firebase:"Description"`
	Price       *string    `firebase:"Price"`
}

type reviewSummaryResolver struct {
	// rating: Float
	// count: Int
}

func (r *reviewSummaryResolver) Rating() *float64 {
	rating := float64(0)
	return &rating
}

func (r *reviewSummaryResolver) Count() *int32 {
	c := int32(0)
	return &c
}

// ScoutQueryArgs are the arguments for the "scout" query.
type ScoutQueryArgs struct {
	// ID of the Scout.
	ID graphql.ID
}

func (r *resolver) Scout(ctx context.Context, args ScoutQueryArgs) (*scoutResolver, error) {
	doc := db.Collection("Users").Doc(string(args.ID))
	d, err := doc.Get(ctx)
	if err != nil {
		return nil, err
	}

	sr := &scoutResolver{}
	if err := d.DataTo(sr); err != nil {
		return nil, err
	}
	return sr, nil
}

// ScoutsQueryArgs are the arguments for the "scouts" query.
type ScoutsQueryArgs struct {
	// Skills of the scouts.
	Skills *[]string
	// NumScouts is the number of scouts to retrieve.
	NumScouts *int32
	// StartAfter is the scout ID to start after.
	StartAfter *graphql.ID
}

func (r *resolver) Scouts(ctx context.Context, args ScoutsQueryArgs) (*[]*scoutResolver, error) {
	users := db.Collection("Users")
	q := users.Where("IsListed", "==", true)
	if args.Skills != nil {
		for _, skill := range *args.Skills {
			q = users.Where("skills", "array-contains", skill)
		}
	}
	if args.NumScouts != nil {
		q = q.Limit(int(*args.NumScouts))
	}
	if args.StartAfter != nil {
		d, err := users.Doc(string(*args.StartAfter)).Get(ctx)
		if err != nil {
			return nil, err
		}
		q = q.StartAfter(d)
	}

	docs, err := q.Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	resolvers := []*scoutResolver{}
	for _, doc := range docs {
		sr := &scoutResolver{}
		if err := doc.DataTo(sr); err != nil {
			return nil, err
		}
		resolvers = append(resolvers, sr)
	}

	return &resolvers, nil
}

type RoleInput struct {
	Title       *string `firebase:"Title"`
	Institution *string `firebase:"Institution"`
	Tenure      *string `firebase:"Tenure"`
}

type ServiceInput struct {
	ID          graphql.ID `firebase:"ID"`
	Title       *string    `firebase:"Title"`
	Description *string    `firebase:"Description"`
	Price       *string    `firebase:"Price"`
}

type ScoutInput struct {
	ID        graphql.ID      `firebase:"ID"`
	FirstName string          `firebase:"FirstName"`
	LastName  string          `firebase:"LastName"`
	Bio       string          `firebase:"Bio"`
	Roles     *[]RoleInput    `firebase:"Roles"`
	Skills    *[]string       `firebase:"Skills"`
	Services  *[]ServiceInput `firebase:"Services"`
	IsListed  *bool           `firebase:"IsListed"`
}

// UpdateScoutQueryArgs are the arguments for the "scout" query.
type UpdateScoutQueryArgs struct {
	// The scout to update.
	Scout *ScoutInput
}

func (r *resolver) UpdateScout(ctx context.Context, args UpdateScoutQueryArgs) (*scoutResolver, error) {
	// VERIFY PERMISSIONS HERE
	doc := db.Collection("Users").Doc(string(args.Scout.ID))
	_, err := doc.Set(ctx, args.Scout)
	if err != nil {
		return nil, err
	}
	return r.Scout(ctx, ScoutQueryArgs{ID: args.Scout.ID})
}

type ReviewScoutArgs struct {
	Review *ReviewInput
}

type ReviewInput struct {
	Author  graphql.ID `firebase:"Author"`
	Subject graphql.ID `firebase:"Subject"`
	Rating  float64    `firebase:"Rating"`
	Text    *string    `firebase:"Text"`
}

func (r *resolver) ReviewScout(ctx context.Context, args ReviewScoutArgs) (bool, error) {
	// ADD AUTHENTICATION HERE
	doc := db.Collection("Users").Doc(string(args.Review.Subject)).Collection("Reviews").Doc(string(args.Review.Author))
	_, err := doc.Set(ctx, args.Review)
	if err != nil {
		return false, err
	}
	return true, err
}

func HandleGraphQL(w http.ResponseWriter, r *http.Request) {
	h.ServeHTTP(w, r)
}
