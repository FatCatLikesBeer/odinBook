const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  displayName: { type: String, required: false },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  dateCreated: { type: Date, default: Date.now },
  bio: { type: String, required: false },
  link: { type: String, required: false },
  // profilePicture: { type: Blob, required: true },
  privacy: {
    type: String,
    required: true,
    enum: ["following", "public"],
    default: "public",
  }
});

module.exports = mongoose.model("User", UserSchema);
