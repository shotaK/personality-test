const mongoose = require("mongoose");

const TestSchema = mongoose.Schema({
  questions: [
    {
      title: {
        type: String,
        required: true,
      },
      answers: [{ title: String, weight: Number }],
    },
  ],
  scores: [
    {
      minAverageScore: Number,
      maxAverageScore: Number,
      description: String,
    },
  ],
});

module.exports = mongoose.model("Test", TestSchema);
