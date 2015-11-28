'use strict';

app.factory('Event', function(FURL, $firebaseArray, $firebaseObject, $state, Auth) {
  var ref = new Firebase(FURL);
  var events = $firebaseArray(ref.child('events'));
  var user = Auth.user;

  var Event = {

    all: events,

    getEvent: function(eventId) {
      return $firebaseObject(ref.child('events').child(eventId));
    },

    createEvent: function(theEvent) {
      console.log(theEvent);
      theEvent.datetime = Firebase.ServerValue.TIMESTAMP;

      return events.$add(theEvent).then(function(newEvent) {
       var uniqueId = newEvent.key();

        var eventgoers = $firebaseArray(ref.child('event_goers').child(uniqueId));

        // Create Event-Goers lookup record
        var obj = {
          userId: Auth.user.uid
        };

        return eventgoers.$add(obj);
      });
    },

    attendEvent: function(eventId) {
      Event.getEvent(eventId)
        .$loaded()
        .then(function(theEvent) {

          var eventgoers = $firebaseArray(ref.child('event_goers').child(theEvent.title));

          // Create Event-Goers lookup record
          var obj = {
            userId: user.uid
          }

          return eventgoers.$add(obj);
        });
    },

    leaveEvent: function(eventId) {
      Event.getEvent(eventId)
        .$loaded()
        .then(function(theEvent) {

          //determine if the event is owned by the user, they cannot leave their own event
          if (theEvent.owner == user.uid) {

            // @TODO: time permitting, make this prettier
            alert("You cannot leave your own event");
          }
          else {
            var eventgoer = $firebaseObject(ref.child('event_goers').child(theEvent.title).child(user.uid));
            return eventgoers.$remove();
          }
        });
    }
  };

  return Event;
});

