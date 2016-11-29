app.controller('TopicController', ['dashboardFactory', '$location', '$cookies', function(fact, location, cookie){
  var self = this
  this.topic = {}

  if(cookie.get('username')){ //if this passes then the user is logged in and the rest of these were created, these are variables I expect to use semi-frequently
    this.id = cookie.get('id')
    this.username = cookie.get('username')
    this.admin_status = cookie.get('admin_status')
  }

  this.logout = function(){
    fact.logout()
  }

  fact.findOne(function(data){
    self.topic = data
  })

  this.createPost = function(t_id){
    fact.createPost(t_id, this.newPost, function(message, str){
      if(!message){
        self.postFlash = str
      } else {
        self.postFlash = ''
        self.newPost = {}
        fact.findOne(function(data){
          self.topic = data
        })
      }
    })
  }

  this.createComment = function(p_id, comment){
    fact.createComment(p_id, comment, function(message, str){
      if(!message){
        self.commentFlash = {str: str, id: p_id}
      } else {
        self.commentFlash = {str: '', id: p_id}
        fact.findOne(function(data){
          self.topic = data
        })
      }
    })
  }

  this.topicDelete = function(t_id){
    fact.topicDelete(t_id)
  }

}])



// *******************End*******************
