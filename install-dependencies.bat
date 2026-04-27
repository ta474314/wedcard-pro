@echo off
title WedCard Pro - Installing Dependencies
color 0A

echo ========================================
echo    WedCard Pro Setup
echo ========================================
echo.

:: Get current directory
set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

:: Check if Node.js is installed
echo Checking Node.js installation...
node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    pause
    exit
)
echo [OK] Node.js found

:: Check if npm is installed
npm --version >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] npm is not installed!
    pause
    exit
)
echo [OK] npm found

echo.
echo Installing Backend Dependencies...
cd backend
call npm install
if %errorLevel% neq 0 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit
)
echo [OK] Backend dependencies installed

echo.
echo Installing Frontend Dependencies...
cd ../frontend
call npm install
if %errorLevel% neq 0 (
    echo [ERROR] Failed to install frontend dependencies
    pause
    exit
)
echo [OK] Frontend dependencies installed

cd ..

echo.
echo Creating data directory for MongoDB...
mkdir C:\data\db 2>nul
mkdir C:\data\log 2>nul

echo.
echo ========================================
echo    ✓ SETUP COMPLETE ✓
echo ========================================
echo.
echo You can now run: start-servers.bat
echo.
pause
exit