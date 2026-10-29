const Joi = require('joi');

const predictSchema = Joi.object({
  age: Joi.number().integer().min(18).max(100).default(28).messages({
    'number.min': 'Age must be at least 18 years for credit eligibility',
    'number.max': 'Age cannot exceed 100 years',
  }),
  gender: Joi.string().valid('Female', 'Male', 'Other').default('Male'),
  caste: Joi.string().valid('SC', 'ST', 'OBC', 'EWS', 'General').default('SC'),
  annual_income: Joi.number().min(0).max(100000000).default(240000).messages({
    'number.min': 'Annual income cannot be negative',
  }),
  loan_amount: Joi.number().min(1000).max(100000000).default(150000).messages({
    'number.min': 'Loan amount must be at least 1,000 INR',
  }),
  credit_score: Joi.number().integer().min(300).max(900).default(680).messages({
    'number.min': 'Credit score must be between 300 and 900',
    'number.max': 'Credit score must be between 300 and 900',
  }),
  prior_default: Joi.boolean().default(false),
  has_business_plan: Joi.boolean().default(true),
  experience_years: Joi.number().min(0).max(60).default(2),
  business_type: Joi.string().trim().max(200).default('Micro-Enterprise / Trading'),
});

module.exports = {
  predictSchema,
};
