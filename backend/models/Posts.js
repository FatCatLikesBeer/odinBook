const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: {
    _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true }
  },
  dateCreated: { type: Date, default: Date.now },
  title: { type: String, required: true },
  body: { type: String, required: true },
  type: {
    type: String,
    required: true,
    emum: ["text", "link", "image"],
    default: "text",
  },
  comments: [{
    _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    displayName: { type: String, required: true },
    body: { type: String, required: true },
  }],
  likes: [{ _id: { type: Schema.Types.ObjectId, ref: "User", required: true } }],
  privacy: {
    type: String,
    required: true,
    enum: ["following", "public"],
    default: "public",
  }
});

// Virtual property for total likes
PostSchema.virtual('totalLikes').get(function() {
  return this.likes.length;
});

PostSchema.set('toJSON', { virtuals: true });
PostSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("Post", PostSchema);
