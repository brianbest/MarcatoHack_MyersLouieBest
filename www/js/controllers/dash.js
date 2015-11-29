angular.module('starter.DashCtrl', [])

.controller('DashCtrl', function($scope, $ionicSlideBoxDelegate, $ionicPopup, $cordovaGeolocation, Auth, $location, Event, Coords, $state) {

    $scope.events = [];

	$scope.lat = 0.0;
	$scope.lng = 0.0;

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

		var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //console.log(latLng);

		var mapOptions = {
			center: latLng,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

		google.maps.event.addListenerOnce($scope.map, 'idle', function(){

			var marker = new google.maps.Marker({
				map: $scope.map,
				animation: google.maps.Animation.DROP,
				position: latLng
			});

		});

	}, function(error){
		console.log("Could not get location");
	});


  $scope.joinEvent = function(data){
    console.log('will join the event here', data);
    Event.attendEvent(data);
    $location.path('joinEvent/' + data);
  };

    Event.all().$loaded().then(function(data){
      $scope.events = data;

      for(i=0; i<data.length; i++){
        //console.log(data[i]);
        console.log(data[i].lat, data[i].lng);


      }
      console.log(data.lat, data.lng);


      console.log(data);
      setTimeout(function() {
        $ionicSlideBoxDelegate.slide(0);
        $ionicSlideBoxDelegate.update();
        //$scope.$apply();
      });
    });

    $scope.dropdown = function(){
        var confirmPopup = $ionicPopup.show({
          title: 'Settings',
          buttons: [
            {
              text: 'Logout',
              type: 'button-energized',
              onTap: function () {
                //user = $scope.user;
                Auth.logout();
              }
            },

            { text: 'Cancel' }
            ]
          //template: 'Are you sure you want to eat this ice cream?'
        });

      };


  $scope.addEvent = function(){
    console.log('adding Event');
    $state.go('addEvent')
  };

    //console.log('position is ', $scope.lat, $scope.lng);
  $scope.addNewEvent = function(event){
    console.log('position is ', $scope.x, $scope.y);
    console.log('saving Event to Database');
    console.log(Auth.user);
    console.log(Auth.user.profile);
    var newEvent = {
      creatorName: Auth.user.profile.name,
      creatorFace: Auth.user.profile.gravatar,
      creator: Auth.user.uid,
      title: event.title,
      lat:$scope.x,
      lng:$scope.y
    };
    console.log(newEvent);
    Event.createEvent(newEvent).then(function(){
      console.log('saved');

      $state.go('dash');

    })
  }
    setTimeout(function(){
      $scope.$apply();

    }, 3000)
});
