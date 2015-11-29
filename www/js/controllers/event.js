'use strict';

app.controller('EventCtrl', function(FURL, $scope, Auth, Event, $ionicSlideBoxDelegate, $location, $state) {

  $scope.events = [];

  $scope.joinEvent = function(data){
    Event.attendEvent(data);
    $location.path('joinEvent/' + data);
  };


  $scope.addEvent = function(){
    console.log('adding Event');
    $state.go('addEvent');
  };

  Event.all().$loaded().then(function(data){
    $scope.events = data;
    setTimeout(function() {
      $ionicSlideBoxDelegate.slide(0);
      $ionicSlideBoxDelegate.update();
      $scope.$apply();
    });
  });

});
