
app.factory('mainFactory', ['$http', '$routeParams', '$location','$cookies', function(http, routeP, location, cookie){
  var factory ={};

  factory.logout = function(){
    cookie.remove('id')
    cookie.remove('admin_status')
    cookie.remove('last_visit')
    cookie.remove('username')
    http.get('/logout')
  }

  factory.find = function(callback){
    http.get('/findAllTopics').then(function(response){
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

  factory.findOne = function(callback){
    http.get('/findTopic/'+routeP.id).then(function(response){
      callback(response.data)
    })
  }

  factory.createPost = function(t_id, data, callback){
    if(angular.isUndefined(data) || data.post.length == 0){
      return callback(false, "Post can't be blank")
    }
    data.t_id = t_id
    http.post('/createPost', data).then(function(response){
      if(!response.data.message){
        callback(false, response.data.str)
      } else {
        callback(true)
      }
    })
  }

  factory.createComment = function(p_id, comment, callback){
    if(angular.isUndefined(comment) || comment.length == 0){
      return callback(false, "Comment can't be blank")
    }
    var data = {}
    data.comment = comment
    data.p_id = p_id
    http.post('/createComment', data).then(function(response){
      if(!response.data.message){
        callback(false, response.data.str)
      } else {
        callback(true)
      }
    })
  }

  factory.topicDelete = function(t_id){
    http.get('/delete/topic/'+t_id).then(function(response){
      if(response.data.message){
        location.url('/dashboard')
      }
    })
  }

  factory.postDelete = function(p_id, callback){
    http.get('/delete/post/'+p_id).then(function(response){
      if(response.data.message)
        callback()
    })
  }

  factory.commentDelete = function(c_id, t_id, callback){
    http.get('/delete/comment/'+c_id+'/'+t_id).then(function(response){
      if(response.data.message)
        callback()
    })
  }

  factory.likePost = function(p_id, callback){
    http.get('/like/post/'+p_id).then(function(response){
      if(!response.data.message){
        callback(false, response.data.str)
      } else{
        callback(true)
      }
    })
  }

  factory.likeComment = function(c_id, callback){
    http.get('/like/comment/'+c_id).then(function(response){
      if(!response.data.message){
        callback(false, response.data.str)
      } else{
        callback(true)
      }
    })
  }

  return factory;
}])




// *******************End*******************
