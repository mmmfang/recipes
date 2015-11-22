var app = angular.module('recipeApp', []);

// User controller
app.controller('UserController', ['$http', function($http){
  var controller = this;
  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  $http.get('/session').success(function(data){
    controller.current_user = data.current_user;
  });

  // this.logout = function() {
  //   $http.delete('/session').success(function() {
  //      authenticity_token: authenticity_token;
  //     console.log("user logged out");
  //   })
  // }    

}]);


//CRUD

app.controller('PostController', ['$http', function($http){
  //get authenticity_token from DOM (rails injects it on load)
  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  var controller = this;

  this.getPosts = function(){
    // get transgressions for current User
    $http.get('/posts').success(function(data){
       controller.current_user_posts = data.posts;
    });
  }
    this.getPosts();

  // create 
  this.createPost = function(){
    console.log(controller);
    //make a post to /transgressions
    $http.post('/posts', {

      authenticity_token: authenticity_token,
      //values from form
      post: {
        recipe_name: controller.new_recipe_name,
        ingredients: controller.new_ingredients,
        body: controller.new_body
      }
    }).success(function(data){
        console.log("data for createPOst", data)
       controller.getPosts();
    });
  }



  // this.updatePost = function (post) {
  //     $http.patch('/posts/' + post.id, {
  //       post: {
  //         recipe_name: controller.recipe_name,
  //         ingredients: controller.ingredients,
  //         body: controller.body
  //       }
  //     }).then(function (response) {
  //       var index = controller.posts.indexOf(post);
  //      controller.posts[index].done = response.data.done;
  //     }, function (error) {

  //     });
  // };

  // this.destroyPost = function (post) {
  //   $http.delete('/posts/' + post.id)
  //     .then(function (response) {
  //       var index = controller.posts.indexOf(post);
  //       controller.posts.splice(index, 1);
  //     }, function (error) {

  //     });
  // };

  // Finally, the controller starts with the current todos prefetched
  this.getPosts();
}]);

