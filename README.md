[![Screenshot](https://raw.githubusercontent.com/skhavari/sonos-talk/master/websrc/assets/screenshot.png)](https://www.youtube.com/watch?v=5-QxEMNEzmA)

**Description:** Control Sonos with voice commands

**Why:** Explore [AngularJS][angular], [Web Audio][h5a] & [Web Speech][h5s], [Go][go]

[angular]: https://angularjs.org/
[h5a]: http://www.w3.org/TR/webaudio/
[h5s]: https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html
[go]: http://golang.org

### Status

* basics aren't there yet...
* basic server/client framework up
* grunt build
* visualizing microphone input
* listen for speech input and display recognized text on the page
* detect sonos zone players on startup
* up next: find all sonos, simple sonos rest api, ui sugar

### Goal - Say Things Like...

* Play lullabies in the nursery
* Play Tom Sawyer in the studio
* Play Imagine Dragons in the backyard
* Group the entire house
* Pause All

### Getting Started

 * git, grunt, npm, go are required
 * `go get github.com/skhavari/sonos-talk`
 * `cd $GOPATH/src/github.com/skhavari/sonos-talk`
 * `npm install`
 * `sonos-talk` to start the server (assumes GOPATH/bin is in your PATH)
 * `grunt` to build the client
 * `https://localhost:8443` to open the client
 * You may need to turn IPV6 off on mac, go-sonos (dependency doesn't currently support it): `networksetup setv6off Wi-Fi`

### Tested Environments

* Chrome 35 on Mac OS 10.9.3
* Chrome 35 on Android 4.4.2 on SM-N900V
* ~~Safari or Chrome on iOS 6~~ **not working**
