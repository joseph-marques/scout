package scout

import (
	"context"
	"log"

	firebase "firebase.google.com/go"
	graphql "github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
)

var h *relay.Handler

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
	schema := graphql.MustParseSchema(s, &query{db: client})
	h = &relay.Handler{Schema: schema}
}
