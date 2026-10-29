const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  registerSchema,
  loginSchema,
  profileUpdateSchema,
} = require('../validators/authValidator');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'schemesathi_secure_jwt_token_key_2026_awd', {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', validate(registerSchema), async (req, res) => {
  try {
    const { name, email, password, caste, gender, age, annualIncome, state, occupation } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide name, email, and password.' });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      caste: caste || 'SC',
      gender: gender || 'Male',
      age: Number(age) || 28,
      annualIncome: Number(annualIncome) || 240000,
      state: state || 'Gujarat',
      occupation: occupation || 'Entrepreneur',
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        caste: user.caste,
        gender: user.gender,
        age: user.age,
        annualIncome: user.annualIncome,
        state: user.state,
        occupation: user.occupation,
        savedSchemes: user.savedSchemes,
      },
    });
  } catch (error) {
    console.error('[Register Error]:', error);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Persist login activity in MongoDB
    user.lastLogin = new Date();
    user.loginCount = (user.loginCount || 0) + 1;
    await user.save();

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        caste: user.caste,
        gender: user.gender,
        age: user.age,
        annualIncome: user.annualIncome,
        state: user.state,
        occupation: user.occupation,
        savedSchemes: user.savedSchemes,
        lastLogin: user.lastLogin,
        loginCount: user.loginCount,
      },
    });
  } catch (error) {
    console.error('[Login Error]:', error);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile & saved schemes
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('savedSchemes');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile.' });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user demographic profile
router.put('/profile', protect, validate(profileUpdateSchema), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const fields = ['name', 'caste', 'gender', 'age', 'annualIncome', 'state', 'occupation'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();
    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        caste: user.caste,
        gender: user.gender,
        age: user.age,
        annualIncome: user.annualIncome,
        state: user.state,
        occupation: user.occupation,
        savedSchemes: user.savedSchemes,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

// @route   POST /api/auth/save-scheme/:id
// @desc    Bookmark or unbookmark a scheme
router.post('/save-scheme/:id', protect, async (req, res) => {
  try {
    const schemeId = req.params.id;
    const user = await User.findById(req.user._id);

    const isSaved = user.savedSchemes.some((id) => id.toString() === schemeId);
    if (isSaved) {
      user.savedSchemes = user.savedSchemes.filter((id) => id.toString() !== schemeId);
    } else {
      user.savedSchemes.push(schemeId);
    }

    await user.save();
    const updatedUser = await User.findById(user._id).select('-password').populate('savedSchemes');
    res.json({
      success: true,
      saved: !isSaved,
      savedSchemes: updatedUser.savedSchemes,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update saved schemes.' });
  }
});

module.exports = router;
