

var Users = require('../serverControllers/users.js')

module.exports = function(app){
  app.post('/register', Users.register)
  app.post('/login', Users.login)
  app.get('/logout', Users.logout)
}

// *******************End*******************
