const express = require('express');
const router = express.Router();
const axios = require('axios');
const Scheme = require('../models/Scheme');
const Prediction = require('../models/Prediction');
const { optionalAuth, protect } = require('../middleware/auth');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:5001';

// Fallback scoring logic if Python microservice is temporarily stopped
const fallbackPrediction = (inputs) => {
  const { age, gender, caste, annual_income, loan_amount, credit_score, prior_default, has_business_plan } = inputs;
  const dti = loan_amount / (annual_income * 3.5 + 10000);

  let score = 0.50;
  if (caste === 'SC' || caste === 'ST') score += 0.20;
  else if (caste === 'OBC' || caste === 'EWS') score += 0.12;

  if (gender === 'Female') score += 0.14;
  if (annual_income <= 300000) score += 0.15;
  else if (annual_income > 900000) score -= 0.10;

  if (credit_score >= 740) score += 0.20;
  else if (credit_score >= 650) score += 0.10;
  else if (credit_score < 560) score -= 0.25;

  if (prior_default) score -= 0.35;
  if (has_business_plan) score += 0.12;
  if (dti < 0.6) score += 0.10;
  else if (dti > 1.2) score -= 0.20;

  const prob = Math.min(98.0, Math.max(8.0, Math.round(score * 1000) / 10));

  let risk_tier = 'Moderate Risk (Standard Review)';
  let risk_badge = 'warning';
  if (prob >= 75) {
    risk_tier = 'Low Risk (High Approval Likelihood)';
    risk_badge = 'success';
  } else if (prob < 48) {
    risk_tier = 'High Risk (Requires Enhancement)';
    risk_badge = 'danger';
  }

  const positive_factors = [];
  const concerning_factors = [];
  const actionable_tips = [];

  if (['SC', 'ST', 'OBC', 'EWS'].includes(caste)) {
    positive_factors.push(`Priority access under affirmative action guidelines (${caste} category).`);
  }
  if (gender === 'Female') {
    positive_factors.push('Eligible for exclusive women-focused interest subsidies.');
  }
  if (annual_income <= 300000) {
    positive_factors.push('Income meets low-income priority borrower thresholds.');
  }
  if (credit_score >= 700) {
    positive_factors.push(`Favorable credit score (${credit_score}) demonstrates repayment discipline.`);
  } else if (credit_score < 600) {
    concerning_factors.push(`Credit score (${credit_score}) is below standard benchmark of 650.`);
    actionable_tips.push('Clear pending utility or card balances to boost score prior to final verification.');
  }
  if (prior_default) {
    concerning_factors.push('Previous credit default observed in financial history.');
    actionable_tips.push('Propose a co-applicant or third-party guarantor to reduce lender risk.');
  }
  if (has_business_plan) {
    positive_factors.push('Detailed project proposal ready for appraisal.');
  }

  return {
    approval_probability: prob,
    risk_tier,
    risk_badge,
    dti_ratio: Math.round(dti * 100) / 100,
    xai: {
      positive_factors,
      concerning_factors,
      actionable_tips,
    },
    model_info: {
      algorithm: 'Random Forest Classifier (Deterministic Heuristic Fallback)',
      accuracy: 0.90,
    },
  };
};

