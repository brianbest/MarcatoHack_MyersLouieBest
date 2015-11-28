'use strict';

app.factory('Coords', function(FURL, $cordovaGeolocation, $firebaseObject, $state, Auth) {
  var ref = new Firebase(FURL);
  var user = Auth.user;

  var Coords = {

    updateCoords: function() {
      var options = {timeout: 10000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var coordinates = $firebaseObject(ref.child('coords').child(user.uid));
        coordinates.$loaded().then(function() {
          coordinates.lat = position.coords.latitude;
          coordinates.lng = position.coords.longitude;
          coordinates.$save().then(function() {
            return {lat: position.coords.latitude, lng: position.coords.longitude};
          });
        })

      }, function(error){
        console.log("Could not get location");
        return {lat: 0.0, lng: 0.0};
      });
    },
  };

  return Coords;
});

