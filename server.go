package main

//
//  No build for this yet.  To run:
//
//  run> go get github.com/ianr0bkny/go-sonos
//  run> go run server.go
//
//

import (
	"github.com/ianr0bkny/go-sonos"
	"github.com/ianr0bkny/go-sonos/ssdp"
	"log"
	"net/http"
)

const (
	// for sonos discovery
	// TODO: compute these automatically or use a config file
	TEST_DISCOVER_PORT = "13111"
	TEST_EVENTING_PORT = "13333"
	TEST_NETWORK       = "en0"

	// HTTPS server
	SSL_CERT_FILE = "./keys/cert.pem"
	SSL_KEY_FILE  = "./keys/key.pem"
	SSL_PORT      = ":8443"
)

//
// A Handler that wraps a handler so all calls to the handler are logged
//
func Log(handler http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s", r.Method, r.URL)
		handler.ServeHTTP(w, r)
	})
}

//
// Search for Sonos ZonePlayers
//
func DetectZP() (zonePlayers ssdp.DeviceMap, err error) {

	mgr, err := sonos.Discover(TEST_NETWORK, TEST_DISCOVER_PORT)
	if nil != err {
		return
	}

	zonePlayers = make(ssdp.DeviceMap)
	for uuid, device := range mgr.Devices() {
		if device.Product() == "Sonos" && device.Name() == "ZonePlayer" {
			zonePlayers[uuid] = device
		}
	}
	return
}

//
// Main
//
func main() {

	// light logging
	log.SetFlags(log.Ltime)

	log.Println("Detecting Sonos ZonePlayers")
	zonePlayers, err := DetectZP()
	if err != nil {
		log.Println("Error detecting Sonos ZonePlayers", err)
		return
	}
	log.Println("Detected", len(zonePlayers), "Sonos ZonePlayers")

	// serve files in ./webroot/
	handler := Log(http.FileServer(http.Dir("./webroot/")))

	// info msg
	log.Println("Listening securely on port ", SSL_PORT)

	// listen kinda securely
	log.Fatal(http.ListenAndServeTLS(SSL_PORT, SSL_CERT_FILE, SSL_KEY_FILE, handler))
}
