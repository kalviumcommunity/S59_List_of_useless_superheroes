const mongoose = require("mongoose");

const superheroSchema = new mongoose.Schema({
  author : {
    type: String,
    required: true,
    default: "Anonymous",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
     type: String, 
     required: true 
    },
  body: [
    {
      subtitle: { type: String, required: true },
      point: { type: String, required: true },
    },
  ],
  comments: [
    {
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const post = mongoose.model("blogposts", superheroSchema);

module.exports = post;
