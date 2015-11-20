var app = angular.module('recipeApp', []);

// Verifies the current_user
app.controller('HeaderController', ['$http', function($http){
  var controller = this;
  $http.get('/session').success(function(data){
    controller.current_user = data.current_user;
  });
}]);

//Recipes just save in browser, not persist to db
app.controller('CookbookController', function(){
  this.recipes =[
  { name: "cake",
    nutritional_fact: "there are 240calories",
    category: "dessert",
    ingredients: ["flour", "milk", "butter"],
    instructions:["Buy butter", "mix flour", "bake cake"]
    },
  { name: "steak",
    nutritional_fact: "there are 490 calories",
    category: "entree",
    ingredients: ["beef", "wine"],
    instructions:["Buy beef", "Put in pan", "Toast and eat"]
    }
  ]; console.log(this);
} 
);

app.controller('RecipeController', ['$scope', function($scope){
  this.addRecipe = function(){
    console.log("this is ", this);
    $scope.$parent.cookbook.recipes.push({
      name:this.name,
      nutritional_fact:this.nutritional_fact,
      category:this.category,
      ingredients:this.ingredients,
      instructions:this.instructions
    }) ;
    console.log("this for recipe is ", this);
    }     
}])


//TODO POST CODE

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
    // this.getPosts();

  // create 
  this.createPost = function(){
    console.log(controller.body);
    //make a post to /transgressions
    $http.post('/posts', {
      //include authenticity_token
      authenticity_token: authenticity_token,
      //values from form
      post: {
        date: controller.date,
        body: controller.body
      }
    }).success(function(data){
    //   controller.current_user_transgressions.pop();
    //   controller.current_user_transgressions.push(data.transgression);
    //   //...and begin refreshing transgression data
      controller.getPosts();
    });
  }



  this.updatePost = function (post) {
      $http.patch('/posts/' + post.id, {
        post: {
          date: controller.date,
          body: controller.body
        }
      }).then(function (response) {
        var index = controller.posts.indexOf(post);
       controller.posts[index].done = response.data.done;
      }, function (error) {

      });
  };

  this.destroyPost = function (post) {
    $http.delete('/posts/' + post.id)
      .then(function (response) {
        var index = controller.posts.indexOf(post);
        controller.posts.splice(index, 1);
      }, function (error) {

      });
  };

  // Finally, the controller starts with the current todos prefetched
  this.getPosts();
}]);

