var mongoose = require('mongoose'),
    Topic = mongoose.model('Topic'),
    Post = mongoose.model('Post'),
    Comment = mongoose.model('Comment'),
    User = mongoose.model('User')

module.exports = {
  findAll: function(req, res){ //for the dashboard partial and statistics at the bottom of said partial
    User.find({}, function(err, users){
      Topic.find({}).populate('posts').exec(function(err, topics){
        Post.find({}, function(err, posts){
          Comment.find({}, function(err, comments){
            res.json({users: users, topics: topics, posts: posts, comments: comments})
          })
        })
      })
    })
  }, //END OF FINDALL********
  create: function(req, res){
    if(!req.session.user){ // then they aren't logged in
      return res.json({message: false, str: 'You must be logged in to create a new topic'})
    }
    var categories = ['Consoles', 'Retro Gaming', 'News', 'Upcoming Games/Tech', 'Specific Series', 'Specific Game', 'PC', 'Indie', 'Handheld', 'Collecting', 'Conventions/Events', 'Other']
    var check = categories.includes(req.body.category)
    if(!check){ //A simple check to make sure that they entered a pre-determined category, wouldn't cause any serious damage and could be deleted, but better to stop small-scale tampering like that before it happens.
      return res.json({message: false, str: 'That category is not in the database'})
    }
    var topic = new Topic(req.body)
    topic.username = req.session.user.username
    topic.userId = req.session.user._id
    topic.adminFlag = false
    topic.userFlag = false
    topic.save(function(err){
      if(err){
        console.log(err)
        res.json({message: false, str: 'There was an error'})
      } else{
        res.json({message: true})
      }
    })
  }, //END OF CREATE*************

}



// *******************End*******************
