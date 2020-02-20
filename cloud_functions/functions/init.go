package scout

import (
	graphql "github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
)

var h *relay.Handler

func init() {
	s := SchemaString()
	schema := graphql.MustParseSchema(s, &query{})
	h = &relay.Handler{Schema: schema}
}
