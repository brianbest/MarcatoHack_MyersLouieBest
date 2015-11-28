'use strict';

app.controller('LoginCtrl', function(FURL, $scope, Auth) {
  $scope.twitterLogin = function(){
    console.log('twitter clicked');
    Auth.login().then(function(){
      console.log('will redirect to');
    });
  };

});
