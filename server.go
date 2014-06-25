package main

import (
	"log"
	"net/http"
)

func Log(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s", r.Method, r.URL)
		handler.ServeHTTP(w, r)
	})
}

func main() {

	log.SetFlags(log.Ltime | log.Lshortfile)

	cert := "./keys/cert.pem"
	key := "./keys/key.pem"
	port := ":8443"
	handler := Log(http.FileServer(http.Dir("./webroot/")))

	log.Println("Listening securely on port ", port)

	// without HTTPS chrome prompts every time for microphone access
	// with HTTPS it remembers the users choice
	log.Fatal(http.ListenAndServeTLS(port, cert, key, handler))
}
