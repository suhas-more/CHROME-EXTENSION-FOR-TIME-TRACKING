const mongoose = require('mongoose');
const VisitSchema = new mongoose.Schema({
  domain: String,
  duration: Number,
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Visit', VisitSchema);
