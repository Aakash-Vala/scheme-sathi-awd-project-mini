# Scheme Sathi (AWD University Edition)

An AI-driven concessional credit decision portal and scheme matching engine designed for marginalized entrepreneurs under the Ministry of Social Justice and Empowerment (MoSJE) and NSFDC guidelines.

Built as an Advanced Web Development (AWD) capstone project integrating Machine Learning with a full MERN stack (React 19 + Node.js Express + MongoDB).

---

## Technical Stack Architecture

- **Machine Learning (ML)**: Python Scikit-Learn `RandomForestClassifier` (120 decision estimators, ROC-AUC: 0.971, Accuracy: 89.9%) served via lightweight Flask microservice on port 5001.
- **Frontend (React)**: React 19 + Vite + Tailwind CSS + Lucide React icons.
- **Backend (Node.js)**: Express.js REST API on port 5000 with JWT authentication and bcrypt password hashing.
- **Database (MongoDB)**: Local MongoDB instance (`scheme_sathi_awd`) with Mongoose ODM storing verified government schemes, user credentials, saved bookmarks, and prediction histories.

---

## Project Checklist Fulfillment

1. **AI Predictor**:
   - Evaluates multi-dimensional applicant profiles (Income, Loan Amount, Caste, Gender, Age, Credit Score, DTI ratio, DPR status, Experience).
   - Computes approval probability (0-100%) and Risk Tier classification (Low Risk, Moderate Risk, High Risk).
   - Provides Explainable AI (XAI) transparent factors and actionable enhancement recommendations.
   - Calculates estimated annual interest savings against commercial bank baseline rates (11.5% APR).

2. **Real-World Database**:
   - Seeded with 15 official Indian government and NSFDC schemes:
     - Mahila Samriddhi Yojana (MSY)
     - NSFDC Term Loan Scheme (TLS)
     - Micro Credit Finance Scheme (MCF)
     - Green Business Scheme (Eco Mobility & Solar)
     - Educational Loan Scheme for Professional Studies (ELS)
     - Stand-Up India Scheme (SIDBI)
     - Prime Minister Employment Generation Programme (PMEGP)
     - PM Mudra Yojana (Shishu, Kishor, Tarun)
     - PM SVANidhi (Street Vendor Loan)
     - PM Vishwakarma Scheme
     - National Overseas Scholarship for SC Candidates (NOS)
     - Venture Capital Fund for Scheduled Castes (VCF-SC)
     - Credit Enhancement Guarantee Scheme for SCs (CEGSSC)

3. **Login & Signup & Beneficiary Dashboard**:
   - Secure registration and authentication with JWT and bcryptjs.
   - Demographic profile storage (Caste, Gender, Age, Annual Income, State, Occupation).
   - 1-click profile autofill into the AI Predictor.
   - Saved schemes bookmarking and historical prediction tracking in MongoDB.

4. **Aesthetic & UI Guidelines**:
   - **Color Palette**: Primary `#94ffdb` (mint/aquamarine), base surfaces white `#ffffff` (light mode), and outlines/borders `#ffb0e7` (soft pink/lilac).
   - **Dark Theme Toggle**: Seamless transition between light and dark modes with persistent `localStorage` memory.
   - **Clean Nav Bar**: Sticky glassmorphic navbar with route indicators, theme toggle, and auth controls.
   - **Zero Emojis**: 100% emoji-free codebase using clean Lucide SVG icons.

---

## Quick Start Instructions

### Prerequisites
- Node.js (v18+)
- Python (v3.10+) with `scikit-learn`, `flask`, `pandas`, `numpy`
- MongoDB running on `mongodb://127.0.0.1:27017`

### Single-Click Launch (Windows)
Double-click `run_project.bat` or execute in PowerShell:
```powershell
.\run_project.ps1
```

### Manual Service Startup

#### 1. Start Python ML Microservice
```bash
cd ml_service
python predict_service.py
# Runs on http://127.0.0.1:5001
```

#### 2. Seed Database & Start Node.js Server
```bash
cd server
npm install
node seed.js    # Seeds MongoDB with 15 real-world schemes
node index.js   # Runs on http://localhost:5000
```

#### 3. Start React Frontend
```bash
cd client
npm install
npm run dev     # Runs on http://localhost:5173
```

---

## Demo Credentials

- **Email**: `demo@schemesathi.gov.in`
- **Password**: `Password123!`

---

## REST API Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user profile |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT |
| `GET` | `/api/auth/me` | Fetch authenticated profile & bookmarks |
| `POST` | `/api/auth/save-scheme/:id` | Toggle scheme bookmark |
| `GET` | `/api/schemes` | List schemes with search and category filters |
| `GET` | `/api/schemes/categories` | Retrieve distinct scheme categories |
| `GET` | `/api/schemes/:id` | Retrieve full details of single scheme |
| `POST` | `/api/predict` | Predict approval probability & match schemes |
| `GET` | `/api/predict/history` | Retrieve previous user evaluations |
