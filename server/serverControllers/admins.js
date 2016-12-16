var mongoose = require('mongoose'),
    Support = mongoose.model('Support')

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
  }



}


// *******************End*******************
