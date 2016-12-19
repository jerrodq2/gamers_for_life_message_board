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
    maxlength: 50,
  },
  description:{
    type: String,
    required: true,
    minlength: 10,
    maxlength: 200,
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

TopicSchema.pre('remove', function(next){
  this.model('Post').find({_topic: this._id}, function(err, posts){ //I have to do this because, as stated in the topics.js serverController, under the delete key, The schema.pre doesn't recognize remove unless activated in this manners.
    for(var i = 0; i < posts.length; i++){
      posts[i].remove()
    }
  })
  next()
})


mongoose.model('Topic', TopicSchema)


// *******************End*******************
