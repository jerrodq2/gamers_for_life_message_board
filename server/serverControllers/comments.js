var mongoose = require('mongoose'),
    Comment = mongoose.model('Comment'),
    Post = mongoose.model('Post'),
    Topic = mongoose.model('Topic'),
    Like = mongoose.model('CommentLike')

module.exports = {
  create: function(req, res){
    if(!req.session.user)
      return res.json({message: false, str: 'You must be logged in to comment'})
    Post.findOne({_id: req.body.p_id}, function(err, post){
      if(err){
        return res.json({message: false, str: 'There was an error'})
      }
      var comment = new Comment(req.body)
      comment.adminFlag = false
      comment.userFlag = false
      comment._post = post._id
      comment.username = req.session.user.username
      comment.userId = req.session.user._id
      comment.save(function(err){
        if(err){
          res.json({message: false, str: 'There was an error'})
        } else {
          post.comments.push(comment)
          post.save(function(err){ //updated post, now have to update the topic
            Topic.findOne({_id: post._topic}, function(err, topic){
              topic.updatedAt = new Date()
              topic.save(function(err){ // I do this to update the topic's updatedAt field to show the most recent activity
                res.json({message: true})
              })
            })
          })
        }
      })
    })
  }, // END OF CREATE ************

  delete: function(req, res){
    Topic.findOne({_id: req.params.tid}, function(err, topic){
      Comment.findOne({_id: req.params.cid}, function(err, comment){
        if(req.session.user._id != comment.userId && !req.session.user.admin_status && req.session.user._id != topic.userId){ // if this doesn't pass then the user is either the person who created the comment, the topic that the comment is related to, or the user is an admin, in any of the three cases, they can delete the comment
          console.log('Not correct user Id')
          res.json({message: false})
        } else{
          comment.remove()
          res.json({message: true})
        }
      }) //end of comment findOne
    })//end of topic findOne
  }, // end of delete

  like: function(req, res){
    Comment.findOne({_id: req.params.id}, function(err, comment){
      if(!req.session.user) //if they're not logged in, they shouldn't be able to like anything
        return res.json({message: false, str: "You must be logged in to like this"})
      Like.find({_comment: req.params.id}, function(err, likes){// I do this to make sure that the user hasn't already like this comment
        for(var i = 0; i < likes.length; i++){
          if(likes[i].userId == req.session.user._id)
            return res.json({message: false, str: "You've already liked this comment"}) //end of if
        } //end of for loop
        var like = new Like()
        like.userId = req.session.user._id
        like.username = req.session.user.username
        like._comment = comment._id
        like.save(function(err){
          comment.likes.push(like)
          comment.save(function(err){
            res.json({message: true})
          }) //end of comment.save
        }) //end of like.save
      })// end of like find
    }) //end of comment findOne
  },// end of Like

}



// *******************End*******************
