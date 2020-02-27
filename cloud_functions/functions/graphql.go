package scout

import (
	"context"
	"net/http"

	"cloud.google.com/go/firestore"
	graphql "github.com/graph-gophers/graphql-go"
)

type query struct {
	db *firestore.Client
}

type scoutResolver struct {
	Id        graphql.ID
	Firstname string
	Lastname  string
	// roles: [Role!]
	Skills *[]string
	// rating: ReviewSummary
}

type RoleInput struct {
	Title       *string
	Institution *string
}

type ScoutInput struct {
	ID        graphql.ID
	Firstname *string
	Lastname  *string
	Roles     *[]RoleInput
	Skills    *[]string
}

func (s *scoutResolver) Roles() *[]*roleResolver {
	return nil
}

func (s *scoutResolver) Rating() *reviewSummaryResolver {
	return nil
}

type roleResolver struct {
	//title: String
	//institution: String
}

func (r *roleResolver) Title() *string {
	title := "title"
	return &title
}

func (r *roleResolver) Institution() *string {
	i := "place"
	return &i
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
	Id graphql.ID
}

func (_ *query) Hello() string {
	return "Hello, world!"
}

func (q *query) Scout(ctx context.Context, args ScoutQueryArgs) *scoutResolver {
	return &scoutResolver{
		Id:        args.Id,
		Firstname: "Bob",
		Lastname:  "Bobert",
	}
}

// UpdateScoutQueryArgs are the arguments for the "scout" query.
type UpdateScoutQueryArgs struct {
	// ID of the Scout.
	Id    graphql.ID
	Scout *ScoutInput
}

func (q *query) UpdateScout(ctx context.Context, args UpdateScoutQueryArgs) *scoutResolver {
	return &scoutResolver{
		Id:        args.Id,
		Firstname: "Bob",
		Lastname:  "Bobert",
	}
}

func HandleGraphQL(w http.ResponseWriter, r *http.Request) {
	h.ServeHTTP(w, r)
}
