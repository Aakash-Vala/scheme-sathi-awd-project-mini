# Scheme Sathi (AWD University Edition)

An AI-driven concessional credit decision portal, statutory scheme matching engine, and underwriting decision-support system designed for marginalized entrepreneurs under the guidelines of the Ministry of Social Justice and Empowerment (MoSJE), National Scheduled Castes Finance and Development Corporation (NSFDC), SIDBI, and Central Government credit assistance programs.

Developed as an Advanced Web Development (AWD) capstone project integrating Machine Learning with a full-stack MERN architecture (React 19, Express.js, MongoDB) and a Python Flask predictive microservice.

---

## System Architecture

```text
+-----------------------------------------------------------------------------------+
|                                  CLIENT TIER                                      |
|  React 19 + Vite + Tailwind CSS + Lucide Icons (Port 5173)                        |
|  - Real-Time Predictor & Interactive Underwriting Gauges                          |
|  - Government Schemes Catalog & Dynamic Search Filters                            |
|  - Beneficiary Portfolio Dashboard & Saved Bookmarks                              |
|  - Persistent Light / Dark Mode Toggle                                            |
+----------------------------------------+------------------------------------------+
                                         | REST / JSON
                                         v
+-----------------------------------------------------------------------------------+
|                             BACKEND API GATEWAY                                   |
|  Node.js + Express.js API Server (Port 5000)                                      |
|  - Security Middleware: Helmet.js (HTTP Security Headers, CSP, HSTS)              |
|  - Input Validation: Joi Schema Middleware (Sanitized & Typed Payloads)           |
|  - Authentication: JWT (JSON Web Tokens) + Bcrypt Password Hashing                |
|  - Fallback ML Engine: Deterministic Heuristic Underwriting Pipeline              |
+--------------------+-------------------------------------+------------------------+
                     |                                     |
                     v                                     v
+--------------------+--------------+   +------------------+------------------------+
|           DATA TIER               |   |            ML SERVICE TIER                |
|  MongoDB (Port 27017)             |   |  Python Flask Microservice (Port 5001)    |
|  - schemes (30 Concessional Pgms) |   |  - Scikit-Learn RandomForestClassifier    |
|  - users (Demographics & Auth)    |   |  - 120 Estimators, ROC-AUC: 0.971         |
|  - predictions (Audit Trail)      |   |  - Explainable AI (XAI) Feature Factors   |
+-----------------------------------+   +-------------------------------------------+
```

---

## Technical Stack

| Layer | Technologies | Key Responsibilities |
|---|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS, Lucide React, Axios | Reactive UI, theme persistence, interactive risk meters, 1-click prediction triggers |
| **Backend API** | Node.js, Express.js, Mongoose ODM | REST endpoints, authentication tokens, statutory filter matching, interest subsidy calculations |
| **Security** | Helmet.js, Joi, native bcrypt | HTTP header protection, strict input sanitization, salted password hashing |
| **Machine Learning** | Python 3.10+, Scikit-Learn, Flask, NumPy, Pandas | Supervised credit underwriting prediction, feature importance derivation, XAI risk drivers |
| **Database** | MongoDB 7.0+ (Local Service / Compass) | Persistent scheme registry, user profiles, saved bookmarks, prediction evaluation logs |

---

## Core Capabilities & Features

### 1. AI Scheme Eligibility & Underwriting Predictor
- **10 Underwriting Signals Evaluated**: Age, Gender, Caste/Social Category, Annual Family Income, Requested Loan Amount, Credit/CIBIL Score, Prior Credit Default History, Detailed Business Plan (DPR) Status, Entrepreneurial Experience Years, and Business Sector.
- **Ensemble Inference**: Computes precise approval likelihood (0-100%) and categorizes applicants into calibrated risk tiers:
  - *Low Risk* (High Approval Likelihood - 75% to 98%)
  - *Moderate Risk* (Standard Underwriting Review - 48% to 74%)
  - *High Risk* (Requires Credit Enhancement - Below 48%)
- **Explainable AI (XAI)**: Generates transparent positive underwriting drivers and actionable financial advisory steps.
- **Debt-to-Income (DTI) Analysis**: Evaluates borrower leverage against an institutional benchmark factor.

