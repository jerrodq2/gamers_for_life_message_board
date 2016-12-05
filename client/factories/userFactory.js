
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

  factory.findOne = function(callback){
    http.get('/findUser/'+routeP.id).then(function(response){
      callback(response.data)
    })
  }

  factory.edit = function(id, data, callback){
    http.post('/edit/user/'+id, data).then(function(response){
      if(!response.data.message){
        callback(false, response.data.str)
      } else{
        callback(true)
        location.url('/profile/'+id)
      }
    })
  }

  factory.changePass = function(id, data, callback){
    http.post('/edit/pass/'+id, data).then(function(response){
      if(!response.data.message){
        callback(false, response.data.str)
      } else{
        callback(true)
        location.url('/profile/'+id)
      }
    })
  }

  return factory;
}])




// *******************End*******************
