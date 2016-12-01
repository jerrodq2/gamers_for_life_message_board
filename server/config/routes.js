

var Users = require('../serverControllers/users.js')
var Topics = require('../serverControllers/topics.js')
var Posts = require('../serverControllers/posts.js')
var Comments = require('../serverControllers/comments.js')

module.exports = function(app){
  //LOGIN/REGISTER ROUTES************
  app.post('/register', Users.register)
  app.post('/login', Users.login)
  app.get('/logout', Users.logout)
  //TOPIC ROUTES*********************
  app.get('/findAll', Topics.findAll)
  app.get('/findTopic/:id', Topics.findOne)
  //CREATE ROUTES********************
  app.post('/createTopic', Topics.create)
  app.post('/createPost', Posts.create)
  app.post('/createComment', Comments.create)
  //DELETE ROUTES********************
  app.get('/delete/topic/:id', Topics.delete)
  app.get('/delete/post/:id', Posts.delete)
  app.get('/delete/comment/:cid/:tid', Comments.delete)
}

// *******************End*******************