### 2. Targeted Scheme Prediction Workflow
- **1-Click Direct Evaluation**: Click **"Predict"** on any scheme card across the catalog or dashboard to evaluate approval likelihood for that specific program.
- **Intelligent Parameter Adaptation**: Pre-populates the underwriting form within statutory loan caps and category guidelines.
- **Statutory Lending Rules Checklist**: Automatically verifies 5 statutory criteria:
  - Applicant Age Threshold (Min/Max eligibility)
  - Affirmative Action / Caste Category Inclusivity
  - Gender Inclusivity & Women-Specific Subsidies
  - Annual Family Income Ceiling Check
  - Requested Loan Amount Cap Check
- **Interest Subsidy Calculations**: Quantifies estimated annual savings against standard commercial bank borrowing rates (11.5% APR).

### 3. Real-World Concessional Schemes Registry
Seeded directly into MongoDB with active institutional schemes from MoSJE, NSFDC, and Central Ministries:
- Mahila Samriddhi Yojana (MSY) - Concessional credit for women entrepreneurs
- NSFDC Term Loan Scheme (TLS) - Term loans for micro and small enterprises
- Micro Credit Finance Scheme (MCF) - Quick micro-turnaround loans
- Green Business Scheme - Concessional funding for battery e-rickshaws and solar units
- Educational Loan Scheme for Professional Studies (ELS) - Subsidized professional degrees
- Stand-Up India Scheme (SIDBI) - Greenfield enterprise credit for SC/ST and women
- Prime Minister Employment Generation Programme (PMEGP) - Margin money capital subsidy
- Pradhan Mantri Mudra Yojana (Shishu, Kishor, Tarun) - Collateral-free business loans
- PM SVANidhi - Working capital credit for urban street vendors
- PM Vishwakarma Scheme - Credit and collateral support for traditional artisans
- National Overseas Scholarship for SC Candidates (NOS) - International master/PhD funding
- Venture Capital Fund for Scheduled Castes (VCF-SC) - Equity-based growth financing
- Credit Enhancement Guarantee Scheme for SCs (CEGSSC) - Collateral guarantee backstop

### 4. Enterprise Security & Hardening
- **Helmet.js Security Headers**: Integrated HTTP defense headers including Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), `X-Content-Type-Options: nosniff`, and Referrer-Policy.
- **Joi Request Validation**: Declarative schema validation enforcing strict types and constraints across user registration, login, and prediction payloads.
- **Bcrypt Password Security**: Multi-round salted hashing protecting user passwords in MongoDB.
- **Statutory Data Integrity**: Zero unindexed mock tables; Aadhaar mock collections completely purged.

### 5. Design System & Aesthetics
- **Signature Palette**: Primary accent mint green (`#94ffdb`), subtle outlines translucent pink (`#ffb0e7`), with dark surfaces (`#0b0f17`, `#121824`).
- **Interactive Action Buttons**: Translucent pink initially, transitioning smoothly to mint green on hover.
- **Zero-Emoji Compliance**: Fully free of emojis; utilizes clean Lucide SVG vector iconography throughout.
- **Responsive Dark/Light Mode**: Class-based dark mode toggle with persistent `localStorage` synchronization.

---

## Directory Structure

```text
scheme-sathi-awd-project-mini/
├── client/                         # React 19 Frontend
│   ├── public/                     # Static web assets
│   ├── src/
│   │   ├── components/             # Navbar, Footer, LoginModal, RegisterModal
│   │   ├── context/                # AuthContext, ThemeContext
│   │   ├── pages/                  # Home, Predictor, SchemesCatalog, Dashboard, About
│   │   ├── App.jsx                 # Tab navigation & global prediction state
│   │   ├── index.css               # Tailwind CSS & custom .btn-action styles
│   │   └── main.jsx                # Application root
│   ├── package.json
│   └── vite.config.js
│
├── server/                         # Node.js Express Backend
│   ├── config/                     # Database connection (MongoDB)
│   ├── data/                       # Official real-world schemes seed dataset
│   ├── middleware/                 # JWT Auth, Joi validation middleware
│   ├── models/                     # Mongoose models: Scheme, User, Prediction
│   ├── routes/                     # REST routes: auth, schemes, predict
│   ├── validators/                 # Joi schemas: authValidator, predictValidator
│   ├── index.js                    # Express application entry with Helmet
│   ├── seed.js                     # MongoDB database seeder script
│   └── package.json
│
├── ml_service/                     # Python ML Inference Microservice
│   ├── models/                     # Serialized model artifacts (.pkl)
│   ├── predict_service.py          # Flask microservice (Port 5001)
│   ├── train_model.py              # Model training & cross-validation script
│   └── requirements.txt
│
├── run_project.bat                 # One-click Windows launch batch script
├── run_project.ps1                 # One-click PowerShell launch automation
└── README.md                       # Comprehensive documentation
```

