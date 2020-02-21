package scout

import (
	"net/http"

	"cloud.google.com/go/firestore"
	graphql "github.com/graph-gophers/graphql-go"
)

type query struct {
	db firestore.Client
}

type scoutResolver struct {
	id *graphql.ID
    firstname *string
    lastname *string
    // roles: [Role!]
    // skills: [String!]
    // rating: ReviewSummary
}

func (s *scoutResolver) Id() *graphql.ID {
	return id
}

func (s *scoutResolver) Firstname() *string {
	return "bob"
}

func (s *scoutResolver) Lastname() *string {
	returb "bobert"
}

func (s *scoutResolver) Roles() *[]*roleResolver {
	return nil
}

func (s *scoutResolver) Skills() *[]*string {
	return nil
}

func (s *scoutResolver) Roles() *reviewSummaryResolver {
	return nil
}

type roleResolver struct {
	//title: String
    //institution: String
}

func (r *roleResolver) Title() *string {
	return "title"
}

func (r *roleResolver) Institution() *string {
	return "place"
}

type reviewSummaryResolver struct {
	// rating: Float
	// count: Int
}

func (r *reviewSummaryResolver) Rating() *float64 {
	return 0
}

func (r *reviewSummaryResolver) Count() *int {
	return 0
}


// ScoutQueryArgs are the arguments for the "scout" query.
type ScoutQueryArgs struct {
	// ID of the Scout.
	Id *graphql.ID
}

func (_ *query) Hello() string {
	return "Hello, world!"
}

func (q *query) Scout(ctx *context.Context, args) {

}

func HandleGraphQL(w http.ResponseWriter, r *http.Request) {
	h.ServeHTTP(w, r)
}
