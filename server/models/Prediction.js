const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  applicantProfile: {
    age: Number,
    gender: String,
    caste: String,
    annual_income: Number,
    loan_amount: Number,
    credit_score: Number,
    prior_default: Boolean,
    has_business_plan: Boolean,
    experience_years: Number,
    business_type: String,
  },
  approval_probability: {
    type: Number,
    required: true,
  },
  risk_tier: {
    type: String,
    required: true,
  },
  risk_badge: {
    type: String,
    default: 'success',
  },
  dti_ratio: {
    type: Number,
  },
  matchedSchemes: [{
    schemeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scheme',
    },
    schemeName: String,
    code: String,
    interestRate: Number,
    subsidyPercentage: Number,
    estimatedSavingsAnnual: Number,
    matchScore: Number,
  }],
  xai: {
    positive_factors: [String],
    concerning_factors: [String],
    actionable_tips: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Prediction', PredictionSchema);
