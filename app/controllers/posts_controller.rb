class PostsController < ApplicationController

before_action :require_current_user
  skip_before_action :verify_authenticity_token, only: :destroy

	def index
		@posts = current_user.posts
	end

	def create
		# if session[:current_user_id]
		# 	current_user=User.find(session[:current_user_id])
		@post = current_user.posts.new(post_params)	

		if @post.save
			# render json: post
		else
     		render json: {
        		error: {
				message: @post.errors.full_messages.to_sentence
				}
			}
		end
		# else
		#end
	end

  	def update
   		@post = Post.find(params[:id])

    	if @post.update(post_params)
    		render json: @post
  		else
     		render json: {
        		error: {
          		message: @post.errors.full_messages.to_sentence
        	}
      	}
    	end
  	end

	def destroy
    	@post = Post.find(params[:id])
    	@post.destroy

    	respond_to do |format|
      	  format.json { :@post }
    	end
  	end



private

def post_params
	params.require(:post).permit(:date, :body)
end

end