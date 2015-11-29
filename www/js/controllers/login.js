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

  $scope.emailLogin = function(){
    console.log('button was clicked on login');
    $scope.user = {};
    console.log('showing popup');

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      templateUrl: 'templates/partials/login.html',
      title: 'Signin',
      scope: $scope,
      buttons: [
        { text: '<b>Login</b>',
          type: 'button-energized',
          onTap: function(user) {
            user = $scope.user;
            Auth.login(user).then(function(){
              $state.go('dash');
            }, function(err) {
              console.log('Error...', err);
            });
          }
        },
        {
          text: '<b>Register</b>',
          type: 'button-calm',
          onTap: function(user) {
            user = $scope.user;
            //register the user
            Auth.register(user).then(function(){
              console.log('user was registered successfully');
              $state.go('tab.dash');
            }, function(err) {
              console.log('Error...', err);
            });
          }
        }
      ]
    });
  };

});
