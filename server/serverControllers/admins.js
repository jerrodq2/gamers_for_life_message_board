var mongoose = require('mongoose'),
    Support = mongoose.model('Support'),
    Topic = mongoose.model('Topic'),
    Post = mongoose.model('Post'),
    Comment = mongoose.model('Comment')

module.exports = {
  create: function(req, res){
    console.log()
    if(req.body.type != 'support' && req.body.type != 'feedback')
      return res.json({message: false, str: 'Type must be Support or Feedback'})
    var support = new Support(req.body)
    support.status = 'active'
    support.save(function(err){
      if(err){
        console.log(err)
        res.json({message: false, str: 'There was an error'})
      } else {
        res.json({message: true})
      }
    })
  },
  supports: function(req, res){
    if(!req.session.user.admin_status)
      return res.json({message: false})
    Support.find({status: 'active', type: 'support'}, function(err, results){
      res.json(results)
    })
  },
  feedbacks: function(req, res){
    if(!req.session.user.admin_status)
      return res.json({message: false})
    Support.find({status: 'active', type: 'feedback'}, function(err, results){
      res.json(results)
    })
  },

  flags: function(req, res){
    Topic.find({adminFlag: true}, function(err, topics){
      Post.find({adminFlag: true}, function(err, posts){
        Comment.find({adminFlag: true}, function(err, comments){
          res.json({topics: topics, posts: posts, comments: comments})
        })// end of Comment find
      })// end of Post find
    })// end of Topic find
  },

  resolve: function(req, res){
    if(!req.session.user.admin_status)
      return res.json({message: false})
    Support.update({_id: req.params.id},{$set: {status: 'resolved'}}, function(err, support){
      if(err){
        return res.json({message: false})
      }
      res.json({message: true})
    })
  },
  delete: function(req, res){
    if(!req.session.user.admin_status)
      return res.json({message: false})
    Support.remove({_id: req.params.id}, function(err){
      if(err){
        return res.json({message: false})
      }
      res.json({message: true})
    })
  },

  deleteTopicFlag:function(req, res){
    if(!req.session.user.admin_status)
      return res.json({message: false})
    Topic.update({_id: req.params.id}, {$set: {adminFlag: false}}, function(err){
      res.json({message: true})
    })
  },

  deletePostFlag:function(req, res){
    if(!req.session.user.admin_status)
      return res.json({message: false})
    Post.update({_id: req.params.id}, {$set: {adminFlag: false}}, function(err){
      res.json({message: true})
    })
  },

  deleteCommentFlag:function(req, res){
    if(!req.session.user.admin_status)
      return res.json({message: false})
    Comment.update({_id: req.params.id}, {$set: {adminFlag: false}}, function(err){
      res.json({message: true})
    })
  },



}


// *******************End*******************
