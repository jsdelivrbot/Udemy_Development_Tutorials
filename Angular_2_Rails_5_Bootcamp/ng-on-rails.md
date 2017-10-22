Firstly create the rails api

```bash
$ rails new sample_api --api
```

After rails api has been created, `cd` into the directory and open in atom `atom .` then 

- open the gem file, uncomment the cors
- add in the serializer (google active model serializer and search for the latest stalbe version with documentations):

```ruby
gem 'rack-cors'
gem 'active_model_serializers', '~> 0.10.0' // current stable version when this note taken
```
go back to the terminal and run bundle install to install relative gem dependencies

```bash
$ bundle install
``` 
After the cors and serializer have been installed, navigate to the rack by opening `./config/initializers/cors.rb` and uncomment the following lines:

```ruby
# Rails.application.config.middleware.insert_before 0, Rack::Cors do
#   allow do
#     origins 'example.com'
# 
#     resource '*',
#       headers: :any,
#       methods: [:get, :post, :put, :patch, :delete, :options, :head]
#   end
# end
```
change `origins 'example.com` to `'*'` which allow rails to accept every request from angular obaining (can also be found in the official documentation): 

```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```
Next, start creating models. Firstly create a Post model which will have a title and a description:

```bash 
$ rails g model Post title:string description:text
```
then we migrate the database:

```bash
$ rails db:migrate
```
after that generate a serializer which produces a post serializer:

```bash
$ rails g serializer post
```
What we need to do with the serializer is to give the attributes which need to be as a JSON object in the angular 2 front-ends. The attributes can be found in schema file: e.g. `t.string "title"`, `t.text "description"` etc.

So we need to add `"title"` and `"description"` into the `./app/serializers/post_serializer.rb`, we can also add `"updated_at"` act to the serializer, obtainnig:

```ruby
class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :updated_at
end
```
Next we need to generate the controller files, with the convention in rails of `Posts` controller corresponding to `post` serializer:

```bash
$ rails g controller Posts
```
Once done, go back to the post controller `./controllers/posts_controller.rb` to supply the action needed:

- supply the index action requests for all posts
- render the json

```ruby
class PostsController < ApplicationController
  def index 
    @posts = Post.all 
    render json: @posts 
  end
end
```
Navigate to the routes file `./config/routes.rb`, supply routes rails has provided: 

```ruby
Rails.application.routes.draw do
  resources :posts
end
```
then check all the routes in terminal:

```bash
$ rails routes
```
expecting to see something analogous to this:

```bash
Prefix Verb   URI Pattern          Controller#Action
 posts GET    /posts(.:format)     posts#index
       POST   /posts(.:format)     posts#create
  post GET    /posts/:id(.:format) posts#show
       PATCH  /posts/:id(.:format) posts#update
       PUT    /posts/:id(.:format) posts#update
       DELETE /posts/:id(.:format) posts#destroy
```
After all these done, start to create the seeds file. Navigate to `./db/seed.rb` and add some sample seeds:

```ruby
5.times do |num|
  num += 1
  Post.create!(
    title: "Test Post #{num}",
    description: "Sample description for post #{num}"
  )
end
```
then we seed the files by 

```bash
$ rails db:seed
```
run the server:

```bash
$ rails s
```
open a new tab and check whether seeds file is working:

```bash
$ curl http://localhost:3000/posts
```
should be expecting to get something analogues to this array of posts returned (one-line with no wrapping in macdown kernel):

```
[{"id":1,"title":"Test Post 1","description":"Sample description for post 1","updated_at":"2017-09-06T15:55:24.756Z"},{"id":2,"title":"Test Post 2","description":"Sample description for post 2","updated_at":"2017-09-06T15:55:24.765Z"},{"id":3,"title":"Test Post 3","description":"Sample description for post 3","updated_at":"2017-09-06T15:55:24.773Z"},{"id":4,"title":"Test Post 4","description":"Sample description for post 4","updated_at":"2017-09-06T15:55:24.783Z"},{"id":5,"title":"Test Post 5","description":"Sample description for post 5","updated_at":"2017-09-06T15:55:24.792Z"}]
```
>note that alternatively if got PI installed, much neater response can be obtained by typing following line to the terminal:
>
>```bash
>$ curl http://localhost:3000/posts | python -m json.tool
>```
>which returns something similar to:
>
>```  
>% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
>                                 Dload  Upload   Total   Spent    Left  Speed
>100   586    0   586    0     0     58      0 --:--:--  0:00:10 --:--:--   152
>[
>    {
>        "description": "Sample description for post 1",
>        "id": 1,
>        "title": "Test Post 1",
>        "updated_at": "2017-09-06T15:55:24.756Z"
>    },
>    {
>        "description": "Sample description for post 2",
>        "id": 2,
>        "title": "Test Post 2",
>        "updated_at": "2017-09-06T15:55:24.765Z"
>    },
>    {
>        "description": "Sample description for post 3",
>        "id": 3,
>        "title": "Test Post 3",
>        "updated_at": "2017-09-06T15:55:24.773Z"
>    },
>    {
>        "description": "Sample description for post 4",
>        "id": 4,
>        "title": "Test Post 4",
>        "updated_at": "2017-09-06T15:55:24.783Z"
>    },
>    {
>        "description": "Sample description for post 5",
>        "id": 5,
>        "title": "Test Post 5",
>        "updated_at": "2017-09-06T15:55:24.792Z"
>    }
>]
>```






