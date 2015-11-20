json.recipes(@recipes) do |recipe|

json.id          @recipe.id
json.date 		 @recipe.date
json.body        @recipe.body
end