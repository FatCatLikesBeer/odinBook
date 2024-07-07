const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  author: {
    _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
  },
  dateCreated: { type: Date, default: Date.now },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  link: { type: String },
  images: [{ type: String, default: "" }],
  going: [{
    _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
  }],
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
EventSchema.virtual('totalLikes').get(function() {
  return this.likes.length;
});
EventSchema.virtual('totalGoing').get(function() {
  return this.going.length;
});

EventSchema.set('toJSON', { virtuals: true });
EventSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("Event", EventSchema);
