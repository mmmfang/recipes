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
    $http.get('/posts').success(function(data){
       controller.current_user_posts = data.posts;
    });
  };
      this.getPosts();
    

  // create 
  this.createPost = function(){
 
    //make a post to /transgressions
    $http.post('/posts', {
      authenticity_token: authenticity_token,
      //values from form
      post: {
        recipe_name: controller.recipe_name,
        ingredients: controller.ingredients,
        body: controller.body
      }
    }).success(function(data){
        console.log("post created and sent to db", data);
    }).error(function(error){
      console.log(error)
    }); 
        controller.getPosts();
        this.recipe_name = '',
        this.ingredients = '',
        this.body = '',

    this.getPosts();
  }


  this.editPost = function (post) {
      $http.patch('/posts/' + post.id, {
      authenticity_token: authenticity_token,
        post: {
          recipe_name: controller.recipe_name,
          ingredients: controller.ingredients,
          body: controller.body
        }
      }).then(function (response) {
          console.log("success updating post")
      }, function (error) { 
          console.log(error)
      });

    this.getPosts();
  };

  this.destroyPost = function (post) {
    $http.delete('/posts/' + post.id)
      .then(function (response) {
        var index = controller.posts.indexOf(post);
        controller.posts.splice(index, 1);
      }, function (error) {

      });

    this.getPosts();
  };

 
  // controller.getPosts();
}]);

