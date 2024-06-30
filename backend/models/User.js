const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  displayName: { type: String, required: false },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  bio: { type: String, required: false },
  link: { type: String, required: false },
  profilePicture: { type: String, required: true, default: "http://localhost:3000/static/default_user.png" },
  following: [{
    _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true }
  }],
  followers: [{
    _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true }
  }],
  blocked: [{
    _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true }
  }],
  privacy: {
    type: String,
    required: true,
    enum: ["following", "public"],
    default: "public",
  },
  posts: [{ _id: { type: Schema.Types.ObjectId, ref: "Post", required: true } }]
});

// Virtual property for total likes
PostSchema.virtual('totalPosts').get(function() {
  return this.posts.length;
});
PostSchema.virtual('totalFollowing').get(function() {
  return this.following.length;
});
PostSchema.virtual('totalFollowers').get(function() {
  return this.followers.length;
});
PostSchema.virtual('totalBlocked').get(function() {
  return this.blocked.length;
});

PostSchema.set('toJSON', { virtuals: true });
PostSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("User", UserSchema);
