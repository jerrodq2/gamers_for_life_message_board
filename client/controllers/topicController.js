app.controller('TopicController', ['mainFactory', '$location', '$cookies', function(fact, location, cookie){
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

  this.postDelete = function(p_id){
    fact.postDelete(p_id, function(){
      fact.findOne(function(data){ // I call this method again to refresh the topic and all it's data for the page, otherwise the deleted item would show until the user refreshed the page
        self.topic = data
      })
    })
  }

  this.commentDelete = function(c_id, t_id){
    fact.commentDelete(c_id, t_id, function(){
      fact.findOne(function(data){// I call this method again to refresh the topic and all it's data for the page, otherwise the deleted item would show until the user refreshed the page
        self.topic = data
      })
    })
  }

  this.likePost = function(p_id){
    fact.likePost(p_id, function(message, str){
      if(!message){
        self.postLikeFlash = {str: str, id: p_id}
      } else {
        self.postLikeFlash = {str: '', id: p_id}
        fact.findOne(function(data){
          self.topic = data
        })
      }
    })
  }

  this.likeComment = function(c_id){
    fact.likeComment(c_id, function(message, str){
      if(!message){
        self.commentLikeFlash = {str: str, id: c_id}
      } else {
        self.commentLikeFlash = {str: '', id: c_id}
        fact.findOne(function(data){
          self.topic = data
        })
      }
    })
  }

}])


// *******************End*******************
