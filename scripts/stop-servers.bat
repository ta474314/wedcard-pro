@echo off
title WedCard Pro - Stopping Servers
color 0C

echo ========================================
echo    WedCard Pro Server Stopper
echo ========================================
echo.

echo [1/4] Stopping Node.js servers...

:: Kill all node processes on ports 5000 and 3000
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do (
    echo Stopping process ID: %%a
    taskkill /f /pid %%a >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do (
    echo Stopping process ID: %%a
    taskkill /f /pid %%a >nul 2>&1
)

:: Kill all node processes (alternative method)
echo Killing all Node.js processes...
taskkill /f /im node.exe >nul 2>&1

echo [2/4] Stopping MongoDB...

:: Stop MongoDB process
taskkill /f /im mongod.exe >nul 2>&1

:: Stop MongoDB service if running
net stop MongoDB >nul 2>&1

echo [3/4] Cleaning up...

:: Kill any remaining processes on ports
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000"') do (
    taskkill /f /pid %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000"') do (
    taskkill /f /pid %%a >nul 2>&1
)

:: Remove process info file
if exist "%TEMP%\wedcard_processes.txt" del "%TEMP%\wedcard_processes.txt"

echo [4/4] Final cleanup...

:: Wait for processes to close
timeout /t 2 >nul

echo.
echo ========================================
echo    ✓ ALL SERVERS STOPPED ✓
echo ========================================
echo.
echo All services have been stopped successfully.
echo.
echo Press any key to exit...
pause >nul
exit