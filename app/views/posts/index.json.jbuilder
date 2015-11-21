json.posts(@posts) do |post|

	json.id          	@post.id
	json.recipe_name  	@post.recipe_name
	json.body       	@post.body
	json.ingredients 	@post.ingredients
	
end