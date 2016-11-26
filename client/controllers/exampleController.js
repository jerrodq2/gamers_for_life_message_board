app.controller('exampleController', ['Factory', '$location', '$cookies', function(fact, location, cookie){
  var self = this;
  if(cookie.get('username')){ //if this passes then the user is logged in and the rest of these were created, these are variables I expect to use semi-frequently
    this.username = cookie.get('username')
    this.admin_status = cookie.get('admin_status')
    this.last_visit = cookie.get('last_visit')
  }
  this.logout = function(){
    fact.logout()
  }



}])



// *******************End*******************
