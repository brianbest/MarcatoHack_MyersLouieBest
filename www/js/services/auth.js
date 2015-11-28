'use strict';

app.factory('Auth', function(FURL, $firebaseAuth, $firebaseObject, $state) {
  var ref = new Firebase(FURL);
  var auth = $firebaseAuth(ref);

  //var Auth = {
  //
  //  user: {},
  //
  //  createProfile: function(user){
  //    console.log('in createProfile', user);
  //      var profile ={
  //        name: user.twitter.displayName,
  //        gravatar: user.twitter.profileImageURL
  //      };
  //    console.log(profile);
  //
  //    return ref.child('profile').child(user.uid).set(profile);
  //  },
  //
  //
  //  //login: function(){
  //  //  console.log("we got to login function");
  //  //  ref.authWithOAuthRedirect('twitter', function(authData) {
  //  //
  //  //  }).catch(function(error) {
  //  //    if (error.code === 'TRANSPORT_UNAVAILABLE') {
  //  //      ref.authWithOAuthPopup('twitter', function (error, authData) {
  //  //        if (error) {
  //  //          console.log("Login Failed!", error);
  //  //        } else {
  //  //
  //  //          console.log("Authenticated successfully with payload:", authData);
  //  //          return Auth.createProfile(authData);
  //  //        }
  //  //      });
  //  //    }
  //  //  });
  //  //},
  //
  //  logout: function(){
  //    auth.$unauth();
  //  }
  //};
  //


  return auth;
});

