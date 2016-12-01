var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    Topic = mongoose.model('Topic')

module.exports = {
  create: function(req, res){
    if(!req.session.user)
      return res.json({message: false, str: 'You must be logged in to post'})
    Topic.findOne({_id: req.body.t_id}, function(err, topic){
      if(err){
        return res.json({message: false, str: 'There was an error'})
      }
      var post = new Post(req.body)
      post.adminFlag = false
      post.userFlag = false
      post._topic = topic._id
      post.username = req.session.user.username
      post.userId = req.session.user._id
      post.save(function(err){
        if(err){
          res.json({message: false, str: 'There was an error'})
        } else {
          topic.posts.push(post)
          topic.save(function(err){
            res.json({message: true})
          })
        }
      })

    })
  },

  delete: function(req, res){
    Post.findOne({_id: req.params.id}, function(err, post){
      Topic.findOne({_id: post._topic}, function(err, topic){ // I find the related topic so that whoever created the topic can delete the post, even if they didn't write it
        if(req.session.user._id != post.userId && !req.session.user.admin_status && req.session.user._id != topic.userId){ // if this doesn't pass then the user is either the person who created the post, the topic that the post is related to, or the user is an admin, in any of the three cases, they can delete the post
          console.log('Not correct user Id')
          res.json({message: false})
        } else {
          post.remove()//Unless I do this, the Schema.pre methods won't recognize this action, and the related comments won't also be deleted
          res.json({message: true})
        }
      }) //End of Topic FindOne
    }) // end of Post FindOne
  }

}



// *******************End*******************
