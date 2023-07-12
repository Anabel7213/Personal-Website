const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, "Please specify the date"],
  },
  title: {
    type: String,
    required: [true, "A blog post must have a title"],
  },
  body: {
    type: String,
    trim: true,
    required: [true, "The content of a blog post cannot be empty"],
  },
  tags: String,
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;