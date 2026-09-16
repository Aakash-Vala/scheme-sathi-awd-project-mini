const mongoose = require('mongoose');

const SchemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  ministry: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Micro-Finance',
      'Term Loans',
      'Women Empowerment',
      'Education',
      'Green Mobility',
      'Entrepreneurship',
      'Sanitation & Welfare',
      'Agriculture'
    ],
  },
  description: {
    type: String,
    required: true,
  },
  maxLoanAmount: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true, // in percentage per annum
  },
  subsidyPercentage: {
    type: Number,
    default: 0,
  },
  moratoriumMonths: {
    type: Number,
    default: 6,
  },
  repaymentTenureYears: {
    type: Number,
    default: 5,
  },
  targetBeneficiary: {
    type: String,
    required: true,
  },
  eligibility: {
    minAge: { type: Number, default: 18 },
    maxAge: { type: Number, default: 65 },
    gender: { type: String, enum: ['All', 'Female', 'Male'], default: 'All' },
    casteAllowed: [{ type: String }],
    maxAnnualIncome: { type: Number, default: 500000 },
    minCreditScore: { type: Number, default: 550 },
  },
  requiredDocuments: [{
    type: String,
  }],
  applicationSteps: [{
    type: String,
  }],
  officialUrl: {
    type: String,
    default: 'https://nsfdc.nic.in',
  },
  tags: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Scheme', SchemeSchema);
