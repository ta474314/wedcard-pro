@echo off
title WedCard Pro - Server Status
color 0F

echo ========================================
echo    WedCard Pro Server Status
echo ========================================
echo.

:: Check Backend Port 5000
echo Checking Backend Server (Port 5000)...
netstat -aon | find ":5000" | find "LISTENING" >nul
if %errorLevel% equ 0 (
    echo [✓] Backend is RUNNING on port 5000
    for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do (
        echo     Process ID: %%a
    )
) else (
    echo [✗] Backend is NOT running
)

echo.

:: Check Frontend Port 3000
echo Checking Frontend Server (Port 3000)...
netstat -aon | find ":3000" | find "LISTENING" >nul
if %errorLevel% equ 0 (
    echo [✓] Frontend is RUNNING on port 3000
    for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do (
        echo     Process ID: %%a
    )
) else (
    echo [✗] Frontend is NOT running
)

echo.

:: Check MongoDB
echo Checking MongoDB...
tasklist /fi "imagename eq mongod.exe" | find "mongod.exe" >nul
if %errorLevel% equ 0 (
    echo [✓] MongoDB is RUNNING
) else (
    echo [✗] MongoDB is NOT running
)

echo.

:: Check Node.js processes
echo Node.js Processes:
tasklist /fi "imagename eq node.exe" | find "node.exe"

echo.
echo ========================================
echo.
echo Press any key to exit...
pause >nul
exit