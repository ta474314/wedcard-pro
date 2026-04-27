# fresh-git.ps1
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Fresh Git Setup - WedCard Pro" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location "E:\Project Code\wedcard-pro"

Write-Host "[1/8] Removing old .git folder..." -ForegroundColor Yellow
Remove-Item -Path ".git" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "OK" -ForegroundColor Green
Write-Host ""

Write-Host "[2/8] Initializing fresh git repository..." -ForegroundColor Yellow
git init
Write-Host "OK" -ForegroundColor Green
Write-Host ""

Write-Host "[3/8] Setting user identity..." -ForegroundColor Yellow
git config user.name "ta474314"
git config user.email "ta474314@gmail.com"
Write-Host "OK" -ForegroundColor Green
Write-Host ""

Write-Host "[4/8] Creating .gitignore..." -ForegroundColor Yellow
@"
node_modules/
dist/
build/
.env
.env.local
.env.production
.DS_Store
*.log
.vscode/
.idea/
backend/node_modules/
frontend/node_modules/
backend/dist/
frontend/dist/
"@ | Out-File -FilePath ".gitignore" -Encoding utf8
Write-Host "OK" -ForegroundColor Green
Write-Host ""

Write-Host "[5/8] Adding files..." -ForegroundColor Yellow
git add .
Write-Host "OK" -ForegroundColor Green
Write-Host ""

Write-Host "[6/8] Committing files..." -ForegroundColor Yellow
git commit -m "Initial commit: WedCard Pro application"
Write-Host "OK" -ForegroundColor Green
Write-Host ""

Write-Host "[7/8] Adding remote repository..." -ForegroundColor Yellow
git remote add origin https://github.com/ta474314/wedcard-pro.git
Write-Host "OK" -ForegroundColor Green
Write-Host ""

Write-Host "[8/8] Pushing to GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "IMPORTANT: When prompted for password, use your Personal Access Token" -ForegroundColor Red
Write-Host "Get token from: https://github.com/settings/tokens" -ForegroundColor Red
Write-Host ""
git push -u origin master

Write-Host ""
if ($LASTEXITCODE -eq 0) {
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "   ✅ SUCCESS! Code pushed to GitHub" -ForegroundColor Green
    Write-Host "   https://github.com/ta474314/wedcard-pro" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
} else {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "   ❌ FAILED. Trying with main branch..." -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    git push -u origin main
}