# Script to fix UTF-8 encoding issues
Write-Host "Fixing encoding for all source files..." -ForegroundColor Green

# Get all source files
$files = Get-ChildItem -Path "src" -Recurse -Include *.ts,*.tsx,*.css,*.json -File

foreach ($file in $files) {
    Write-Host "Processing: $($file.FullName)" -ForegroundColor Yellow
    
    # Read content as raw bytes
    $content = Get-Content $file.FullName -Raw
    
    # Write back with UTF-8 without BOM
    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
}

Write-Host "Done! All files have been converted to UTF-8 without BOM." -ForegroundColor Green
