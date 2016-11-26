app.factory('loginRegFactory', ['$http', '$location','$cookies', function(http, location, cookie){
  var factory = {};
  if(cookie.get('id')){
    location.url('/dashboard')
  }

  factory.register = function(data, callback){
    // Validations for convenience of the user
    if(angular.isUndefined(data)){
      return callback('Username, Email, Password, and Confirmation Password must be filled out.')
    } else if(angular.isUndefined(data.username) || data.username.length < 1){
      return callback("Username can't be blank.")
    } else if(data.username.length < 5){
      return callback("Username must be at least 5 characters long")
    } else if(angular.isUndefined(data.email) || data.email.length < 1){
      return callback("Email can't be blank")
    } else if(angular.isUndefined(data.password)){
      return callback("Password can't be blank")
    } else if(angular.isUndefined(data.confirm)){
      return callback("Confirmation Password can't be blank")
    } else if(data.password.length < 8){
      return callback('Password must be at least 8 characters long')
    } else if(data.password.length > 20){
      return callback("Password can't be longer than 20 characters")
    } else if(data.password != data.confirm){
      return callback("Password and Confirmation password don't match")
    }
    // End of validations
    http.post('/register', data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{
        cookie.put('id', response.data.id)
        cookie.put('username', response.data.username)
        cookie.put('last_visit', response.data.last_visit)
        cookie.put('admin_status', response.data.admin_status) //this cookie is for admins, so that they can do things like delete any content. There are server side validations to double check so that even if anyone messes with this, they can't do any actual admin stuff unless their user profile is an admin
        callback('')
        location.url('/dashboard')
      }
    })
  } //End of register

  factory.login = function(data, callback){
    // Validations for convenience of the user
    if(angular.isUndefined(data)){
      return callback('All fields must be filled out')
    } else if(angular.isUndefined(data.username) || data.username.length < 1){
      return callback("Username can't be blank")
    } else if(angular.isUndefined(data.password) || data.password.length < 1){
      return callback("Password can't be blank")
    }
    // End of validations
    http.post('/login', data).then(function(response){
      if(!response.data.message){
        callback(response.data.str)
      } else{
        cookie.put('id', response.data.id)
        cookie.put('username', response.data.username)
        cookie.put('last_visit', response.data.last_visit)
        cookie.put('admin_status', response.data.admin_status) //this cookie is for admins, so that they can do things like delete any content. There are server side validations to double check so that even if anyone messes with this, they can't do any actual admin stuff unless their user profile is an admin
        callback('')
        location.url('/dashboard')
      }
    })
  }//end of login


  return factory;
}])



// *******************End*******************
