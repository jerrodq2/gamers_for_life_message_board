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

}



// *******************End*******************
