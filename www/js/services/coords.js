'use strict';

app.factory('Coords', function(FURL, $cordovaGeolocation, $firebaseArray, $firebaseObject, $firebase, $state, Auth) {
  var ref = new Firebase(FURL);
  var user = Auth.user;

  var Coords = {

    updateCoords: function() {
      var options = {timeout: 10000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var obj = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        //console.log(obj);

        ref.child('coords').child(Auth.user.uid).set(obj);

        return obj;

      }, function(error){
        console.log("Could not get location");
        return {lat: 0.0, lng: 0.0};
      });
    }
  };

  return Coords;
});

