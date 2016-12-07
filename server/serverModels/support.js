var mongoose = require('mongoose')

var SupportSchema = new mongoose.Schema({
  user_email:{
    type: String
  },
  user_name:{
    type: String,
  },
  description:{
    type: String,
    required: true,
    minlength: 10,
  },
  subject:{
    type: String,
    required: true,
    minlength: 5,
  },
  status:{// active/inactive
    type: String,
    required: true
  },
  type:{//support or feedback
    type: String,
    required: true
  }
}, {timestamps: true})

mongoose.model('Support', SupportSchema)
