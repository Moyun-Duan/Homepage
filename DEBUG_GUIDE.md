# 🔧 博客加载问题调试指南

## 当前问题症状

文章详情页显示 "Article not found"，无法加载文章内容。

## 🔍 诊断步骤

### 1. 确认本地服务器正在运行

**检查**：在终端中应该看到：
```
Serving HTTP on :: port 8000 (http://[::]:8000/) ...
```

**如果没有运行**：
```powershell
python -m http.server 8000
```

### 2. 打开测试页面

访问：**http://localhost:8000/test-blog.html**

这个测试页面会检查：
- ✅ articles.json 是否可访问
- ✅ JSON 数据是否正确解析
- ✅ BlogSystem 是否初始化
- ✅ Markdown 文件是否可访问

### 3. 检查博客列表页

访问：**http://localhost:8000/blog.html**

**应该看到**：
- ✅ 6 篇文章的卡片
- ✅ 搜索框
- ✅ 分类筛选按钮

**如果看不到文章**：
- 按 F12 打开浏览器控制台
- 查看 Console 标签中的错误信息
- 查看 Network 标签，检查 `articles.json` 是否成功加载（应该显示状态 200）

### 4. 测试文章详情页

**方法 1：从列表页点击**
1. 访问 http://localhost:8000/blog.html
2. 点击任意一篇文章
3. 应该跳转到 `article.html?id=1` 并显示文章内容

**方法 2：直接访问**
```
http://localhost:8000/article.html?id=1
http://localhost:8000/article.html?id=2
http://localhost:8000/article.html?id=3
```

### 5. 查看浏览器控制台日志

按 **F12** → **Console** 标签，应该看到：

**正常情况**：
```
✅ Loaded 6 articles
📝 Blog system initialized!
🔍 Loading article with ID: 1
📦 BlogSystem available: true
✅ BlogSystem ready: true
📚 Available articles: 6
📄 Found article: {id: 1, title: "Getting Started with Web Development", ...}
✅ Loaded article: Getting Started with Web Development
```

**异常情况**：
```
❌ Error loading articles: Failed to fetch
❌ Article not found for ID: 1
```

## 🐛 常见问题排查

### 问题 1：articles.json 404 错误

**症状**：
```
GET http://localhost:8000/blog/articles.json 404 (Not Found)
```

**原因**：文件路径不正确

**解决**：
```powershell
# 检查文件是否存在
dir blog\articles.json

# 应该看到文件，如果没有：
type blog\articles.json  # 查看内容
```

### 问题 2：Markdown 文件 404 错误

**症状**：
```
GET http://localhost:8000/blog/articles/1-welcome-web-dev.md 404
```

**解决**：
```powershell
# 检查 Markdown 文件
dir blog\articles\*.md

# 应该看到 6 个 .md 文件
```

### 问题 3：CORS 错误

**症状**：
```
Access to fetch at 'file://...' has been blocked by CORS policy
```

**原因**：没有使用本地服务器

**解决**：必须使用 `http://localhost:8000`，不能使用 `file://` 协议

### 问题 4：BlogSystem 未初始化

**症状**：
```
BlogSystem available: false
```

**原因**：blog.js 加载失败或有语法错误

**解决**：
1. 检查浏览器控制台是否有 JavaScript 错误
2. 确认 `js/blog.js` 文件存在
3. 清除浏览器缓存（Ctrl + Shift + R）

### 问题 5：文章数据为空

**症状**：
```
BlogSystem available: true
BlogSystem ready: true
Available articles: 0
```

**原因**：articles.json 加载失败或为空

**解决**：
```powershell
# 查看 JSON 内容
type blog\articles.json

# 应该看到文章数据数组
```

## 🔬 手动测试 API

在浏览器控制台中运行以下命令：

### 测试 1：检查 BlogSystem
```javascript
console.log('BlogSystem:', window.blogSystem);
console.log('Is Ready:', window.blogSystem?.isReady);
console.log('Articles:', window.blogSystem?.articles);
```

### 测试 2：获取特定文章
```javascript
const article = window.blogSystem?.getArticleById(1);
console.log('Article 1:', article);
```

### 测试 3：手动加载 JSON
```javascript
fetch('blog/articles.json')
    .then(res => res.json())
    .then(data => console.log('JSON Data:', data))
    .catch(err => console.error('Error:', err));
```

### 测试 4：手动加载 Markdown
```javascript
fetch('blog/articles/1-welcome-web-dev.md')
    .then(res => res.text())
    .then(text => console.log('Markdown:', text.substring(0, 200)))
    .catch(err => console.error('Error:', err));
```

## 📋 完整检查清单

使用此清单逐项检查：

- [ ] 本地服务器正在运行（python -m http.server 8000）
- [ ] 使用 http://localhost:8000（不是 file://）
- [ ] blog/articles.json 文件存在
- [ ] blog/articles/ 目录包含 6 个 .md 文件
- [ ] 浏览器控制台没有 JavaScript 错误
- [ ] Network 标签显示 articles.json 加载成功（200）
- [ ] 测试页面 (test-blog.html) 所有测试通过
- [ ] 博客列表页显示 6 篇文章
- [ ] 点击文章能跳转到详情页
- [ ] 详情页显示文章内容（不是 "Article not found"）

## 🚀 快速修复命令

```powershell
# 1. 确保在正确的目录
cd g:\programming\html\homepage

# 2. 检查文件结构
dir blog
dir blog\articles

# 3. 查看文件内容
type blog\articles.json
dir blog\articles\*.md

# 4. 重启服务器
# 按 Ctrl+C 停止当前服务器
python -m http.server 8000

# 5. 清除浏览器缓存
# 在浏览器中按 Ctrl + Shift + R
```

## 💡 如果所有测试都通过，但文章详情页仍然不显示

1. **检查 URL 参数**
   - URL 应该是：`http://localhost:8000/article.html?id=1`
   - 不是：`http://localhost:8000/article.html`（没有 ?id=1）

2. **检查文章 ID**
   - 有效的 ID：1, 2, 3, 4, 5, 6
   - 无效的 ID：0, 7, abc 等

3. **等待时间**
   - 初次加载可能需要 1-2 秒
   - 查看页面顶部是否显示 "Loading Article..."

4. **清除缓存并硬刷新**
   ```
   Ctrl + Shift + R  (Windows/Linux)
   Cmd + Shift + R   (Mac)
   ```

## 📞 获取帮助

如果问题仍未解决：

1. **收集以下信息**：
   - 浏览器控制台的完整错误信息（截图）
   - Network 标签的请求列表（截图）
   - test-blog.html 的测试结果（截图）

2. **检查以下文件**：
   - `blog/articles.json` 的前 10 行
   - `js/blog.js` 是否有语法错误
   - `js/article.js` 是否有语法错误

3. **提供系统信息**：
   - 浏览器版本
   - Python 版本
   - 操作系统

---

**记住**：开发 Web 应用时，**必须使用本地服务器**，不能直接双击 HTML 文件！
