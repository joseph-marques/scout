package scout

import (
	"net/http"

	"cloud.google.com/go/firestore"
)

type query struct {
	db firestore.Client
}

func (_ *query) Hello() string {
	return "Hello, world!"
}

func (q *query) Scout(ctx *context.Context, args) {}

func HandleGraphQL(w http.ResponseWriter, r *http.Request) {
	h.ServeHTTP(w, r)
}
