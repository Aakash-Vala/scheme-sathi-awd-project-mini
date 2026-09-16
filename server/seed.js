require('dotenv').config();
const mongoose = require('mongoose');
const Scheme = require('./models/Scheme');
const User = require('./models/User');
const Prediction = require('./models/Prediction');
const realWorldSchemes = require('./data/schemesData');

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/scheme_sathi_awd';
    await mongoose.connect(mongoUri);
    console.log('[Seed]: Connected to MongoDB:', mongoUri);

    // Clear existing schemes
    await Scheme.deleteMany({});
    console.log('[Seed]: Cleared existing schemes collection.');

    // Insert real-world schemes
    const insertedSchemes = await Scheme.insertMany(realWorldSchemes);
    console.log(`[Seed]: Successfully inserted ${insertedSchemes.length} real-world schemes.`);

    // Check if test user exists, otherwise create
    const testEmail = 'demo@schemesathi.gov.in';
    let user = await User.findOne({ email: testEmail });
    if (!user) {
      user = await User.create({
        name: 'Aakash Vala',
        email: testEmail,
        password: 'Password123!',
        caste: 'SC',
        gender: 'Male',
        age: 26,
        annualIncome: 240000,
        state: 'Gujarat',
        occupation: 'Technology Entrepreneur',
        lastLogin: new Date(),
        loginCount: 3,
        savedSchemes: [insertedSchemes[0]._id, insertedSchemes[3]._id]
      });
      console.log(`[Seed]: Default demo user created: ${testEmail} / Password123!`);
    } else {
      user.savedSchemes = [insertedSchemes[0]._id, insertedSchemes[3]._id];
      user.lastLogin = new Date();
      await user.save();
    }

    // Seed previous predictions in MongoDB for the user
    await Prediction.deleteMany({ user: user._id });
    const samplePredictions = [
      {
        user: user._id,
        applicantProfile: {
          age: 26,
          gender: 'Male',
          caste: 'SC',
          annual_income: 240000,
          loan_amount: 140000,
          credit_score: 720,
          prior_default: false,
          has_business_plan: true,
          experience_years: 3,
          business_type: 'Micro-Enterprise / Tech Services'
        },
        approval_probability: 94.2,
        risk_tier: 'Low Risk (High Approval Likelihood)',
        risk_badge: 'success',
        dti_ratio: 0.17,
        matchedSchemes: [
          {
            schemeId: insertedSchemes[0]._id,
            schemeName: insertedSchemes[0].name,
            code: insertedSchemes[0].code,
            interestRate: insertedSchemes[0].interestRate,
            subsidyPercentage: insertedSchemes[0].subsidyPercentage,
            estimatedSavingsAnnual: 10500,
            matchScore: 95
          },
          {
            schemeId: insertedSchemes[3]._id,
            schemeName: insertedSchemes[3].name,
            code: insertedSchemes[3].code,
            interestRate: insertedSchemes[3].interestRate,
            subsidyPercentage: insertedSchemes[3].subsidyPercentage,
            estimatedSavingsAnnual: 9100,
            matchScore: 85
          }
        ],
        xai: {
          positive_factors: [
            'Priority access under affirmative action guidelines (SC category).',
            'Strong credit score (720) demonstrates prompt repayment discipline.',
            'Debt-to-income ratio (0.17x) is well within sustainable thresholds.'
          ],
          concerning_factors: [],
          actionable_tips: ['Submit verified ITR returns or income affidavit for expedited disbursement.']
        },
        createdAt: new Date(Date.now() - 86400000 * 2) // 2 days ago
      },
      {
        user: user._id,
        applicantProfile: {
          age: 26,
          gender: 'Male',
          caste: 'SC',
          annual_income: 240000,
          loan_amount: 500000,
          credit_score: 690,
          prior_default: false,
          has_business_plan: true,
          experience_years: 2,
          business_type: 'Green Mobility / Battery E-Rickshaw'
        },
        approval_probability: 88.5,
        risk_tier: 'Low Risk (High Approval Likelihood)',
        risk_badge: 'success',
        dti_ratio: 0.59,
        matchedSchemes: [
          {
            schemeId: insertedSchemes[1]._id,
            schemeName: insertedSchemes[1].name,
            code: insertedSchemes[1].code,
            interestRate: insertedSchemes[1].interestRate,
            subsidyPercentage: insertedSchemes[1].subsidyPercentage,
            estimatedSavingsAnnual: 27500,
            matchScore: 90
          }
        ],
        xai: {
          positive_factors: [
            'Eligible for clean-energy green mobility concession.',
            'Comprehensive DPR prepared.'
          ],
          concerning_factors: ['Loan amount represents substantial multiple of annual turnover.'],
          actionable_tips: ['Avail CGTMSE collateral-free guarantee through partner state channelising agency.']
        },
        createdAt: new Date(Date.now() - 86400000 * 5) // 5 days ago
      }
    ];

    await Prediction.insertMany(samplePredictions);
    console.log(`[Seed]: Seeded ${samplePredictions.length} previous predictions in MongoDB for demo user.`);

    console.log('[Seed]: Database seeding completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('[Seed Error]:', err);
    process.exit(1);
  }
};

seedDatabase();