---

## Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Python**: v3.10 or higher
- **MongoDB**: Community Server running locally on `mongodb://127.0.0.1:27017`
- **Git**: Installed and configured

---

### Method 1: Single-Click Launch (Windows)

Launch the complete 3-service stack using the included automation script:

```powershell
.\run_project.ps1
```

Or double-click `run_project.bat` in File Explorer.

---

### Method 2: Manual Step-by-Step Setup

#### Step 1: Start the Python ML Service
```bash
cd ml_service
pip install -r requirements.txt
python predict_service.py
# Running on http://127.0.0.1:5001
```

#### Step 2: Seed MongoDB & Start the Express Backend
```bash
cd server
npm install
node seed.js    # Seeds 15+ real-world government schemes and demo user
node index.js   # Running on http://localhost:5000
```

#### Step 3: Start the React Frontend
```bash
cd client
npm install
npm run dev     # Running on http://localhost:5173
```

Access the application in your browser at `http://localhost:5173`.

---

## Demo Credentials

For quick evaluation, pre-seeded demo credentials are ready to use:

- **Email**: `demo@schemesathi.gov.in`
- **Password**: `Password123!`

---

## REST API Specification

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Request Body | Auth Required |
|---|---|---|---|---|
| `POST` | `/api/auth/register` | Register new user profile | `{ name, email, password, caste, gender, age, annualIncome, state, occupation }` | No |
| `POST` | `/api/auth/login` | Authenticate and obtain JWT | `{ email, password }` | No |
| `GET` | `/api/auth/me` | Retrieve profile and saved schemes | None | Yes (Bearer Token) |
| `POST` | `/api/auth/save-scheme/:id` | Toggle bookmark on a scheme | None | Yes (Bearer Token) |

### Scheme Catalog Routes (`/api/schemes`)

| Method | Endpoint | Description | Query Parameters | Auth Required |
|---|---|---|---|---|
| `GET` | `/api/schemes` | List schemes with filtering | `search`, `category`, `caste` | No |
| `GET` | `/api/schemes/categories` | Retrieve distinct categories | None | No |
| `GET` | `/api/schemes/:id` | Retrieve single scheme guidelines | None | No |

### AI Prediction Routes (`/api/predict`)

| Method | Endpoint | Description | Request Body | Auth Required |
|---|---|---|---|---|
| `POST` | `/api/predict` | Run ML underwriting evaluation | `{ age, gender, caste, annual_income, loan_amount, credit_score, prior_default, has_business_plan, experience_years, business_type }` | Optional (Attaches audit record to user if signed in) |
| `GET` | `/api/predict/history` | Retrieve historical evaluations | None | Yes (Bearer Token) |

---

## Machine Learning Model Details

- **Algorithm**: `RandomForestClassifier` (Scikit-Learn ensemble)
- **Estimators**: 120 Decision Trees
- **Criterion**: Gini Impurity with Bootstrap Aggregation
- **Cross-Validation Accuracy**: 89.9%
- **ROC-AUC Score**: 0.971
- **Primary Predictive Features**:
  1. Debt-to-Income (DTI) Leverage Ratio
  2. Credit Bureau / CIBIL Score
  3. Prior Default Record
  4. Detailed Project Report (DPR) Availability
  5. Entrepreneurial Experience Years
  6. Annual Household Income
- **High-Availability Fallback**: The Express backend contains an internal deterministic heuristic engine that handles requests smoothly if the Python microservice is temporarily stopped.

---

## Academic Context

Developed for the **Advanced Web Development (AWD)** curriculum at university level. This project demonstrates mastery of modern web architecture patterns, microservice decoupling, institutional data modeling, asynchronous state management, declarative input sanitization, and enterprise security headers.
