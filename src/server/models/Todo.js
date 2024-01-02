const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  doneToday: {
    type: Boolean,
    default: false
  },
  userId: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    required: false
  },
  doneTotal: {
    type: Array,
    required: false
  },
  
});

module.exports = mongoose.model('Todo', TodoSchema);
