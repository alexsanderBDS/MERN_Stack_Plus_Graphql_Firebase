const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true, autoIndex: false }
);

module.exports = mongoose.model("Post", postSchema);
