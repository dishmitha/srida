param(
    [string]$BackendUrl = "https://<backend-service>.onrender.com",
    [string]$FrontendUrl = "https://<frontend-service>.onrender.com"
)

function Check-Url {
    param($url)
    try {
        Write-Host "Checking $url/api/health ..." -ForegroundColor Cyan
        $resp = Invoke-RestMethod -Uri "$url/api/health" -UseBasicParsing -TimeoutSec 15
        Write-Host "OK:" ($resp | ConvertTo-Json -Depth 3) -ForegroundColor Green
    } catch {
        Write-Host "ERROR contacting $url/api/health: $_" -ForegroundColor Red
    }
}

if ($BackendUrl -like "https://<*>") {
    Write-Host "Replace placeholder URLs in the script parameters before running." -ForegroundColor Yellow
    exit 1
}

Check-Url -url $BackendUrl

try {
    Write-Host "Checking frontend at $FrontendUrl ..." -ForegroundColor Cyan
    $html = Invoke-RestMethod -Uri $FrontendUrl -UseBasicParsing -TimeoutSec 15
    if ($html) { Write-Host "Frontend responded (HTML length: $($html.Length))" -ForegroundColor Green }
} catch {
    Write-Host "ERROR contacting frontend $FrontendUrl: $_" -ForegroundColor Red
}

Write-Host "Done." -ForegroundColor Cyan
