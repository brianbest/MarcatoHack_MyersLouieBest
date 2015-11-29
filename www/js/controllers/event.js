'use strict';

app.controller('EventCtrl', function(FURL, $scope, Auth, Event, $ionicSlideBoxDelegate, $ionicPopup, $location, $state) {

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


});
