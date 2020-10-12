const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thoughtSchema = new Schema({
  topic: {
    type: String,
    required: true
  },
  thought: {
    type: String,
    required: true
  }
}, {timestamps: true});

const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;