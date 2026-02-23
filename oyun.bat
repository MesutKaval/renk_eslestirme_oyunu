@echo off
start /B node "%~dp0server.js"
timeout /t 1 /nobreak >nul
start http://localhost:3000
