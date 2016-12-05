app.controller('profileController', ['userFactory', '$location', '$cookies', function(fact, location, cookie){
  var self = this
  this.user = {}
  this.editUser = []
  this.topics =[]
  this.posts = []
  this.comments = []

  if(cookie.get('username')){ //if this passes then the user is logged in and the rest of these were created, these are variables I expect to use semi-frequently
    this.id = cookie.get('id')
    this.username = cookie.get('username')
    this.admin_status = cookie.get('admin_status')
    this.last_visit = cookie.get('last_visit')
  }

  this.logout = function(){
    fact.logout()
  }

  fact.findOne(function(data){
    self.user = data.user[0]
    self.editUser = data.user
    self.topics = data.topics
    self.posts = data.posts
    self.comments = data.comments
  })

  this.edit = function(id){
    fact.edit(id, this.editInfo, function(message, str){
      if(!message){
        self.editFlash = str
      } else{
        self.editFlash = ''
      }
    })
  }

  this.changePass = function(id){
    fact.changePass(id, this.passChange, function(message, str){
      if(!message){
        self.changePassFlash = str
      } else{
        self.changePassFlash = ''
      }
    })
  }

}])



// *******************End*******************
