# 博客加载问题排查指南

## ❌ 问题现象

博客页面点进去加载不出内容，文章列表为空。

## 🔍 原因分析

### 主要原因：**没有使用本地服务器**

当你直接双击打开 HTML 文件时，浏览器使用 `file://` 协议：
```
file:///G:/programming/html/homepage/blog.html
```

在 `file://` 协议下，**浏览器禁止 JavaScript 的 `fetch()` 请求**（出于安全考虑），导致：
- ❌ 无法加载 `blog/articles.json`
- ❌ 无法加载 Markdown 文件
- ❌ 文章列表显示为空

### 解决方法：**必须使用本地服务器**

使用 `http://` 协议：
```
http://localhost:8000/blog.html
```

## ✅ 解决方案

### 方法 1：使用 Python 服务器（推荐）⭐

**步骤：**

1. **打开 PowerShell**（在项目文件夹中右键 → "在终端中打开"）

2. **启动服务器**：
   ```powershell
   python -m http.server 8000
   ```
   
   或使用快捷脚本：
   ```powershell
   .\start-server.ps1
   ```

3. **打开浏览器访问**：
   ```
   http://localhost:8000/blog.html
   ```

4. **停止服务器**：按 `Ctrl + C`

---

### 方法 2：使用 Node.js 服务器

**前提**：已安装 Node.js

```bash
# 安装 serve（只需一次）
npm install -g serve

# 启动服务器
serve -p 8000
```

---

### 方法 3：使用 VS Code 插件

**推荐插件**：Live Server

1. 在 VS Code 中安装 "Live Server" 插件
2. 右键 HTML 文件 → "Open with Live Server"
3. 自动打开浏览器并启用热重载

---

## 🧪 验证是否成功

打开浏览器控制台（F12），查看：

### ✅ 成功的情况：
```
✅ Loaded 6 articles
📝 Blog system initialized!
```

### ❌ 失败的情况：
```
❌ Error loading articles: TypeError: Failed to fetch
CORS policy blocked...
```

---

## 🔧 常见错误处理

### 错误 1：端口被占用

**现象**：
```
OSError: [Errno 48] Address already in use
```

**解决**：换个端口
```bash
python -m http.server 8080  # 使用 8080 端口
```

---

### 错误 2：Python 未安装

**现象**：
```
'python' 不是内部或外部命令
```

**解决**：

1. **安装 Python**：
   - 访问 https://www.python.org/downloads/
   - 下载并安装（记得勾选 "Add to PATH"）

2. **或者使用 Node.js**：
   ```bash
   npx http-server -p 8000
   ```

---

### 错误 3：文章仍然不显示

**检查清单**：

1. ✅ 确认使用了 `http://localhost:8000`（不是 `file://`）
2. ✅ 检查 `blog/articles.json` 文件是否存在
3. ✅ 检查 Markdown 文件是否在 `blog/articles/` 目录
4. ✅ 打开浏览器控制台（F12）查看错误信息
5. ✅ 清除浏览器缓存（Ctrl + Shift + R 强制刷新）

---

## 📋 快速检查命令

```powershell
# 检查文件是否存在
dir blog\articles.json
dir blog\articles\*.md

# 查看 JSON 文件内容
type blog\articles.json

# 检查 Python 是否安装
python --version

# 检查端口是否被占用
netstat -ano | findstr :8000
```

---

## 💡 开发流程建议

### 正确的工作流程：

1. **启动服务器**：
   ```powershell
   .\start-server.ps1
   ```

2. **在浏览器中打开**：
   ```
   http://localhost:8000/blog.html
   ```

3. **修改代码**：
   - 编辑 HTML/CSS/JS 文件
   - 保存后刷新浏览器（F5）

4. **停止服务器**：
   - 按 `Ctrl + C`

### ❌ 错误的流程：

- ❌ 直接双击 HTML 文件
- ❌ 从文件管理器拖到浏览器
- ❌ 使用 `file://` 协议

---

## 🎯 总结

| 操作方式 | 协议 | Fetch 是否工作 | 结果 |
|---------|------|---------------|------|
| 双击 HTML | `file://` | ❌ 不工作 | 文章列表为空 |
| 本地服务器 | `http://` | ✅ 正常 | 文章正常显示 |

**记住**：开发现代 Web 应用时，**必须使用本地服务器**！

---

## 📞 仍然无法解决？

1. **检查浏览器控制台**（F12 → Console 标签）
2. **查看网络请求**（F12 → Network 标签）
3. **确认文件路径**是否正确
4. **联系开发者**并提供控制台错误信息

---

**最后提醒**：每次开发前，先运行 `.\start-server.ps1`！🚀
