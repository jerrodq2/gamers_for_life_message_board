var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FriendSchema = new mongoose.Schema({
  userId1:{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  username1:{
    type: String,
    required: true,
  },
  userId2:{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  username2:{
    type: String,
    required: true,
  },
}, {timestamps: true})

var PendingFriendSchema = new mongoose.Schema({
  userId1:{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  username1:{
    type: String,
    required: true,
  },
  userId2:{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  username2:{
    type: String,
    required: true,
  },
}, {timestamps: true})

mongoose.model('Friend', FriendSchema)
mongoose.model('Pending', PendingFriendSchema)


// *******************End*******************
