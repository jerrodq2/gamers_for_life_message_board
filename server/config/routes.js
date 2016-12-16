

var Users = require('../serverControllers/users.js')
var Topics = require('../serverControllers/topics.js')
var Posts = require('../serverControllers/posts.js')
var Comments = require('../serverControllers/comments.js')
var Admins = require('../serverControllers/admins.js')

module.exports = function(app){
  //LOGIN/REGISTER ROUTES************
  app.post('/register', Users.register)
  app.post('/login', Users.login)
  app.get('/logout', Users.logout)
  //USER ROUTES**********************
  app.get('/findAllMembers', Users.findAll)
  app.get('/findUser/:id', Users.findOne)
  app.post('/edit/user/:id', Users.edit)
  app.post('/edit/pass/:id', Users.editPass)
  //TOPIC ROUTES*********************
  app.get('/findAllTopics', Topics.findAll)
  app.get('/findTopic/:id', Topics.findOne)
  app.get('/findCategory/:name', Topics.findCategory)
  //CREATE ROUTES********************
  app.post('/createTopic', Topics.create)
  app.post('/createPost', Posts.create)
  app.post('/createComment', Comments.create)
  app.post('/createSupport', Admins.create)
  //DELETE ROUTES********************
  app.get('/delete/topic/:id', Topics.delete)
  app.get('/delete/post/:id', Posts.delete)
  app.get('/delete/comment/:cid/:tid', Comments.delete)
  //LIKE ROUTES**********************
  app.get('/like/post/:id', Posts.like)
  app.get('/like/comment/:id', Comments.like)
  //ADMIN ROUTES*********************
  app.get('/findSupports', Admins.supports)
  app.get('/findFeedbacks', Admins.feedbacks)
  app.get('/resolve/:id', Admins.resolve)
  app.get('/delete/:id', Admins.delete)
}

// *******************End*******************
