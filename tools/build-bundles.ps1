$ErrorActionPreference = 'Stop'
$projectRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$manifest = Get-Content -LiteralPath (Join-Path $projectRoot 'bundle.sources.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$utf8 = New-Object System.Text.UTF8Encoding($false)
function Resolve-ProjectPath([string]$relativePath) {
    $resolved = [System.IO.Path]::GetFullPath((Join-Path $projectRoot $relativePath))
    if (-not $resolved.StartsWith($projectRoot + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Path outside project: $relativePath"
    }
    return $resolved
}
foreach ($kind in @('css', 'js')) {
    $bundle = $manifest.$kind
    $parts = New-Object System.Collections.Generic.List[string]
    $parts.Add("/* Generated from bundle.sources.json. Edit source files or manifest, not this bundle. */`n")
    foreach ($source in $bundle.sources) {
        $content = [System.IO.File]::ReadAllText((Resolve-ProjectPath $source), $utf8)
        $content = [regex]::Replace($content, '(?m)^\s*//# sourceMappingURL=.*$', '')
        $content = [regex]::Replace($content, '/\*# sourceMappingURL=.*?\*/', '')
        $parts.Add("/* Source: $source */`n" + $content.Trim())
        if ($kind -eq 'js') { $parts.Add(';') }
    }
    $destination = Resolve-ProjectPath $bundle.output
    [System.IO.Directory]::CreateDirectory([System.IO.Path]::GetDirectoryName($destination)) | Out-Null
    [System.IO.File]::WriteAllText($destination, ($parts -join "`n") + "`n", $utf8)
    Write-Output $bundle.output
}
