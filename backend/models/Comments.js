const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  dateCreated: { type: Date, default: Date.now },
  body: { type: String, required: true },
  likes: [{ _id: { type: Schema.Types.ObjectId, ref: "User", required: true } }],
});

// Virtual property for total likes
CommentSchema.virtual('totalLikes').get(function() {
  return this.likes.length;
});

CommentSchema.set('toJSON', { virtuals: true });
CommentSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("Comment", CommentSchema);
