class SessionController < ApplicationController
  #skip_before_action :verify_authenticity_token, only: :create

  def create
    user = User.find_by(email: user_params[:email])

      if user && user.authenticate(user_params[:password])
      session[:current_user_id] = user.id

      # token = SecureRandom.urlsafe_base64

      # session[:session_token] = token
      # user.update(session_token: token)

      flash[:message] = "Thanks for logging in."
      redirect_to application_angular_path
    else
      flash[:message] = "Email / Password combo does not exist!"
      redirect_to root_path
    end

  end


  def current_user
    if session[:current_user_id]
      @current_user = User.find(session[:current_user_id])
    else
      @current_user = nil
    end
    # if session[:session_token]
    #   @current_user ||= User.find_by(session_token: session[:session_token])
    # else
    #   @current_user = nil
    # end
  end

  def destroy
    session[:current_user_id] = nil
    # session[:session_token] = nil

    redirect_to root_path
  end


  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end