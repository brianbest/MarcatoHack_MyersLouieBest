angular.module('starter.MapEventCtrl', [])

  .controller('MapEventCtrl', function($scope, $ionicSlideBoxDelegate, $cordovaGeolocation, Auth, Event, $stateParams, Coords, $state){
    var eventId = $stateParams.eventId;
    console.log(eventId);
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




  });
