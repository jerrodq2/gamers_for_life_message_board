
app.factory('userFactory', ['$http', '$routeParams', '$location','$cookies', function(http, routeP, location, cookie){
  var factory ={}

  factory.logout = function(){
    cookie.remove('id')
    cookie.remove('admin_status')
    cookie.remove('last_visit')
    cookie.remove('username')
    http.get('/logout')
  }

  factory.findAll = function(callback){
    http.get('/findAllMembers').then(function(response){
      callback(response.data)
    })
  }

  return factory;
}])




// *******************End*******************
