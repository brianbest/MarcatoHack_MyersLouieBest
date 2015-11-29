'use strict';

app.controller('LoginCtrl', function(FURL, $scope, Auth, $state) {
  console.log('brians line');
  //
  //Auth.$onAuth(function(authData){
  //  if(authData){
  //    //Auth.user=authData;
  //    //Auth.user.profile = $firebaseObject(ref.child('profile').child(authData.uid));
  //    console.log('the user has already logged in');
  //    $state.go('dash');
  //  }else {
  //    $state.go('login');
  //  }
  //
  //});

  $scope.twitterLogin = function(){
    Auth.login();



  };

});
