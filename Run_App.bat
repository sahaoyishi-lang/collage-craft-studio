@echo off
title CollageCraft Studio
cd /d "%~dp0"
echo ========================================================
echo         Launching CollageCraft Studio...
echo ========================================================
echo Opening in your default web browser...
start http://localhost:8000
echo Server running at http://localhost:8000
echo (Keep this window open while using the app. Close to stop.)
python -m http.server 8000
pause
