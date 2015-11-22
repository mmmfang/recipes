class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user

  def welcome
  	#sign in and sign up page
  	render '/welcome'
  end

  def angular
    render 'layouts/angular'
  end

  def current_user
    if session[:current_user_id]
      @current_user ||= User.find(session[:current_user_id])
    else
      @current_user = nil
    end
  end

 # def amiloggedin
 #    amiloggedin = !!session[:current_user_id]
 #    render json: current_user
 #  end

 #  def require_current_user
 #    redirect_to root_path unless amiloggedin
 #  end

end
