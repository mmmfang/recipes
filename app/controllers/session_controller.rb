class SessionController < ApplicationController
  # skip_before_action :verify_authenticity_token, only: :create

  def create
    user = User.find_by(email: user_params[:email])

    if user && user.authenticate(user_params[:password])
 
      token = SecureRandom.urlsafe_base64

      session[:session_token] = token
      user.update(session_token: token)

      flash[:message] = "Thanks for logging in."
      redirect_to application_angular_path
    else
      flash[:message] = "Email / Password combo does not exist!"
      redirect_to root_path
    end

  end

  def current_user
  #   if session[:current_user_id]
  #     current_user = User.includes(:posts)
  #                   .find(session[:current_user_id])
  #     render json: {
  #       email: current_user.email,
  #       posts: current_user.posts
  #     }
  #   else
  #     render json: {
  #       error: true,
  #       message:"User not logged in"
  #     }
  #   end
  end

  def destroy
    log_out!

    redirect_to root_path
  end


  private

  def user_params
    return params.require(:user).permit(:email, :password)
  end
end