const mongoose = require("mongoose");
const postsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  text: String,
  image: String,
  createdAt: Date,
  likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  comments: [
    {
      user: { type: mongoose.Schema.ObjectId, ref: "User" },
      text: String,
      createdAt: Date,
    },
  ],
});

const PostsModel = mongoose.model("Posts", postsSchema);
module.exports = {
  PostsModel,
};
