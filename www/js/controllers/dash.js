angular.module('starter.DashCtrl', [])

.controller('DashCtrl', function($scope, $cordovaGeolocation, Auth, Event, Coords, $state) {

	$scope.lat = 0.0;
	$scope.lng = 0.0;

	window.setInterval(function() {
		var coords = Coords.updateCoords();
		$scope.lat = coords.lat;
		$scope.lng = coords.lng;
	}, 10000);

	var options = {timeout: 10000, enableHighAccuracy: true};

	$cordovaGeolocation.getCurrentPosition(options).then(function(position){

		var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

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
  $scope.joinEvent = function(){
    console.log('will join the event here');
    //create an event
    //Event.attendEvent()
  }

   Event.getEvent('-K4FGcstpIZuuc4lQ9oE').$loaded().then(function(data){
       console.log('we got an event', data);
        $scope.eventCreator = data.creatorName;
        $scope.gravatar = data.creatorFace;
        $scope.place = data.title;
     });


  $scope.addEvent = function(){
    console.log('adding Event');
    $state.go('addEvent')
  }

  $scope.addNewEvent = function(event){
    console.log('saving Event to Database');
    console.log(Auth.user);
    console.log(Auth.user.profile);
    var newEvent = {
      creatorName: Auth.user.profile.name,
      creatorFace: Auth.user.profile.gravatar,
      creator: Auth.user.uid,
      title: event.title,
      lat:'',
      lng:''
    };
    console.log(newEvent);
    Event.createEvent(newEvent).then(function(){
      console.log('saved');
    })
  }
});
