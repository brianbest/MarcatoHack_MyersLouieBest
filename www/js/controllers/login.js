'use strict';

app.controller('LoginCtrl', function(FURL, $scope, Auth, $state) {
  console.log('brians line');

  Auth.$onAuth(function(authData){
    if(authData){
      //Auth.user=authData;
      //Auth.user.profile = $firebaseObject(ref.child('profile').child(authData.uid));
      console.log('the user has already logged in');
      $state.go('dash');
    }else {
      $state.go('login');
    }

  });

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
