class Post < ActiveRecord::Base

	belongs_to :users

	validates :recipe_name, presence: true
  	validates :ingredients, presence: true
  	validates :body, presence: true

end
