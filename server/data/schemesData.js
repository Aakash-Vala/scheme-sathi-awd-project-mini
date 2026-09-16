// Comprehensive real-world Indian government and NSFDC concessional schemes
// Strict requirement: NO EMOJIS anywhere in text, tags, steps or descriptions.

const realWorldSchemes = [
  {
    name: 'Mahila Samriddhi Yojana (MSY)',
    code: 'NSFDC-MSY',
    ministry: 'Ministry of Social Justice and Empowerment',
    category: 'Women Empowerment',
    description: 'Exclusive micro-credit facility providing concessional term assistance to women entrepreneurs from the Scheduled Caste community for tiny and micro business ventures with minimal documentation and relaxed margins.',
    maxLoanAmount: 140000,
    interestRate: 4.0,
    subsidyPercentage: 25,
    moratoriumMonths: 6,
    repaymentTenureYears: 4,
    targetBeneficiary: 'Scheduled Caste women micro-entrepreneurs and Self Help Groups',
    eligibility: {
      minAge: 18,
      maxAge: 60,
      gender: 'Female',
      casteAllowed: ['SC'],
      maxAnnualIncome: 300000,
      minCreditScore: 500,
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Caste Certificate (issued by competent revenue authority)',
      'Income Certificate (annual family income up to 3 Lakh INR)',
      'Bank Account Passbook / Cancelled Cheque',
      'Passport size photographs',
      'Simple Project Proposal / Cost Estimate'
    ],
    applicationSteps: [
      'Fill in applicant personal, caste, and income details',
      'Attach valid proof of identity and revenue caste certificate',
      'Submit through nearest State Channelizing Agency (SCA) or designated rural bank',
      'Inspection and appraisal by district field officer',
      'Direct benefit loan disbursement into beneficiary bank account'
    ],
    officialUrl: 'https://nsfdc.nic.in/en/mahila-samriddhi-yojana',
    tags: ['Women', 'Micro-Finance', 'Affirmative Action', 'Low Interest', 'NSFDC']
  },
  {
    name: 'NSFDC Term Loan Scheme (TLS)',
    code: 'NSFDC-TLS',
    ministry: 'Ministry of Social Justice and Empowerment',
    category: 'Term Loans',
    description: 'Long term financial assistance covering up to 90 percent of the project cost for viable commercially profitable enterprises across manufacturing, service, transport, and trading sectors.',
    maxLoanAmount: 5000000,
    interestRate: 6.0,
    subsidyPercentage: 15,
    moratoriumMonths: 12,
    repaymentTenureYears: 7,
    targetBeneficiary: 'SC individuals, partnerships, and registered cooperative societies',
    eligibility: {
      minAge: 21,
      maxAge: 65,
      gender: 'All',
      casteAllowed: ['SC'],
      maxAnnualIncome: 500000,
      minCreditScore: 600,
    },
    requiredDocuments: [
      'Aadhaar Card and PAN Card',
      'Valid Caste Certificate',
      'Detailed Project Report (DPR) with cashflow projections',
      'Income Certificate',
      'Proof of Business Premises / Lease Agreement',
      'Quotations for machinery and equipment'
    ],
    applicationSteps: [
      'Prepare detailed project report detailing machinery, civil work, and working capital',
      'Submit application to the State Scheduled Castes Development Corporation',
      'Technical and financial viability evaluation by state committee',
      'Sanction letter issued and margin money deposited by promoter',
      'Disbursement of funds and asset creation verification'
    ],
    officialUrl: 'https://nsfdc.nic.in/en/term-loan',
    tags: ['Term Loan', 'Manufacturing', 'Large Enterprise', 'Low Interest', 'NSFDC']
  },
  {
    name: 'Micro Credit Finance Scheme (MCF)',
    code: 'NSFDC-MCF',
    ministry: 'Ministry of Social Justice and Empowerment',
    category: 'Micro-Finance',
    description: 'Quick disbursement working capital and small equipment loan channeled through Self Help Groups and State Channelizing Agencies to combat local usurious moneylenders.',
    maxLoanAmount: 150000,
    interestRate: 5.0,
    subsidyPercentage: 20,
    moratoriumMonths: 3,
    repaymentTenureYears: 3,
    targetBeneficiary: 'Target group beneficiaries engaged in small trades, handicrafts, street vending',
    eligibility: {
      minAge: 18,
      maxAge: 65,
      gender: 'All',
      casteAllowed: ['SC', 'ST'],
      maxAnnualIncome: 300000,
      minCreditScore: 500,
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Caste Certificate',
      'Income Declaration / BPL Card',
      'Bank Account Details',
      'Two passport size photographs'
    ],
    applicationSteps: [
      'Apply directly via village level cooperative or regional SCA desk',
      'Group guarantee verification for SHG mode',
      'Fast-track approval within 14 working days',
      'Fund transfer to Jan Dhan or savings bank account'
    ],
    officialUrl: 'https://nsfdc.nic.in/en/micro-credit-finance',
    tags: ['Micro Credit', 'Fast Track', 'Small Business', 'NSFDC']
  },
  {
    name: 'Green Business Scheme (GBS) - Eco Mobility & Solar',
    code: 'NSFDC-GBS',
    ministry: 'Ministry of Social Justice and Empowerment',
    category: 'Green Mobility',
    description: 'Dedicated financial assistance scheme to promote green entrepreneurial ventures including battery electric rickshaws, solar energy installations, compressed bio-gas, and waste management units.',
    maxLoanAmount: 3000000,
    interestRate: 6.0,
    subsidyPercentage: 25,
    moratoriumMonths: 6,
    repaymentTenureYears: 5,
    targetBeneficiary: 'Entrepreneurs establishing climate-positive clean tech services',
    eligibility: {
      minAge: 20,
      maxAge: 62,
      gender: 'All',
      casteAllowed: ['SC'],
      maxAnnualIncome: 500000,
      minCreditScore: 580,
    },
    requiredDocuments: [
      'Aadhaar and PAN Card',
      'Commercial Driving License / Transport Badge (for EV)',
      'Caste Certificate',
      'Vendor Proforma Invoice / Quotation from authorized OEM',
      'Bank statement for past 6 months'
    ],
    applicationSteps: [
      'Select eligible green mobility or renewable energy asset',
      'Obtain proforma invoice from certified manufacturer',
      'Submit online application through channel partner portal',
      'Direct disbursement to vehicle/equipment dealer upon margin deposit',
      'Hypothecation of asset and insurance issuance'
    ],
    officialUrl: 'https://nsfdc.nic.in/en/green-business-scheme',
    tags: ['Green Mobility', 'Electric Vehicles', 'Solar', 'Sustainability', 'NSFDC']
  },
  {
    name: 'Educational Loan Scheme for Professional Studies (ELS)',
    code: 'NSFDC-ELS',
    ministry: 'Ministry of Social Justice and Empowerment',
    category: 'Education',
    description: 'Concessional interest educational credit for pursuing full-time recognized professional and technical degree courses in India and abroad, with 0.5 percent interest rebate for female students.',
    maxLoanAmount: 2000000,
    interestRate: 4.0,
    subsidyPercentage: 10,
    moratoriumMonths: 12,
    repaymentTenureYears: 10,
    targetBeneficiary: 'Meritorious SC students admitted to accredited professional colleges',
    eligibility: {
      minAge: 17,
      maxAge: 35,
      gender: 'All',
      casteAllowed: ['SC'],
      maxAnnualIncome: 450000,
      minCreditScore: 550,
    },
    requiredDocuments: [
      'Admission Confirmation Letter / Entrance Examination Rank Card',
      'Breakup of tuition fee, hostel, and book expenses from college',
      'Marksheets of 10th, 12th, and undergraduate degree',
      'Income Certificate of Parents/Guardian',
      'Caste Certificate'
    ],
    applicationSteps: [
      'Secure admission to recognized university or college',
      'Submit formal loan request with institution fee schedule to SCA',
      'Course completion timeline and parent co-borrower agreement verification',
      'Direct disbursement to academic institution per semester',
      'Moratorium period applies during course duration plus 1 year'
    ],
    officialUrl: 'https://nsfdc.nic.in/en/educational-loan-scheme',
    tags: ['Higher Education', 'BTech', 'Medical', 'MBA', 'Low Interest', 'NSFDC']
  },
  {
    name: 'Stand-Up India Scheme',
    code: 'MOF-SUI',
    ministry: 'Ministry of Finance & SIDBI',
    category: 'Entrepreneurship',
    description: 'Bank credit facilitation between 10 Lakh and 1 Crore INR to at least one Scheduled Caste or Scheduled Tribe borrower and at least one woman borrower per bank branch for setting up greenfield enterprises.',
    maxLoanAmount: 10000000,
    interestRate: 7.5,
    subsidyPercentage: 15,
    moratoriumMonths: 18,
    repaymentTenureYears: 7,
    targetBeneficiary: 'SC, ST, and Women founders launching greenfield commercial enterprises',
    eligibility: {
      minAge: 18,
      maxAge: 65,
      gender: 'All',
      casteAllowed: ['SC', 'ST', 'OBC', 'General', 'EWS'],
      maxAnnualIncome: 1500000,
      minCreditScore: 650,
    },
    requiredDocuments: [
      'Proof of Identity and Address',
      'Caste Certificate (for SC/ST category claim)',
      'Detailed Project Report (DPR) with financial ratios',
      'Balance sheet and income tax returns for past 2 years (if applicable)',
      'Certificate of Incorporation / Udyam Registration',
      'Pollution control clearance / municipal trade license'
    ],
    applicationSteps: [
      'Register on Stand-Up India digital portal',
      'Select preference for handholding agency or direct bank connection',
      'Credit evaluation and appraisal by public sector commercial bank',
      'Sanction of composite loan (term loan + working capital limit)',
      'Execution of loan security documentation and disbursement'
    ],
    officialUrl: 'https://www.standupmitra.in',
    tags: ['Stand-Up India', 'Greenfield', 'High Loan Limit', 'SIDBI', 'Commercial Bank']
  },
  {
    name: 'Prime Minister Employment Generation Programme (PMEGP)',
    code: 'MSME-PMEGP',
    ministry: 'Ministry of Micro, Small and Medium Enterprises',
    category: 'Entrepreneurship',
    description: 'Major credit-linked subsidy program aimed at generating self-employment opportunities through micro-enterprise establishment in non-farm sectors with capital subsidy up to 35 percent.',
    maxLoanAmount: 5000000,
    interestRate: 8.0,
    subsidyPercentage: 35,
    moratoriumMonths: 6,
    repaymentTenureYears: 7,
    targetBeneficiary: 'Individual entrepreneurs, self-help groups, and cooperative societies',
    eligibility: {
      minAge: 18,
      maxAge: 65,
      gender: 'All',
      casteAllowed: ['SC', 'ST', 'OBC', 'EWS', 'General'],
      maxAnnualIncome: 1000000,
      minCreditScore: 600,
    },
    requiredDocuments: [
      'Aadhaar Card and Educational Qualification Certificate (8th pass minimum for projects above 10L)',
      'Special Category Certificate (SC/ST/OBC/Women/Differently-abled)',
      'Detailed Project Profile',
      'EDP Training Certificate (mandatory prior to final disbursement)',
      'Land/Premises tenancy or ownership proof'
    ],
    applicationSteps: [
      'Submit online application on KVIC PMEGP e-portal',
      'Task force committee interview and recommendation',
      'Forwarded to preferred financing bank branch',
      'Bank credit appraisal and sanction',
      'Mandatory Entrepreneurship Development Programme (EDP) training completion',
      'Direct credit of government capital subsidy into escrow account'
    ],
    officialUrl: 'https://www.kviconline.gov.in/pmegpeportal',
    tags: ['Subsidy 35 Percent', 'PMEGP', 'Manufacturing', 'Service Sector', 'KVIC']
  },
  {
    name: 'PM Mudra Yojana - Shishu Category',
    code: 'PMMY-SHISHU',
    ministry: 'Ministry of Finance',
    category: 'Micro-Finance',
    description: 'Collateral-free micro finance facility covering loans up to 50,000 INR for tiny business setups, roadside kiosks, handloom weavers, and small service providers with nil processing fees.',
    maxLoanAmount: 50000,
    interestRate: 7.0,
    subsidyPercentage: 0,
    moratoriumMonths: 3,
    repaymentTenureYears: 3,
    targetBeneficiary: 'Micro entrepreneurs at nascent stage requiring initial working capital',
    eligibility: {
      minAge: 18,
      maxAge: 65,
      gender: 'All',
      casteAllowed: ['SC', 'ST', 'OBC', 'EWS', 'General'],
      maxAnnualIncome: 600000,
      minCreditScore: 500,
    },
    requiredDocuments: [
      'Identity Proof (Voter ID / Aadhaar / Driving License)',
      'Address Proof (Electricity Bill / Ration Card)',
      'Quotation for items / stock to be purchased',
      'Two recent passport size photographs'
    ],
    applicationSteps: [
      'Approach nearest public sector, private, or regional rural bank',
      'Fill one-page simplified Mudra Shishu loan application form',
      'Zero collateral requirement under Credit Guarantee Fund for Micro Units',
      'Approval and disbursement within 7 to 10 days'
    ],
    officialUrl: 'https://www.mudra.org.in',
    tags: ['Collateral Free', 'No Processing Fee', 'Mudra', 'Shishu', 'Fast Loan']
  },
  {
    name: 'PM Mudra Yojana - Kishor Category',
    code: 'PMMY-KISHOR',
    ministry: 'Ministry of Finance',
    category: 'Micro-Finance',
    description: 'Working capital and machinery financing between 50,000 and 5 Lakh INR for growing small enterprises to expand sales, procure raw materials, or acquire tools.',
    maxLoanAmount: 500000,
    interestRate: 7.5,
    subsidyPercentage: 0,
    moratoriumMonths: 6,
    repaymentTenureYears: 5,
    targetBeneficiary: 'Established micro units seeking intermediate expansion capital',
    eligibility: {
      minAge: 18,
      maxAge: 65,
      gender: 'All',
      casteAllowed: ['SC', 'ST', 'OBC', 'EWS', 'General'],
      maxAnnualIncome: 800000,
      minCreditScore: 580,
    },
    requiredDocuments: [
      'Aadhaar and PAN Card',
      'Business Registration / Trade License / Udyam Certificate',
      'Last 6 months bank statement',
      'Projected cash flows and quotation of equipment to be bought'
    ],
    applicationSteps: [
      'Apply online on Udyamimitra portal or visit bank branch',
      'Credit evaluation without third party security or mortgage',
      'Sanction letter issuance and Mudra Debit Card provided for working capital',
      'Direct payment for equipment to authorized equipment vendor'
    ],
    officialUrl: 'https://www.mudra.org.in',
    tags: ['Mudra', 'Kishor', 'Expansion', 'Working Capital', 'No Collateral']
  },
  {
    name: 'PM Mudra Yojana - Tarun Category',
    code: 'PMMY-TARUN',
    ministry: 'Ministry of Finance',
    category: 'Term Loans',
    description: 'Substantial business expansion loan facility extending from 5 Lakh up to 10 Lakh INR (and up to 20 Lakh under upgraded guidelines) for mature small businesses.',
    maxLoanAmount: 1000000,
    interestRate: 8.5,
    subsidyPercentage: 0,
    moratoriumMonths: 6,
    repaymentTenureYears: 5,
    targetBeneficiary: 'Growing commercial firms, workshops, distributors, and logistics operators',
    eligibility: {
      minAge: 21,
      maxAge: 65,
      gender: 'All',
      casteAllowed: ['SC', 'ST', 'OBC', 'EWS', 'General'],
      maxAnnualIncome: 1200000,
      minCreditScore: 620,
    },
    requiredDocuments: [
      'KYC documents of partners/proprietor',
      'Audited or CA-certified balance sheet for last 2 financial years',
      'GST returns for last 12 months',
      'Existing loan statement of account',
      'Detailed expansion proposal'
    ],
    applicationSteps: [
      'Submit comprehensive application on Udyamimitra portal',
      'Review of GST and banking transactional velocity',
      'Sanction within 15 to 20 working days',
      'Working capital limits credited to business current account'
    ],
    officialUrl: 'https://www.mudra.org.in',
    tags: ['Mudra', 'Tarun', 'High Limit', 'Commercial Growth']
  },
  {
    name: 'PM SVANidhi (Street Vendor AtmaNirbhar Nidhi)',
    code: 'MOHUA-SVANIDHI',
    ministry: 'Ministry of Housing and Urban Affairs',
    category: 'Micro-Finance',
    description: 'Special micro-credit facility providing affordable working capital credit starting at 10,000 INR with 7 percent interest subsidy on timely repayment and digital transaction cashback.',
    maxLoanAmount: 50000,
    interestRate: 6.5,
    subsidyPercentage: 7,
    moratoriumMonths: 1,
    repaymentTenureYears: 1,
    targetBeneficiary: 'Urban and peri-urban street vendors, hawkers, cart pullers',
    eligibility: {
      minAge: 18,
      maxAge: 70,
      gender: 'All',
      casteAllowed: ['SC', 'ST', 'OBC', 'EWS', 'General'],
      maxAnnualIncome: 250000,
      minCreditScore: 450,
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Certificate of Vending / Identity Card issued by Urban Local Body',
      'Letter of Recommendation from Town Vending Committee (if ID not yet issued)',
      'Bank Account linked with Aadhaar and Mobile Number'
    ],
    applicationSteps: [
      'Submit digital application via PM SVANidhi mobile portal',
      'Verification of vending credentials with urban municipality registry',
      'Automated routing to designated lending bank branch',
      'Direct disbursement into Aadhaar seeded bank account'
    ],
    officialUrl: 'https://pmsvanidhi.mohua.gov.in',
    tags: ['Street Vendor', 'Zero Collateral', 'Digital Cashback', 'Subsidized']
  },
  {
    name: 'PM Vishwakarma Scheme',
    code: 'MSME-VISHWAKARMA',
    ministry: 'Ministry of Micro, Small and Medium Enterprises',
    category: 'Entrepreneurship',
    description: 'Holistic central scheme for traditional artisans and craftspeople offering collateral-free enterprise credit up to 3 Lakh INR at a highly concessional interest rate of 5 percent with skill verification.',
    maxLoanAmount: 300000,
    interestRate: 5.0,
    subsidyPercentage: 8,
    moratoriumMonths: 6,
    repaymentTenureYears: 3,
    targetBeneficiary: 'Traditional artisans across 18 listed trades (carpenters, blacksmiths, potters, cobblers, tailors)',
    eligibility: {
      minAge: 18,
      maxAge: 65,
      gender: 'All',
      casteAllowed: ['SC', 'ST', 'OBC', 'EWS', 'General'],
      maxAnnualIncome: 400000,
      minCreditScore: 500,
    },
    requiredDocuments: [
      'Aadhaar Card and Mobile verification',
      'Ration Card / Family registration',
      'Self-declaration of traditional trade craft practice',
      'Bank account passbook'
    ],
    applicationSteps: [
      'Online biometric registration at Common Services Centre (CSC)',
      'Three-stage verification (Gram Panchayat / ULB, District Committee, Screening Committee)',
      '5-7 days basic skill verification training with daily stipend',
      'Tool kit incentive credit of 15,000 INR',
      'Concessional credit tranche-1 (up to 1 Lakh) disbursed at 5 percent interest'
    ],
    officialUrl: 'https://pmvishwakarma.gov.in',
    tags: ['Artisans', 'Craftsmen', 'Stipend', 'Tool Kit', 'Concessional']
  },
  {
    name: 'National Overseas Scholarship for SC Candidates (NOS)',
    code: 'MOSJE-NOS',
    ministry: 'Ministry of Social Justice and Empowerment',
    category: 'Education',
    description: 'Prestigious central scholarship scheme facilitating low-income students from marginalized sections to obtain Masters and PhD degrees in premier foreign universities with full tuition and contingency grants.',
    maxLoanAmount: 4000000,
    interestRate: 0.0,
    subsidyPercentage: 100,
    moratoriumMonths: 24,
    repaymentTenureYears: 0,
    targetBeneficiary: 'SC, de-notified nomadic tribes, and landless agricultural laborer students',
    eligibility: {
      minAge: 21,
      maxAge: 35,
      gender: 'All',
      casteAllowed: ['SC'],
      maxAnnualIncome: 800000,
      minCreditScore: 500,
    },
    requiredDocuments: [
      'Valid Indian Passport',
      'Unconditional Offer Letter from Top 500 QS World Ranked University',
      'Caste Certificate and Family Income Certificate',
      'Undergraduate / Postgraduate Degree Marksheets (minimum 60 percent marks)',
      'Two academic recommendation letters'
    ],
    applicationSteps: [
      'Register on official MoSJE NOS online portal during active call window',
      'Upload verified admission offer and academic records',
      'Scrutiny by central scholarship evaluation committee',
      'Selection notification and issuance of financial guarantee certificate to foreign embassy',
      'Direct reimbursement of tuition fee to university plus maintenance allowance'
    ],
    officialUrl: 'https://nosmsje.gov.in',
    tags: ['Overseas Education', 'Full Scholarship', 'Masters', 'PhD', 'MoSJE']
  },
  {
    name: 'Venture Capital Fund for Scheduled Castes (VCF-SC)',
    code: 'IFCI-VCF-SC',
    ministry: 'Ministry of Social Justice and Empowerment & IFCI Venture',
    category: 'Entrepreneurship',
    description: 'First-of-its-kind venture capital initiative aimed at promoting entrepreneurship among Scheduled Castes by investing in early stage and expansion stage commercial technology startups.',
    maxLoanAmount: 15000000,
    interestRate: 4.0,
    subsidyPercentage: 15,
    moratoriumMonths: 24,
    repaymentTenureYears: 8,
    targetBeneficiary: 'Private limited companies with minimum 51 percent shareholding owned by SC promoters',
    eligibility: {
      minAge: 21,
      maxAge: 65,
      gender: 'All',
      casteAllowed: ['SC'],
      maxAnnualIncome: 2500000,
      minCreditScore: 650,
    },
    requiredDocuments: [
      'Certificate of Incorporation and MOA/AOA',
      'Proof of 51 percent SC promoter shareholding',
      'Comprehensive Business Plan and Valuation Report',
      'Audited Financial Statements for past 2 years (if operational)',
      'GST and Income Tax returns of company and promoters'
    ],
    applicationSteps: [
      'Submit startup pitch deck and formal proposal on IFCI Venture website',
      'Preliminary screening and evaluation by investment committee',
      'Detailed legal and financial due diligence',
      'Investment committee approval and shareholders agreement execution',
      'Disbursement of equity or quasi-equity concessional funds'
    ],
    officialUrl: 'https://vcfsc.in',
    tags: ['Venture Capital', 'Startups', 'High Growth', 'Equity', 'IFCI']
  },
  {
    name: 'Credit Enhancement Guarantee Scheme for SCs (CEGSSC)',
    code: 'IFCI-CEGSSC',
    ministry: 'Ministry of Social Justice and Empowerment',
    category: 'Term Loans',
    description: 'Guarantees bank loans ranging from 15 Lakh to 5 Crore INR sanctioned to SC entrepreneurs without asking for external collateral or third party pledge.',
    maxLoanAmount: 50000000,
    interestRate: 7.0,
    subsidyPercentage: 10,
    moratoriumMonths: 12,
    repaymentTenureYears: 7,
    targetBeneficiary: 'Registered commercial entities and MSMEs headed by Scheduled Caste individuals',
    eligibility: {
      minAge: 21,
      maxAge: 65,
      gender: 'All',
      casteAllowed: ['SC'],
      maxAnnualIncome: 3000000,
      minCreditScore: 650,
    },
    requiredDocuments: [
      'Promoter Caste Certificate',
      'Bank sanction letter for business term loan or cash credit',
      'Project appraisal report prepared by lending institution',
      'Firm registration certificates and KYC of all key directors'
    ],
    applicationSteps: [
      'Apply to commercial bank or financial institution for credit sanction',
      'Bank requests guarantee cover from IFCI under CEGSSC scheme',
      'Guarantee fee processed and guarantee agreement issued to bank',
      'Lender releases collateral-free funds to borrower'
    ],
    officialUrl: 'https://cegssc.in',
    tags: ['Credit Guarantee', 'Collateral Free', 'MSME', 'IFCI']
  }
];

module.exports = realWorldSchemes;
