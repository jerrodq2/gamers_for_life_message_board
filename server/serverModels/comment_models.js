var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  adminFlag:{
    type: Boolean,
    required: true,
  },
  userFlag:{
    type: Boolean,
    required: true,
  },
  comment:{
    type: String,
    required: true,
  },
  _post:{
    type: Schema.Types.ObjectId,
    ref: 'Post',
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
  likes:[{
    type: Schema.Types.ObjectId,
    ref: 'CommentLike',
  }],
  dislikes:[{
    type: Schema.Types.ObjectId,
    ref: 'CommentDislike',
  }],
}, {timestamps: true})

var CommentLikeSchema = new Schema({
  _comment:{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
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

var CommentDislikeSchema = new Schema({
  _comment:{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
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

mongoose.model('Comment', CommentSchema)
mongoose.model('CommentLike', CommentLikeSchema)
mongoose.model('CommentDislike', CommentDislikeSchema)


// *******************End*******************
