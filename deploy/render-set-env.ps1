<#
PowerShell helper to set Render service environment variables.
Usage:
  1. Install Render CLI: https://render.com/docs/render-cli
  2. Run `render login` and follow interactive auth.
  3. Run `render services list` to get your SERVICE_ID(s).
  4. Edit the variables below or pass them via script parameters.
  5. Run this script from the repo root: `.
ender-set-env.ps1`

IMPORTANT: Do not commit secrets to git. This script is a convenience template.
#>

param(
    [string]$BackendServiceId = "<BACKEND_SERVICE_ID>",
    [string]$MongoUri = "mongodb+srv://<user>:<pass>@cluster0.mongodb.net/srida?retryWrites=true&w=majority",
    [string]$JwtSecret = "a_very_long_random_secret_here",
    [string]$FrontendServiceId = "<FRONTEND_SERVICE_ID>",
    [string]$FrontendUrl = "https://your-frontend.onrender.com"
)

function Set-Env {
    param($serviceId, $key, $value)
    if ($serviceId -eq "<BACKEND_SERVICE_ID>" -or $serviceId -eq "<FRONTEND_SERVICE_ID>") {
        Write-Host "ERROR: Replace placeholder service IDs before running the script." -ForegroundColor Red
        return
    }

    Write-Host "Setting $key on service $serviceId"
    render services env set $serviceId $key "$value"
}

# Ensure render CLI is available
if (-not (Get-Command render -ErrorAction SilentlyContinue)) {
    Write-Host "Render CLI not found. Install it first: https://render.com/docs/render-cli" -ForegroundColor Yellow
    exit 1
}

# Set backend env vars
if ($BackendServiceId) {
    Set-Env -serviceId $BackendServiceId -key "MONGO_URI" -value $MongoUri
    Set-Env -serviceId $BackendServiceId -key "JWT_SECRET" -value $JwtSecret
    # Optional: FRONTEND_URL so backend can construct full URLs
    Set-Env -serviceId $BackendServiceId -key "FRONTEND_URL" -value $FrontendUrl
}

# Example: set a FRONTEND-specific env if needed
if ($FrontendServiceId -and $FrontendServiceId -ne "<FRONTEND_SERVICE_ID>") {
    Set-Env -serviceId $FrontendServiceId -key "NODE_ENV" -value "production"
}

Write-Host "Done. Check Render dashboard or run 'render services env list <SERVICE_ID>' to verify." -ForegroundColor Green
