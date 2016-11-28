app.controller('dashboardController', ['dashboardFactory', '$location', '$cookies', function(fact, location, cookie){
  var self = this
  this.orderOption = 'user'
  this.topics = []
  this.members = [] //These next three are just for the statistics part at the bottom of the dashboard partial
  this.posts = []
  this.comments = []
  if(cookie.get('username')){ //if this passes then the user is logged in and the rest of these were created
    this.username = cookie.get('username')
    this.admin_status = cookie.get('admin_status')
    this.last_visit = cookie.get('last_visit')
  }
  this.logout = function(){
    fact.logout()
  }
  fact.find(function(data){
    self.topics = data.topics
    self.members = data.users
    self.posts = data.posts
    self.comments = data.comments
  })
  this.create = function(){
    fact.create(this.newTopic, function( message, str){
      if(!message){
        self.flash = str
      } else{
        self.flash = ''
        self.newTopic = {}
      }
    })
  }

}])



// *******************End*******************
