app.factory('admin_supportFactory', ['$http', '$routeParams', '$location','$cookies', function(http, routeP, location, cookie){
  var factory ={}

  factory.logout = function(){
    cookie.remove('id')
    cookie.remove('admin_status')
    cookie.remove('last_visit')
    cookie.remove('username')
    http.get('/logout')
  }

  factory.submit = function(data, callback){
    if(angular.isUndefined(data)){
      return callback(false, 'Please fill out the necessary fields')
    } else if(angular.isUndefined(data.subject) || data.subject.length == 0){
      return callback(false, "Subject can't be empty")
    } else if(data.subject.length < 5){
      return callback(false, "Subject must be at least 5 characters long")
    } else if(angular.isUndefined(data.type)){
      return callback(false, "Please select a type")
    } else if(angular.isUndefined(data.description) || data.description.length == 0){
      return callback(false, "Description can't be empty")
    } else if(data.description.length < 10){
      return callback(false, "Description must be at least 10 characters long")
    }
    http.post('/createSupport', data).then(function(response){
      if(!response.data.message){
        callback(false, response.data.str)
      } else {
        callback(true)
      }
    })
  }

  factory.supports = function(callback){
    http.get('/findSupports').then(function(response){
      callback(response.data)
    })
  }
  factory.feedbacks = function(callback){
    http.get('/findFeedbacks').then(function(response){
      callback(response.data)
    })
  }

  factory.resolve = function(id, callback){
    http.get('/resolve/'+id).then(function(response){
      if(response.data.message){
        callback(true)
      } else {
        callback(false)
      }
    })
  }
  factory.delete = function(id, callback){
    http.get('/delete/'+id).then(function(response){
      if(response.data.message){
        callback(true)
      } else {
        callback(false)
      }
    })
  }

  return factory;
}])




// *******************End*******************
