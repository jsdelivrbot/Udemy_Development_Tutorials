Authentication starts with installing angular2-token package:s

```bash
$ sudo npm install angular2-token --save
```

<https://github.com/neroniaky/angular2-token>

<https://angular2-token.herokuapp.com>


add gem device token:

```ruby
gem 'devise_token_auth'
```
which is also dependent on only

```ruby
gem 'omniauth'
```
so the current ruby gem dependencies (few lines around the above two) should look like:

```
# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
 gem 'rack-cors'
 gem 'active_model_serializers', '~> 0.10.0'
 gem 'devise_token_auth'
 gem 'omniauth'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
end
```
then run bundle install:

```bash
$ bundle install
```
the next thing to do is to generate user using devise token by running:

```bash
$ rails g device_token_auth:	install User auth
```
this is going to create a user model that going to mount it on top of the xxx(not clear	) route

if getting error due that the user table already exist, simply drop the table and create back again and migrate by running:

```bash
$ rails db:drop 
$ rails db:create
$ rails db:migrate
```
migrate command will migrate the user table and some attributes added for the user

After creating the user model, check the routes file by firstly navigate to config and check the routes file:

```bash
$ cd config
$ nano routes.rb
```
expecting to see this line `mount_devise_token_auth_for 'User', at: 'auth'` in:  

```
Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :projects
end
```
indicating devise token has been working properly. 

Then navigate back to parent directory and check routes:

```bash
$ cd ..
$ rails routes
```
which returns: 

```
                  Prefix Verb     URI Pattern                            Controller#Action
        new_user_session GET      /auth/sign_in(.:format)                devise_token_auth/sessions#new
            user_session POST     /auth/sign_in(.:format)                devise_token_auth/sessions#create
    destroy_user_session DELETE   /auth/sign_out(.:format)               devise_token_auth/sessions#destroy
       new_user_password GET      /auth/password/new(.:format)           devise_token_auth/passwords#new
      edit_user_password GET      /auth/password/edit(.:format)          devise_token_auth/passwords#edit
           user_password PATCH    /auth/password(.:format)               devise_token_auth/passwords#update
                         PUT      /auth/password(.:format)               devise_token_auth/passwords#update
                         POST     /auth/password(.:format)               devise_token_auth/passwords#create
cancel_user_registration GET      /auth/cancel(.:format)                 devise_token_auth/registrations#cancel
   new_user_registration GET      /auth/sign_up(.:format)                devise_token_auth/registrations#new
  edit_user_registration GET      /auth/edit(.:format)                   devise_token_auth/registrations#edit
       user_registration PATCH    /auth(.:format)                        devise_token_auth/registrations#update
                         PUT      /auth(.:format)                        devise_token_auth/registrations#update
                         DELETE   /auth(.:format)                        devise_token_auth/registrations#destroy
                         POST     /auth(.:format)                        devise_token_auth/registrations#create
   new_user_confirmation GET      /auth/confirmation/new(.:format)       devise_token_auth/confirmations#new
       user_confirmation GET      /auth/confirmation(.:format)           devise_token_auth/confirmations#show
                         POST     /auth/confirmation(.:format)           devise_token_auth/confirmations#create
     auth_validate_token GET      /auth/validate_token(.:format)         devise_token_auth/token_validations#validate_token
            auth_failure GET      /auth/failure(.:format)                devise_token_auth/omniauth_callbacks#omniauth_failure
                         GET      /auth/:provider/callback(.:format)     devise_token_auth/omniauth_callbacks#omniauth_success
                         GET|POST /omniauth/:provider/callback(.:format) devise_token_auth/omniauth_callbacks#redirect_callbacks
        omniauth_failure GET|POST /omniauth/failure(.:format)            devise_token_auth/omniauth_callbacks#omniauth_failure
```
```
                         GET      /auth/:provider(.:format)              redirect(301)
                projects GET      /projects(.:format)                    projects#index
                         POST     /projects(.:format)                    projects#create
                 project GET      /projects/:id(.:format)                projects#show
                         PATCH    /projects/:id(.:format)                projects#update
                         PUT      /projects/:id(.:format)                projects#update
                         DELETE   /projects/:id(.:format)                projects#destroy
```
indicating that devise token has given all the abilities to use the normal routes if this functionality has been implemented by manually apply user controller.

The angular 2 token queries are expecting `/auth/sign_in` to integrate directly with devise token. The coder is not expected to change anything here, or functionalities will fail if implementing in other ways.

Next, run the rails server.

After handling the server side, generate a component in angular side:

```bash
ng generate component account
```
or simply

```bash
ng g c account
```
#notes taken until 6'35"
#skipped some stuff


check in terminal whether user table has been created

```bash
$ rails c
> User.all
```
should have returned:

```
	User Load (0.3ms)  SELECT "users".* FROM "users"
=> #<ActiveRecord::Relation []>
```
indicating that user has been already created
