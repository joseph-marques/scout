package scout

import (
	"cloud.google.com/go/firestore"
	graphql "github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
)

var h *relay.Handler
var db *firestore.Client

func init() {
	s := SchemaString()
	ctx := context.Background()
	conf := &firebase.Config{ProjectID: "scout-268717"}
	app, err := firebase.NewApp(ctx, conf)
	if err != nil {
		log.Fatalln(err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	db = client

	opts := []graphql.SchemaOpt{graphql.UseFieldResolvers()}
	schema := graphql.MustParseSchema(s, &resolver{}, opts...)
	h = &relay.Handler{Schema: schema}
}
