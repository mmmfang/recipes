class UsersController < ApplicationController
  def create
	@user = User.new(user_params)

	if @user.save
		flash[:message] = "Account succesfully created. Please sign in."
		redirect_to root_path 
	else
		flash[:message] = @user.errors.full_messages.to_sentence
		redirect_to root_path
	end
  end

end

private

def user_params
	params.require(:user).permit(:email, :password)
end
