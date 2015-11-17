class PostsController < ApplicationController
	def index
		@posts = Post.all
	end

	def create
		if session[:current_user_id]
			current_user=User.find(session[:current_user_id])
			post = current_user.posts.new(post_params)	

			if post.save
				render json: post
			else
				render json {
					error:true,
					message: post.errors.full_messages.to_sentence
				}
			end
		else
			redirect_to root_path
		end


	end

private

def post_params
	params.require(:post).permit(:date, :body)
end
