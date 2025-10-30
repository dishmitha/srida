<#
Automated helper to set environment variables on Render and trigger deploys.
Run this locally after installing Render CLI and logging in (render login).

Usage:
  1. Install Render CLI: https://render.com/docs/render-cli
  2. Login: render login
  3. Run this script from the repo root: .\deploy\deploy_to_render.ps1

This script will:
  - Ask for backend/frontend service IDs
  - Prompt for MONGO_URI and JWT_SECRET
  - Set env vars using render CLI
  - Trigger deploys for the services
  - Optionally run the included verify script to check health endpoints

Security: You run this locally; do not paste secrets into public chat.
#>

function Ensure-RenderCLI {
    if (-not (Get-Command render -ErrorAction SilentlyContinue)) {
        Write-Host "Render CLI not found. Install it first: https://render.com/docs/render-cli" -ForegroundColor Yellow
        exit 1
    }
}

function Prompt-Input {
    param($prompt, $asSecure = $false)
    if ($asSecure) {
        $sec = Read-Host -AsSecureString $prompt
        return [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec))
    }
    return Read-Host $prompt
}

Ensure-RenderCLI

Write-Host "This script will set env vars and trigger deploys on Render. You must be logged into Render CLI (run 'render login')." -ForegroundColor Cyan

$backendId = Prompt-Input "Enter the Backend Service ID (from 'render services list')"
$frontendId = Prompt-Input "Enter the Frontend Service ID (optional, press Enter to skip)"

if (-not $backendId) {
    Write-Host "Backend Service ID is required. Run 'render services list' to find it." -ForegroundColor Red
    exit 1
}

$mongoUri = Prompt-Input "Enter MONGO_URI (MongoDB connection string)"
$jwt = Prompt-Input "Enter JWT_SECRET (a long random string)" -asSecure

Write-Host "Setting environment variables on Render..." -ForegroundColor Cyan

render services env set $backendId MONGO_URI "$mongoUri"
render services env set $backendId JWT_SECRET "$jwt"

if ($frontendId) {
    # Optional: set FRONTEND_URL on backend to the frontend domain
    $frontendUrl = Prompt-Input "Enter the frontend public URL (e.g., https://srida-frontend.onrender.com)"
    if ($frontendUrl) {
        render services env set $backendId FRONTEND_URL "$frontendUrl"
    }
}

Write-Host "Triggering deploys..." -ForegroundColor Cyan
render services deploy $backendId
if ($frontendId) { render services deploy $frontendId }

Write-Host "Deploys triggered. Wait for Render to finish building (check dashboard or 'render services list')." -ForegroundColor Green

$runVerify = Read-Host "Run local verification script now? (y/N)"
if ($runVerify -match '^(y|Y)') {
    $burl = Prompt-Input "Enter backend public URL (e.g., https://srida-backend.onrender.com)"
    $furl = Prompt-Input "Enter frontend public URL (optional)"
    if ($burl) {
        & .\deploy\verify_render.ps1 -BackendUrl $burl -FrontendUrl $furl
    } else {
        Write-Host "No backend URL provided. Skipping verification." -ForegroundColor Yellow
    }
}

Write-Host "All done. Check Render dashboard logs for build output and status." -ForegroundColor Cyan
