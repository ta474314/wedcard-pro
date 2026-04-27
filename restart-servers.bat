@echo off
title WedCard Pro - Restarting Servers
color 0E

echo ========================================
echo    WedCard Pro Server Restarter
echo ========================================
echo.

echo Stopping servers first...
call stop-servers.bat

echo Waiting for cleanup...
timeout /t 3 >nul

echo Starting servers...
call start-servers.bat

exit