'use strict';

app.factory('Coords', function(FURL, $cordovaGeolocation, $firebaseArray, $firebaseObject, $firebase, $state, $q, Auth) {
  var ref = new Firebase(FURL);
  var user = Auth.user;

  var Coords = {

    updateCoords: function() {
      var defer = $q.defer();

      var options = {timeout: 10000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        var obj = {
          name: Auth.user.profile.name,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        //console.log(obj);

        ref.child('coords').child(Auth.user.uid).set(obj);
        defer.resolve(obj);

      }, function(error){
        console.log("Could not get location");
        defer.resolve({lat: 0.0, lng: 0.0});
      });

      return defer.promise;
    }
  };

  return Coords;
});