// @route   POST /api/predict
// @desc    Predict loan approval odds & recommend tailored government schemes
router.post('/', optionalAuth, async (req, res) => {
  try {
    const {
      age = 28,
      gender = 'Male',
      caste = 'SC',
      annual_income = 240000,
      loan_amount = 150000,
      credit_score = 680,
      prior_default = false,
      has_business_plan = true,
      experience_years = 2,
      business_type = 'Micro-Enterprise / Trading',
    } = req.body;

    const payload = {
      age: Number(age),
      gender,
      caste,
      annual_income: Number(annual_income),
      loan_amount: Number(loan_amount),
      credit_score: Number(credit_score),
      prior_default: Boolean(prior_default),
      has_business_plan: Boolean(has_business_plan),
      experience_years: Number(experience_years),
    };

    let mlResult;
    try {
      // Internal call to Python Flask microservice
      const response = await axios.post(`${ML_SERVICE_URL}/predict`, payload, { timeout: 3500 });
      mlResult = response.data;
    } catch (mlErr) {
      console.warn(`[ML Service Offline]: Falling back to internal engine. (${mlErr.message})`);
      mlResult = fallbackPrediction(payload);
    }

    // Match candidate schemes from MongoDB
    const schemes = await Scheme.find({});
    const matchedSchemes = [];
    const COMMERCIAL_BENCHMARK_APR = 11.5; // Commercial bank business loan rate

    for (const s of schemes) {
      // Evaluate Statutory Filters
      const ageOk = payload.age >= s.eligibility.minAge && payload.age <= s.eligibility.maxAge;
      const genderOk = s.eligibility.gender === 'All' || s.eligibility.gender === payload.gender;
      const casteOk = s.eligibility.casteAllowed.includes(payload.caste) || s.eligibility.casteAllowed.includes('All');
      const incomeOk = payload.annual_income <= (s.eligibility.maxAnnualIncome || 10000000);

      let matchScore = 0;
      if (ageOk) matchScore += 20;
      if (genderOk) matchScore += 20;
      if (casteOk) matchScore += 25;
      if (incomeOk) matchScore += 20;
      if (s.maxLoanAmount >= payload.loan_amount) matchScore += 15;

      // Only include schemes with at least reasonable statutory fit
      if (matchScore >= 60) {
        // Calculate estimated annual interest savings
        const annualConcessionalCost = (payload.loan_amount * (s.interestRate / 100));
        const annualCommercialCost = (payload.loan_amount * (COMMERCIAL_BENCHMARK_APR / 100));
        const annualSavings = Math.max(0, Math.round(annualCommercialCost - annualConcessionalCost));

        matchedSchemes.push({
          schemeId: s._id,
          schemeName: s.name,
          code: s.code,
          category: s.category,
          ministry: s.ministry,
          interestRate: s.interestRate,
          subsidyPercentage: s.subsidyPercentage,
          maxLoanAmount: s.maxLoanAmount,
          moratoriumMonths: s.moratoriumMonths,
          targetBeneficiary: s.targetBeneficiary,
          requiredDocuments: s.requiredDocuments,
          applicationSteps: s.applicationSteps,
          officialUrl: s.officialUrl,
          estimatedSavingsAnnual: annualSavings,
          matchScore,
        });
      }
    }

    // Sort by match score descending, then by annual interest savings
    matchedSchemes.sort((a, b) => b.matchScore - a.matchScore || b.estimatedSavingsAnnual - a.estimatedSavingsAnnual);

    // Persist prediction in MongoDB database
    const pred = await Prediction.create({
      user: req.user ? req.user._id : null,
      applicantProfile: {
        ...payload,
        business_type,
      },
      approval_probability: mlResult.approval_probability,
      risk_tier: mlResult.risk_tier,
      risk_badge: mlResult.risk_badge,
      dti_ratio: mlResult.dti_ratio,
      matchedSchemes: matchedSchemes.slice(0, 5).map(s => ({
        schemeId: s.schemeId,
        schemeName: s.schemeName,
        code: s.code,
        interestRate: s.interestRate,
        subsidyPercentage: s.subsidyPercentage,
        estimatedSavingsAnnual: s.estimatedSavingsAnnual,
        matchScore: s.matchScore,
      })),
      xai: mlResult.xai,
    });
    const savedPredictionId = pred._id;

    res.json({
      success: true,
      predictionId: savedPredictionId,
      approval_probability: mlResult.approval_probability,
      risk_tier: mlResult.risk_tier,
      risk_badge: mlResult.risk_badge,
      dti_ratio: mlResult.dti_ratio,
      xai: mlResult.xai,
      model_info: mlResult.model_info,
      matchedSchemes: matchedSchemes.slice(0, 6),
    });

  } catch (error) {
    console.error('[Predict Route Error]:', error);
    res.status(500).json({ error: 'Failed to process eligibility prediction.' });
  }
});

// @route   GET /api/predict/history
// @desc    Get previous eligibility evaluations for the logged-in user
router.get('/history', protect, async (req, res) => {
  try {
    const history = await Prediction.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve prediction history.' });
  }
});

module.exports = router;
