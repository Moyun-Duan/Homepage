# 🚀 快速启动指南

## ⚠️ 重要提醒

**不要直接双击 HTML 文件！** 博客功能需要本地服务器才能正常工作。

## ✅ 正确的启动方式

### 方法 1：使用启动脚本（最简单）

1. 双击运行 `start-server.ps1`
2. 或在 PowerShell 中运行：
   ```powershell
   .\start-server.ps1
   ```
3. 打开浏览器访问：**http://localhost:8000/blog.html**

### 方法 2：手动启动

```powershell
python -m http.server 8000
```

然后访问：**http://localhost:8000/blog.html**

## 🎯 访问地址

启动服务器后，在浏览器中打开：

- **首页**：http://localhost:8000/index.html
- **博客**：http://localhost:8000/blog.html
- **项目**：http://localhost:8000/project.html
- **个人**：http://localhost:8000/person.html

## ❓ 为什么需要本地服务器？

因为博客系统使用了：
- ✅ 动态加载 JSON 数据
- ✅ 读取 Markdown 文件
- ✅ AJAX/Fetch 请求

这些功能在 `file://` 协议下**不能工作**，必须使用 `http://` 协议。

## 🔧 停止服务器

在终端中按 `Ctrl + C`

---

**遇到问题？** 查看 [TROUBLESHOOTING.md](TROUBLESHOOTING.md) 故障排查指南。
