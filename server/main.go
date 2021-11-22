package main

import (
	"fmt"
	"net/http"

	"github.com/implocell/dev-lib/controllers"
	"github.com/implocell/dev-lib/db"
)

func main() {
	// create the db instance
	db.InitDB()

	http.HandleFunc("/", HelloServer)
	http.HandleFunc("/user/get", controllers.FindUser)
	http.HandleFunc("/user/create", controllers.CreateUser)
	http.ListenAndServe(":5000", nil)
}

func HelloServer(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
}
