var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  adminFlag:{
    type: Boolean,
    required: true,
  },
  userFlag:{
    type: Boolean,
    required: true,
  },
  post:{
    type: String,
    required: true,
  },
  _topic:{
    type: Schema.Types.ObjectId,
    ref: 'Topic',
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
  comments:[{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  likes:[{
    type: Schema.Types.ObjectId,
    ref: 'PostLike',
  }],
  dislikes:[{
    type: Schema.Types.ObjectId,
    ref: 'PostDislike',
  }],
}, {timestamps: true})

var PostLikeSchema = new Schema({
  _post:{
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username:{
    type: String,
    required: true,
  }
}, {timestamps: true})

var PostDislikeSchema = new Schema({
  _post:{
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username:{
    type: String,
    required: true,
  }
}, {timestamps: true})

mongoose.model('Post', PostSchema)
mongoose.model('PostLike', PostLikeSchema)
mongoose.model('PostDislike', PostDislikeSchema)


// *******************End*******************
