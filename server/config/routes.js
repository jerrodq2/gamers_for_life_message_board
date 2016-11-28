

var Users = require('../serverControllers/users.js')
var Topics = require('../serverControllers/topics.js')

module.exports = function(app){
  //LOGIN/REGISTER ROUTES************
  app.post('/register', Users.register)
  app.post('/login', Users.login)
  app.get('/logout', Users.logout)
  //TOPIC ROUTES*********************
  app.get('/findAll', Topics.findAll)
  app.post('/createTopic', Topics.create)
  //

}

// *******************End*******************
