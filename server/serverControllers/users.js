var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Topic = mongoose.model('Topic'),
    Post = mongoose.model('Post'),
    Comment = mongoose.model('Comment'),
    bcrypt = require('bcrypt')

module.exports = {
  register: function(req, res){
    User.find({}, function(err, results){
      var user = new User(req.body)
      if(results.length == 0){
        user.admin_status = true
      } else{
        user.admin_status = false
      }
      user.last_visit = new Date()//automatically create last_visit
      user.save(function(err){
        if(err){
          console.log('Failed to register')
          res.json({message: false, str: 'Username or Email is already in database, please log in'})
        } else{
          req.session.user = {username: user.username, _id: user._id, admin_status: user.admin_status} //create session with needed user info
          console.log('Successfully registered')
          res.json({message: true, id: user._id, username: user.username, last_visit: user.last_visit, admin_status: user.admin_status }) //send back userful info to be shown on partials or used in controller/factory, nothing that can be harmful, validations will be on the server side to double check any importatn data sent anyways
        }
      })
    })
  }, //END OF REGISTER ******************

  login: function(req, res){
    User.findOne({username: req.body.username}, function(err, user){
      if(err){
        console.log('unsuccessful login, incorrect username')
        res.json({message: false, str: 'Username is incorrect'})
      } else if(!user){ //Then the username didn't match anything in the db
        console.log('unsuccessful login, incorrect username')
        res.json({message: false, str: 'Username is incorrect'})
      } else {
        var check = user.validPassword(req.body.password)
        if(check){
          user.last_visit = new Date()//this is to update the last_visit key for the user
          User.update({_id: user._id}, {$set: {last_visit: user.last_visit}}, function(err){
            req.session.user = {username: user.username, _id: user._id, admin_status: user.admin_status}//create session with needed user info
            res.json({message: true, id: user._id, username: user.username, last_visit: user.last_visit, admin_status: user.admin_status })//send back userful info to be shown on partials or used in controller/factory, nothing that can be harmful, validations will be on the server side to double check any importatn data sent anyways
          })

        } else{ //password didn't match password in the db
          console.log('unsuccessful login, incorrect password')
          res.json({message: false, str: 'Password is incorrect'})
        }
      }
    })
  }, //END OF REGISTER******************

  logout: function(req, res){
    req.session.destroy()
    res.json({message: true})
  },

  findAll: function(req, res){
    User.find({}, {first_name: 1, last_name: 1, username: 1, age: 1, last_visit: 1, admin_status: 1, createdAt: 1, updatedAt: 1}, function(err, users){
      res.json(users)
    })
  },

  findOne: function(req, res){
    User.find({_id: req.params.id}, {first_name: 1, last_name: 1, username: 1, age: 1, last_visit: 1, admin_status: 1, createdAt: 1, updatedAt: 1, bio: 1, hobbies: 1, fav_game: 1}, function(err, user){ // I select only certain things about the user to send back, so other can't access email, password, ect.
      Topic.find({userId: user[0]._id}, function(err, topics){
        Post.find({userId: user[0]._id}, function(err, posts){
          Comment.find({userId: user[0]._id}, function(err, comments){
            res.json({user: user, topics: topics, posts: posts, comments: comments})
          })
        })
      })
    })
  },

  edit: function(req, res){
    User.findOne({_id: req.params.id}, function(err, user){
      if(req.body.admin_status || req.body.username || req.body.email || req.body.password){ //simple security checks in case anyone decided to mess with the html and tried ot give themselves admin privileges or something like that.
        console.log("Can't update these values");
        return res.json({message: false, str: "You can't update email, username, or password in this form"})
      }
      if(user._id != req.session.user._id){ //then someone is trying to update someone else's info
        return res.json({message: false, str: "Wrong user"})
      }
      User.update({_id: req.params.id}, {$set: req.body}, function(err){
        if(err){
          res.json({message: false, str: "There was a problem"})
        } else{
          res.json({message: true})
        }
      })
    })
  },// END OF EDIT****************

  editPass: function(req, res){
    if(!req.body.checkPass)
      return res.json({message: false, str:'You must enter old password'})
    if(req.body.admin_status)
      return res.json({message: false, str:"You can't change admin status"})
    User.findOne({_id: req.params.id}, function(err, user){
      if(user._id != req.session.user._id)
        return res.json({message: false, str: "Wrong user"})
      if(!bcrypt.compareSync(req.body.checkPass, user.password))
        return res.json({message: false, str:"Incorrect Password"})
      if(req.body.password)//to encrypt the new password
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8))
      User.update({_id: req.params.id}, {$set: req.body}, function(err){
        if(err){
          res.json({message: false, str:"That username already exists in the database"})
        } else {
          res.json({message: true})
        }
      })
    })
  },

}



// *******************End*******************
