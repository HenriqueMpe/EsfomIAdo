# Script to fix all encoding issues and remove accents
Write-Host "Fixing all encoding issues..." -ForegroundColor Green

$files = Get-ChildItem -Path "src" -Recurse -Include *.ts,*.tsx,*.css -File

# Map of replacements
$replacements = @{
    'á' = 'a'
    'â' = 'a'
    'ã' = 'a'
    '� ' = 'a'
    'é' = 'e'
    'ê' = 'e'
    'í' = 'i'
    'ó' = 'o'
    '�?' = 'o'
    'õ' = 'o'
    'ú' = 'u'
    'ç' = 'c'
    '�' = 'A'
    '�?' = 'E'
    '�"' = 'O'
    '�?' = 'A'
    '�?¡' = 'a'
    '�?¢' = 'a'
    '�?£' = 'a'
    '�?©' = 'e'
    '�?ª' = 'e'
    '�?­' = 'i'
    '�?³' = 'o'
    '�?�?' = 'o'
    '�?µ' = 'o'
    '�?º' = 'u'
    '�?§' = 'c'
    '⤢' = '-'
    'çã' = 'ca'
    'çõ' = 'co'
    'históricos' = 'historicos'
    'análise' = 'analise'
    'instantânea' = 'instantanea'
    'Restrições' = 'Restricoes'
    'Manutenção' = 'Manutencao'
    '� ' = 'a'
    'á' = 'a'
    'â' = 'a'
    'ã' = 'a'
    'é' = 'e'
    'ê' = 'e'
    'í' = 'i'
    'ó' = 'o'
    '�?' = 'o'
    'õ' = 'o'
    'ú' = 'u'
    'ç' = 'c'
}

foreach ($file in $files) {
    Write-Host "Processing: $($file.FullName)" -ForegroundColor Yellow
    
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Apply all replacements
    foreach ($key in $replacements.Keys) {
        $content = $content -replace [regex]::Escape($key), $replacements[$key]
    }
    
    # Write back with UTF-8 without BOM
    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
}

Write-Host "Done! All encoding issues fixed." -ForegroundColor Green
