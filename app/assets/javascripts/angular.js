var app = angular.module('weatherApp', ['ngRoute'])

// Verifies the current_user
app.controller('HeaderController', ['$http', function($http){
  var controller = this;
  $http.get('/session').success(function(data){
    controller.current_user = data.current_user;
  });
}]);


app.controller('PostController', ['$http', function($http){
  //get authenticity_token from DOM (rails injects it on load)
  // var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  var controller = this;

  // this.getTransgressions = function(){
  //   // get transgressions for current User
  //   $http.get('/transgressions').success(function(data){
  //     //just add the transgressions to the controller, data comes back with sinner as well
  //     controller.current_user_transgressions = data.transgressions;
  //   });
  // }
  //fetch transgression data for current user as TransgressionsController initializes
  // this.getTransgressions();

  // create a transgression
  this.createPost = function(){
    console.log(controller.body);
    //make a post to /transgressions
    $http.post('/posts', {
    //   //include authenticity_token
    //   authenticity_token: authenticity_token,
    //   //values from form
      post: {
        date: controller.date,
        body: controller.body
      }
    }).success(function(data){
    //   //once response to create transgression comes back,
    //   //pop off what was pushed at beginning of this.createTransgression
    //   //push the response's data on...
    //   controller.current_user_transgressions.pop();
    //   controller.current_user_transgressions.push(data.transgression);
    //   //...and begin refreshing transgression data
      controller.getTransgressions();
    });
  }
}]);
