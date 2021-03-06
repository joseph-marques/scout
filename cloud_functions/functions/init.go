package scout

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	graphql "github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
)

var h *relay.Handler
var db *firestore.Client

func init() {
	s := SchemaString()
	opts := []graphql.SchemaOpt{graphql.UseFieldResolvers()}
	schema := graphql.MustParseSchema(s, &resolver{}, opts...)
	h = &relay.Handler{Schema: schema}

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
}
