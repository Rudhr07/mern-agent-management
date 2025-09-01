const mongoose = require('mongoose');

const listItemSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    required: true
  }
}, {
  timestamps: true
});

const listSchema = new mongoose.Schema({
  originalFileName: {
    type: String,
    required: true
  },
  items: [listItemSchema],
  distributedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('List', listSchema);