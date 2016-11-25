var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TopicSchema = new Schema({
  adminFlag:{
    type: Boolean,
    required: true,
  },
  userFlag:{
    type: Boolean,
    required: true,
  },
  topic:{
    type: String,
    required: true,
    minlength: 5,
  },
  category:{
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
  },
  userId:{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  posts:[{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
}, {timestamps: true})

mongoose.model('Topic', TopicSchema)


// *******************End*******************
