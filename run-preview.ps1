$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot
$env:ASPNETCORE_ENVIRONMENT = "Development"
$env:PreviewFramework = "true"
$env:NuGetAudit = "false"
$env:DOTNET_WATCH_SUPPRESS_LAUNCH_BROWSER = "1"
dotnet watch --non-interactive run -- --urls http://0.0.0.0:5082 --Logging:LogLevel:Default=Warning --Logging:LogLevel:Microsoft.AspNetCore.DataProtection=None
