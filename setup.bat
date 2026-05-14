@echo off
echo ========================================
echo   EduAI Platform - Quick Setup
echo ========================================
echo.

REM Check if .env.local exists
if exist .env.local (
    echo [OK] .env.local already exists
) else (
    echo [INFO] Creating .env.local from template...
    copy .env.example .env.local
    echo [DONE] .env.local created
    echo.
    echo IMPORTANT: Edit .env.local and add your Firebase and OpenAI credentials
    echo.
)

echo.
echo ========================================
echo   Next Steps:
echo ========================================
echo.
echo 1. Edit .env.local with your API keys
echo 2. Run: npm run dev
echo 3. Open: http://localhost:3000
echo.
echo For detailed setup instructions, see QUICK_START.md
echo.
pause
