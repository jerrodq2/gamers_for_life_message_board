app.controller('categoryController', ['mainFactory', '$location', '$cookies', function(fact, location, cookie){
  var self = this
  this.topics = []
  if(cookie.get('username')){ //if this passes then the user is logged in and the rest of these were created, these are variables I expect to use semi-frequently
    this.id = cookie.get('id')
    this.username = cookie.get('username')
    this.admin_status = cookie.get('admin_status')
    this.last_visit = cookie.get('last_visit')
  }

  this.logout = function(){
    fact.logout()
  }

  fact.findCategory(function(data, category){
    self.topics = data
    self.category = category
  })


}])



// *******************End*******************
