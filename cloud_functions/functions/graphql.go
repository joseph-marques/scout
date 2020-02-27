package scout

import (
	"context"
	"net/http"

	graphql "github.com/graph-gophers/graphql-go"
)

type resolver struct{}

type scoutResolver struct {
	ID        graphql.ID
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

	si := ScoutInput{ID: args.ID}
	if err := d.DataTo(&si); err != nil {
		return nil, err
	}
	user := d.Data()

	sr := &scoutResolver{
		ID:    args.ID,
		Roles: &[]*roleResolver{},
	}

	if roles, ok := user["Roles"].([]map[string]interface{}); ok {
		for _, role := range roles {
			t := role["Title"].(string)
			i := role["Institution"].(string)
			*sr.Roles = append(*sr.Roles, &roleResolver{
				Title:       &t,
				Institution: &i,
			})
		}
	}

	if fn, ok := user["FirstName"].(string); ok {
		sr.FirstName = fn
	}

	if ln, ok := user["LastName"].(string); ok {
		sr.LastName = ln
	}

	if skills, ok := user["Skills"].([]interface{}); ok {
		skillStr := []string{}
		for _, s := range skills {
			skillStr = append(skillStr, s.(string))
		}
		sr.Skills = &skillStr
	}

	return sr, nil
}

type RoleInput struct {
	Title       *string `firebase:"Title"`
	Institution *string `firebase:"Institution"`
}

type ScoutInput struct {
	ID        graphql.ID   `firebase:"-"`
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

func HandleGraphQL(w http.ResponseWriter, r *http.Request) {
	h.ServeHTTP(w, r)
}
