class AlterPostsTable < ActiveRecord::Migration
  def change
  	rename_column :posts, :date, :recipe_name
  	add_column :posts, :ingredients, :text
  end
end
