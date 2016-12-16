app.controller('admin_supportController', ['admin_supportFactory', '$location', '$cookies', function(fact, location, cookie){
  var self = this
  this.supports = []
  this.feedbacks = []

  if(cookie.get('username')){ //if this passes then the user is logged in and the rest of these were created, these are variables I expect to use semi-frequently
    this.id = cookie.get('id')
    this.username = cookie.get('username')
    this.admin_status = cookie.get('admin_status')
    this.last_visit = cookie.get('last_visit')
  }

  this.logout = function(){
    fact.logout()
  }

  this.submit = function(){
    fact.submit(this.newSupport, function(message, str){
      if(!message){
        self.flash = str
      } else{
        if(self.newSupport.type == 'support'){
          self.flash = 'Your form has been submitted, thank you for bringing this to our attention, we will look into the matter and get back to you soon.'
        } else {
          self.flash = 'Your form has been submitted, thank you for your feedback.'
        }
        self.newSupport = {}
      }
    })
  }

  fact.supports(function(data){
    self.supports = data
  })
  fact.feedbacks(function(data){
    self.feedbacks = data
  })

  this.support_resolve = function(id){
    fact.resolve(id, function(message){
      if(message){
        fact.supports(function(data){
          self.supports = data
        })
      }
    })
  }

  this.support_delete = function(id){
    fact.delete(id, function(message){
      if(message){
        fact.supports(function(data){
          self.supports = data
        })
      }
    })
  }

  this.feedback_resolve = function(id){
    fact.resolve(id, function(message){
      if(message){
        fact.feedbacks(function(data){
          self.feedbacks = data
        })
      }
    })
  }

  this.feedback_delete = function(id){
    fact.delete(id, function(message){
      if(message){
        fact.feedbacks(function(data){
          self.feedbacks = data
        })
      }
    })
  }


}])



// *******************End*******************
