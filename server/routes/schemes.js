const express = require('express');
const router = express.Router();
const Scheme = require('../models/Scheme');

// @route   GET /api/schemes
// @desc    Get all schemes with search, category, and eligibility filters
router.get('/', async (req, res) => {
  try {
    const { search, category, caste, maxIncome, maxLoan } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (caste && caste !== 'All') {
      query['eligibility.casteAllowed'] = { $in: [caste, 'All'] };
    }

    if (maxIncome) {
      query['eligibility.maxAnnualIncome'] = { $gte: Number(maxIncome) };
    }

    if (maxLoan) {
      query.maxLoanAmount = { $gte: Number(maxLoan) };
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { code: searchRegex },
        { description: searchRegex },
        { targetBeneficiary: searchRegex },
        { tags: { $in: [searchRegex] } },
      ];
    }

    const schemes = await Scheme.find(query).sort({ maxLoanAmount: -1 });
    res.json({
      success: true,
      count: schemes.length,
      schemes,
    });
  } catch (error) {
    console.error('[Schemes Query Error]:', error);
    res.status(500).json({ error: 'Failed to retrieve schemes.' });
  }
});

// @route   GET /api/schemes/categories
// @desc    Get list of unique categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Scheme.distinct('category');
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve categories.' });
  }
});

// @route   GET /api/schemes/:id
// @desc    Get single scheme by ID
router.get('/:id', async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found.' });
    }
    res.json({ success: true, scheme });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve scheme details.' });
  }
});

module.exports = router;
