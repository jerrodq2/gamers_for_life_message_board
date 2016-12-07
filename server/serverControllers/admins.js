var mongoose = require('mongoose'),
    Support = mongoose.model('Support')

module.exports = {
  create: function(req, res){
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



}


// *******************End*******************
