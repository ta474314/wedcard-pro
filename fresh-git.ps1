# final-push.ps1
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Final Push to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location "E:\Project Code\wedcard-pro"

Write-Host "IMPORTANT: First create repository on GitHub!" -ForegroundColor Yellow
Write-Host "1. Go to: https://github.com/new" -ForegroundColor Cyan
Write-Host "2. Repository name: wedcard-pro" -ForegroundColor Cyan
Write-Host "3. Click 'Create repository'" -ForegroundColor Cyan
Write-Host ""

$confirm = Read-Host "Have you created the repository? (yes/no)"
if ($confirm -ne "yes") {
    Write-Host "Please create the repository first, then run this script again." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Enter your GitHub Personal Access Token" -ForegroundColor Yellow
Write-Host "Get token from: https://github.com/settings/tokens/new" -ForegroundColor Cyan
Write-Host "Select ALL 'repo' scopes" -ForegroundColor Cyan
Write-Host ""

$token = Read-Host "Paste your token here" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
$plainToken = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Green

# Try pushing
git push https://ta474314:$plainToken@github.com/ta474314/wedcard-pro.git master --force

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "   ✅ SUCCESS!" -ForegroundColor Green
    Write-Host "   https://github.com/ta474314/wedcard-pro" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Trying to set remote first..." -ForegroundColor Yellow
    git remote remove origin
    git remote add origin https://github.com/ta474314/wedcard-pro.git
    git push https://ta474314:$plainToken@github.com/ta474314/wedcard-pro.git master --force
}

[System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($BSTR)