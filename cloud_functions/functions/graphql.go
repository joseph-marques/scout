package scout

import (
	"net/http"
)

type query struct{}

func (_ *query) Hello() string { return "Hello, world!" }

func HandleGraphQL(w http.ResponseWriter, r *http.Request) {
	h.ServeHTTP(w, r)
}
