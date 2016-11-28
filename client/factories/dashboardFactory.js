
app.factory('dashboardFactory', ['$http', '$routeParams', '$location','$cookies', function(http, routeP, location, cookie){
  var factory ={};

  factory.logout = function(){
    cookie.remove('id')
    cookie.remove('admin_status')
    cookie.remove('last_visit')
    cookie.remove('username')
    http.get('/logout')
  }
  factory.find = function(callback){
    http.get('/findAll').then(function(response){
      callback(response.data)
    })
  }
  factory.create = function(data, callback){
    if (angular.isUndefined(data)){
      return callback(false, 'Please fill out all fields')
    } else if(angular.isUndefined(data.topic) || data.topic.length == 0){
      return callback(false, "Topic can't be blank")
    } else if(angular.isUndefined(data.category) || data.category.length == 0){
      return callback(false, 'A category must be selected')
    } else if(angular.isUndefined(data.description)){
      return callback(false, "Description can't be blank")
    } else if(data.description.length < 10){
      return callback(false, "Description must be at least 10 characters long")
    } // END OF VALIDATIONS
    http.post('/createTopic', data).then(function(response){
      if(!response.data.message){
        callback(false, response.data.str)
      } else {
        callback(true)
        location.url('/dashboard')
      }
    })
  }

  return factory;
}])




// *******************End*******************
