angular.module('starter.MapEventCtrl', [])

  .controller('MapEventCtrl', function(FURL, $scope, $ionicSlideBoxDelegate, $cordovaGeolocation, $firebaseObject, Auth, Event, $stateParams, Coords, $state){
    var ref = new Firebase(FURL);
    $scope.lat = 0.0;
    $scope.lng = 0.0;
    var eventId = $stateParams.eventId;
    var markers = [];

    window.setInterval(function() {
      Coords.updateCoords().then(function(coords) {
        $scope.lat = coords.lat;
        $scope.lng = coords.lng;
      });
    }, 10000);

    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
      console.log(position.coords.latitude);
      $scope.x = position.coords.latitude;
      $scope.y = position.coords.longitude;

      // center of map
      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      google.maps.event.addListenerOnce($scope.map, 'idle', function(){

        // var marker = new google.maps.Marker({
        //   map: $scope.map,
        //   position: latLng
        // });


        if(eventId) {
          Event.getEventgoers(eventId).$loaded().then(function(goers){
            $scope.goers = goers.length;

            for (var i = 0; i < goers.length; i++) {
              var theUserId = goers.$keyAt(i);
              $firebaseObject(ref.child('coords').child(theUserId)).$loaded().then(function(coordinates) {

                var newLatLng = new google.maps.LatLng(coordinates.lat, coordinates.lng);
                var marker = new google.maps.Marker({
                  map: $scope.map,
                  label: coordinates.name,
                  position: newLatLng
                });

                markers.push(marker);
              }); 
            }

            console.log('loaded!');

            window.setInterval(function() {

              // Call set markers to re-add markers
              Event.getEventgoers(eventId).$loaded().then(function(newgoers){
                // Loop through markers and set map to null for each
                for (var j = 0; j < markers.length; j++) {
                    markers[j].setMap(null);
                }

                // Reset the markers array
                markers = [];

                $scope.newgoers = newgoers.length;

                for (var k = 0; k < newgoers.length; k++) {
                  var theUserId = newgoers.$keyAt(k);
                  $firebaseObject(ref.child('coords').child(theUserId)).$loaded().then(function(coordinates) {

                    var newLatLng = new google.maps.LatLng(coordinates.lat, coordinates.lng);
                    var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: newLatLng,
                      label: coordinates.name,
                    });

                    markers.push(marker);
                  }); 
                }
              });
              
            }, 10000);
          });
        }
        else {
          var marker = new google.maps.Marker({
            map: $scope.map,
            position: latLng
          });
        }

      });

    }, function(error){
      console.log("Could not get location");
    });

    if(eventId) {
      $scope.showJoinEvent = true;
      $scope.showAddEvent = false;

      Event.getEvent(eventId).$loaded().then(function(event){
        console.log(event);
        $scope.face = event.creatorFace;
        $scope.name = event.creatorName;
      });
    }else{
      $scope.showJoinEvent = false;
      $scope.showAddEvent = true;
      console.log('willl show add event info');
    }





  });
