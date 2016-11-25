var mongoose = require('mongoose')
var User = mongoose.model('User')

module.exports = {
  register: function(req, res){
    User.find({}, function(err, results){
      var user = new User(req.body)
      if(!results){
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
  },
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
          console.log('good login')
          user.last_visit = new Date()//this is to update the last_visit key for the user
          user.save(function(err){
            req.session.user = {username: user.username, _id: user._id, admin_status: user.admin_status}//create session with needed user info
            res.json({message: true, id: user._id, username: user.username, last_visit: user.last_visit, admin_status: user.admin_status })//send back userful info to be shown on partials or used in controller/factory, nothing that can be harmful, validations will be on the server side to double check any importatn data sent anyways
          })

        } else{ //password didn't match password in the db
          console.log('unsuccessful login, incorrect password')
          res.json({message: false, str: 'Password is incorrect'})
        }
      }
    })
  },
  logout: function(req, res){
    req.session.destroy()
    res.json({message: true})
  }



}



// *******************End*******************
