const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 2 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().trim().email().required().messages({
    'string.empty': 'Email cannot be empty',
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).max(128).required().messages({
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required',
  }),
  caste: Joi.string().valid('SC', 'ST', 'OBC', 'EWS', 'General').default('SC'),
  gender: Joi.string().valid('Female', 'Male', 'Other').default('Male'),
  age: Joi.number().integer().min(18).max(100).default(28),
  annualIncome: Joi.number().min(0).max(100000000).default(240000),
  state: Joi.string().trim().max(100).default('Gujarat'),
  occupation: Joi.string().trim().max(150).default('Entrepreneur'),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.empty': 'Email cannot be empty',
    'string.email': 'Please enter a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required',
  }),
});

const profileUpdateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  caste: Joi.string().valid('SC', 'ST', 'OBC', 'EWS', 'General'),
  gender: Joi.string().valid('Female', 'Male', 'Other'),
  age: Joi.number().integer().min(18).max(100),
  annualIncome: Joi.number().min(0).max(100000000),
  state: Joi.string().trim().max(100),
  occupation: Joi.string().trim().max(150),
}).min(1);

module.exports = {
  registerSchema,
  loginSchema,
  profileUpdateSchema,
};
