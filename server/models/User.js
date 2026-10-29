const mongoose = require('mongoose');
let bcrypt;
try {
  bcrypt = require('bcrypt');
} catch (err) {
  bcrypt = require('bcryptjs');
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  caste: {
    type: String,
    enum: ['SC', 'ST', 'OBC', 'EWS', 'General'],
    default: 'SC',
  },
  gender: {
    type: String,
    enum: ['Female', 'Male', 'Other'],
    default: 'Male',
  },
  age: {
    type: Number,
    default: 28,
  },
  annualIncome: {
    type: Number,
    default: 200000,
  },
  state: {
    type: String,
    default: 'Gujarat',
  },
  occupation: {
    type: String,
    default: 'Self-Employed / Entrepreneur',
  },
  savedSchemes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scheme',
  }],
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  loginCount: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
