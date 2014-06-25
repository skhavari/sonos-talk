![Screenshot](https://raw.githubusercontent.com/skhavari/sonos-talk/master/websrc/assets/screenshot.png)

Control Sonos with voice commands

### Status

* just started, don't expect much
* basic server/client framework up
* grunt build w/o
* visualizing microphone input
* voice input not being processed yet
* investigating sonos/ssdp/upnp go libraries

### Goal - Say Things Like...

* Play lullabies in the nursery
* Play Tom Sawyer in the studio
* Play Imagine Dragons in the backyard
* Group the entire house
* Pause All

### Getting Started

 * git, grunt, npm, go are required
 * `git clone https://github.com/skhavari/sonos-talk.git` to get the codes
 * `cd sonos-talk`
 * `npm install`
 * `go run server.go` to start the server
 * `grunt` to build the client
 * `https://localhost:8443` to open the client


### Tested Environments
* Chrome 35 on Mac OS 10.9.3
* Chrome 35 on Android 4.4.2 on SM-N900V
* ~~Safari or Chrome on iOS 6~~ **not working**