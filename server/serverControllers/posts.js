var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    Topic = mongoose.model('Topic'),
    Like = mongoose.model('PostLike')

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
  },

  like: function(req, res){
    Post.findOne({_id: req.params.id}, function(err, post){
      if(!req.session.user) //if they're not logged in, they shouldn't be able to like anything
        return res.json({message: false, str: "You must be logged in to like this"})
      Like.find({_post: req.params.id}, function(err, likes){ // I do this to make sure that the user hasn't already like this post
        for(var i = 0; i < likes.length; i++){
          if(likes[i].userId == req.session.user._id)
            return res.json({message: false, str: "You've already liked this post"}) //end of if
        } //end of for loop
        var like = new Like()
        like.userId = req.session.user._id
        like.username = req.session.user.username
        like._post = post._id
        like.save(function(err){
          post.likes.push(like)
          post.save(function(err){
            res.json({message: true})
          }) //end of post.save
        }) //end of like.save
      })// end of like find
    })// end of post findOne
  }, //end of Like


  flag: function(req, res){
    if(!req.session.user)
      return res.json({message: false, str: 'You must be logged in to flag a post'})
    Post.update({_id: req.params.id}, {$set: {adminFlag: true}}, function(err){
      res.json({message: true})
    })
  },


}



// *******************End*******************
