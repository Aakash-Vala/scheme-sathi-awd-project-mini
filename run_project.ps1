Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "Starting Scheme Sathi - AWD University Project" -ForegroundColor Cyan
Write-Host "ML (Random Forest) + React + Node.js + MongoDB" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

# 1. Start ML Microservice
Write-Host "`n[1/3] Starting Python ML Predictor Service on port 5001..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\ml_service'; python predict_service.py" -WorkingDirectory "$PSScriptRoot"

# 2. Start Express Backend
Write-Host "`n[2/3] Starting Node.js Express Server on port 5000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\server'; node index.js" -WorkingDirectory "$PSScriptRoot"

# 3. Start Vite React Frontend
Write-Host "`n[3/3] Starting React Vite Client on port 5173..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\client'; npm run dev" -WorkingDirectory "$PSScriptRoot"

Write-Host "`nAll 3 services launched successfully!" -ForegroundColor Magenta
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host "Backend API: http://localhost:5000" -ForegroundColor Yellow
Write-Host "ML Service: http://localhost:5001" -ForegroundColor Yellow
Write-Host "`nDemo Credentials: demo@schemesathi.gov.in / Password123!" -ForegroundColor White
