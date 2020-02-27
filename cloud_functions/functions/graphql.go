package scout

import (
	"context"
	"fmt"
	"net/http"
	"reflect"

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

	fmt.Printf("%+v", si)
	fmt.Printf("%+v", user)

	sr := &scoutResolver{
		ID:        args.ID,
		FirstName: si.FirstName,
		LastName:  si.LastName,
		Roles:     &[]*roleResolver{},
	}

	if roles, ok := user["Roles"].([]map[string]string); ok {
		for _, role := range roles {
			t := role["Title"]
			i := role["Institution"]
			*sr.Roles = append(*sr.Roles, &roleResolver{
				Title:       &t,
				Institution: &i,
			})
		}
	}

	if fn, ok := user["FirstName"].(string); ok {
		sr.FirstName = fn
	} else {
		fmt.Printf("%+v", sr)
		fmt.Println(user["FirstName"])
		fmt.Println(reflect.TypeOf(user["FirstName"]).String())
	}

	if ln, ok := user["LastName"].(string); ok {
		sr.LastName = ln
	}

	if s, ok := user["Skills"].(*[]string); ok {
		sr.Skills = s
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
	_, err := doc.Set(ctx, args)
	if err != nil {
		return nil, err
	}
	return r.Scout(ctx, ScoutQueryArgs{ID: args.Scout.ID})
}

func HandleGraphQL(w http.ResponseWriter, r *http.Request) {
	h.ServeHTTP(w, r)
}
