@echo off
title WedCard Pro - Starting Servers
color 0A

echo ========================================
echo    WedCard Pro Server Launcher
echo ========================================
echo.

:: Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [WARNING] Not running as administrator
    echo Some features may not work properly
    echo.
)

:: Get current directory
set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

:: Kill existing processes on ports
echo [1/5] Cleaning ports 5000 and 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do (
    taskkill /f /pid %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do (
    taskkill /f /pid %%a >nul 2>&1
)
echo [OK] Ports cleaned
timeout /t 2 >nul

:: Start MongoDB (if installed)
echo [2/5] Starting MongoDB...
if exist "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" (
    start "MongoDB" /min "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath C:\data\db
    echo [OK] MongoDB started
) else (
    echo [SKIP] MongoDB not found - using local connection
)
timeout /t 3 >nul

:: Start Backend Server
echo [3/5] Starting Backend Server (Port 5000)...
start "WedCard Backend" /min cmd /c "cd /d "%PROJECT_DIR%backend" && npm run dev"
echo [OK] Backend starting...
timeout /t 3 >nul

:: Start Frontend Server
echo [4/5] Starting Frontend Server (Port 3000)...
start "WedCard Frontend" /min cmd /c "cd /d "%PROJECT_DIR%frontend" && npm run dev"
echo [OK] Frontend starting...
timeout /t 3 >nul

:: Save process IDs
echo [5/5] Saving process information...
tasklist /fi "imagename eq node.exe" /fo csv > "%TEMP%\wedcard_processes.txt"
tasklist /fi "imagename eq mongod.exe" /fo csv >> "%TEMP%\wedcard_processes.txt"

echo.
echo ========================================
echo    ✓ SERVERS STARTED SUCCESSFULLY ✓
echo ========================================
echo.
echo 📍 Backend:  http://localhost:5000
echo 📍 Frontend: http://localhost:3000
echo.
echo 💡 To stop servers, run: stop-servers.bat
echo.
echo Press any key to minimize this window...
pause >nul
exit