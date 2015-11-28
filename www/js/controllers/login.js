'use strict';

app.controller('LoginCtrl', function(FURL, $scope, Auth, $state) {
  console.log('brians line');
  $scope.twitterLogin = function(){

    console.log('twitter clicked');
    Auth.$authWithOAuthRedirect('twitter').then(function(authData) {
      console.log('we are in the authwithoauth');
      $state.go('dash');
      }).catch(function(error) {
        if (error.code === 'TRANSPORT_UNAVAILABLE') {
          Auth.$authWithOAuthPopup('twitter').then(function (error, authData) {
            if (error) {
              console.log("Login Failed!", error);
            } else {

              console.log("Authenticated successfully with payload:", authData);
              $state.go('dash');
              //return Auth.createProfile(authData);
            }
          });
        }
      });

  };

});
