'use strict';

app.factory('Auth', function(FURL, $firebaseAuth, $firebaseObject, $state) {
  var ref = new Firebase(FURL);
  var auth = $firebaseAuth(ref);

  var Auth = {

    user: {},

    createProfile: function(user){
      console.log('in createProfile', user);
        var profile ={
          name: user.twitter.displayName,
          gravatar: user.twitter.profileImageURL
        };
      console.log(profile);

      return ref.child('profile').child(user.uid).set(profile);
    },


    login: function() {
      console.log("we got to login function");
      ref.$authWithOAuthRedirect('twitter').then(function (authData) {
      }).catch(function (error) {
        if (error.code === 'TRANSPORT_UNAVAILABLE') {
          ref.$authWithOAuthPopup('twitter').then(function (authData) {
            if (error) {
              console.log("Login Failed!", error);
            } else {
              console.log("Authenticated successfully with payload:", authData);
              return Auth.createProfile(authData);
            }
          });
        }
      })
    },

    logout: function(){
      auth.$unauth();
    }
  };

  auth.$onAuth(function(authData){
    if(authData){
      Auth.user=authData;
      Auth.user.profile = $firebaseObject(ref.child('profile').child(authData.uid));
      console.log('the user has already logged in');
      //return auth;
      $state.go('dash');
    }else {
      $state.go('login');
    }

  });

  return Auth;
});

