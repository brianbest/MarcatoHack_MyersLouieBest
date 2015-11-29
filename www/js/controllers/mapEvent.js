angular.module('starter.MapEventCtrl', [])

  .controller('MapEventCtrl', function($scope, $ionicSlideBoxDelegate, $cordovaGeolocation, Auth, Event, $stateParams, Coords, $state){
    var eventId = $stateParams.eventId;
    //var userId = $stateParams.userId;
    //console.log(userId);
    console.log(eventId);

    if(eventId) {
      $scope.showJoinEvent = true;
      $scope.showAddEvent = false;
      Event.getEventgoers(eventId).$loaded().then(function(goers){
        console.log(goers.length);
        console.log(goers);
        $scope.goers = goers.length;
      });


      Event.getEvent(eventId).$loaded().then(function(event){
        console.log(event);
        $scope.face = event.creatorFace;
        $scope.name = event.creatorName;
      });

    }else{
      $scope.showJoinEvent = false;
      $scope.showAddEvent = true;
      //console.log('willl show add event info');

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
        Event.createEvent(newEvent).then(function(eventId){
          console.log('saved', eventId);

          $location.path('addEvent/' + eventId);

        })
      }
    }





  });
