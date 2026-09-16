@echo off
title Launch Scheme Sathi AWD Project
echo ===================================================
echo Starting Scheme Sathi - AWD University Project
echo ML (Random Forest) + React + Node.js + MongoDB
echo ===================================================
cd /d "%~dp0"

echo.
echo [1/3] Starting Python ML Predictor Service on port 5001...
start "Scheme Sathi - ML Service" cmd /k "cd ml_service && python predict_service.py"

echo.
echo [2/3] Starting Node.js Express Server on port 5000...
start "Scheme Sathi - Node Server" cmd /k "cd server && node index.js"

echo.
echo [3/3] Starting React Vite Client on port 5173...
start "Scheme Sathi - React Client" cmd /k "cd client && npm run dev"

echo.
echo All services launched!
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:5000
echo ML Service: http://localhost:5001
echo Demo User: demo@schemesathi.gov.in / Password123!
echo.
pause
