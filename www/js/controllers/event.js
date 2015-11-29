'use strict';

app.controller('EventCtrl', function(FURL, $scope, Auth, Event, $ionicSlideBoxDelegate, $state) {
  
  $scope.events = [];

  $scope.joinEvent = function(data){
    Event.attendEvent(data).then(function(ref) {
      alert("Joined Event! We now need to move over to carol's module!");
    });
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
