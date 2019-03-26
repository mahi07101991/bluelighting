const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LoanSchema = new Schema({
  // TODO: Build Loan Schema here...
  id: {
    type: Number,
    required: true
  },
  name: {
    type: Number,
    required: true
  },
  amount: {
    type: Date,
    default: Date.now
  },
  numberOfInstallments: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Loans', LoanSchema);