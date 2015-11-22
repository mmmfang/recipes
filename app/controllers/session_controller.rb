class SessionController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :destroy

  def create
    user = User.find_by(email: user_params[:email])

      if user && user.authenticate(user_params[:password])
      session[:current_user_id] = user.id

      # flash[:message] = "Thanks for logging in."
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
  end

  def destroy
    session[:current_user_id] = nil

    redirect_to root_path
  end


  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end