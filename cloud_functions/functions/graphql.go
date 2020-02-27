package scout

import (
	"context"
	"net/http"

	graphql "github.com/graph-gophers/graphql-go"
)

type resolver struct{}

type scoutResolver struct {
	Id        graphql.ID
	Firstname string
	Lastname  string
	Roles     *[]*roleResolver
	Skills    *[]string
	// rating: ReviewSummary
}

func (s *scoutResolver) Rating() *reviewSummaryResolver {
	return nil
}

type roleResolver struct {
	Title       *string
	Institution *string
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
	return &scoutResolver{
		Id:        args.ID,
		Firstname: "Bob",
		Lastname:  "Bobert",
	}, nil
}

type RoleInput struct {
	Title       *string `firebase:"Title"`
	Institution *string `firebase:"Institution"`
}

type ScoutInput struct {
	ID        graphql.ID
	Firstname string       `firebase:"FirstName"`
	Lastname  string       `firebase:"LastName"`
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
	_, err := doc.Set(ctx, args)
	if err != nil {
		return nil, err
	}
	return r.Scout(ctx, ScoutQueryArgs{ID: args.Scout.ID})
}

func HandleGraphQL(w http.ResponseWriter, r *http.Request) {
	h.ServeHTTP(w, r)
}
