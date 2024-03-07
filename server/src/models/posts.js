const mongoose = require("mongoose");

const superheroSchema = new mongoose.Schema({
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
});

const post = mongoose.model("blogposts", superheroSchema);

module.exports = post;
