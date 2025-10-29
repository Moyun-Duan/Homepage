# 启动本地服务器
# 使用方法：在 PowerShell 中运行 .\start-server.ps1

Write-Host "🚀 启动本地开发服务器..." -ForegroundColor Green
Write-Host ""
Write-Host "📁 当前目录: $PWD" -ForegroundColor Cyan
Write-Host "🌐 服务器地址: http://localhost:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 提示:" -ForegroundColor Yellow
Write-Host "   - 博客页面: http://localhost:8000/blog.html" -ForegroundColor Gray
Write-Host "   - 首页: http://localhost:8000/index.html" -ForegroundColor Gray
Write-Host ""
Write-Host "⚠️  按 Ctrl+C 停止服务器" -ForegroundColor Yellow
Write-Host ""

# 启动 Python HTTP 服务器
python -m http.server 8000
