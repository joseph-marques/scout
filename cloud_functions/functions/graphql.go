package scout

import (
	"context"
	"net/http"

	graphql "github.com/graph-gophers/graphql-go"
)

type resolver struct{}

type scoutResolver struct {
	ID        graphql.ID       `firebase:"ID"`
	FirstName string           `firebase:"FirstName"`
	LastName  string           `firebase:"LastName"`
	Roles     *[]*roleResolver `firebase:"Roles"`
	Skills    *[]string        `firebase:"Skills"`
	// rating: ReviewSummary
}

func (s *scoutResolver) Rating() *reviewSummaryResolver {
	return nil
}

type roleResolver struct {
	Title       *string `firebase:"Title"`
	Institution *string `firebase:"Institution"`
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

type RoleInput struct {
	Title       *string `firebase:"Title"`
	Institution *string `firebase:"Institution"`
}

type ScoutInput struct {
	ID        graphql.ID   `firebase:"ID"`
	FirstName string       `firebase:"FirstName"`
	LastName  string       `firebase:"LastName"`
	Roles     *[]RoleInput `firebase:"Roles"`
	Skills    *[]string    `firebase:"Skills"`
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
	Rating  *float64   `firebase:"Rating"`
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
