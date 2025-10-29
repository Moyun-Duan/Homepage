# 博客系统使用指南

## 📁 文件结构

```
blog/
├── articles.json          # 文章元数据（标题、摘要、分类等）
└── articles/              # Markdown 文章内容
    ├── 1-welcome-web-dev.md
    ├── 2-dark-mode-guide.md
    ├── 3-design-principles.md
    ├── 4-programming-journey.md
    ├── 5-css-grid-tutorial.md
    └── 6-visual-effects.md
```

## ✨ 新的加载方式

### 自动加载流程

1. **博客列表页** (`blog.html`)
   - `blog.js` 从 `blog/articles.json` 加载文章元数据
   - 自动生成文章卡片
   - 支持搜索、筛选、分页

2. **文章详情页** (`article.html`)
   - `article.js` 从 `blog/articles/{filename}.md` 加载完整内容
   - 使用 Marked.js 渲染 Markdown
   - 使用 Highlight.js 高亮代码

### 优势对比

| 特性 | 旧方式 (硬编码) | 新方式 (自动加载) |
|------|----------------|------------------|
| **维护难度** | 😫 需要修改 JS 代码 | ✅ 只需更新 JSON 和 MD 文件 |
| **内容重复** | ❌ 数据写两遍 | ✅ 单一数据源 |
| **添加文章** | 🔧 修改代码 + 重启 | 📝 创建文件即可 |
| **可扩展性** | ❌ 有限 | ✅ 无限扩展 |
| **错误风险** | ⚠️ 容易语法错误 | ✅ 数据与逻辑分离 |

## 📝 如何添加新文章

### 方法一：手动添加（推荐用于少量文章）

1. **创建 Markdown 文件**
   ```bash
   # 文件命名格式：{id}-{url-slug}.md
   blog/articles/7-my-new-article.md
   ```

2. **编写文章内容**
   ```markdown
   # 文章标题
   
   ![封面图片](https://example.com/image.jpg)
   
   文章正文...
   
   ## 小标题
   
   内容...
   ```

3. **更新 articles.json**
   ```json
   {
       "id": 7,
       "title": "My New Article",
       "excerpt": "文章摘要，显示在列表页",
       "file": "7-my-new-article.md",
       "category": "tutorial",
       "tags": ["Tag1", "Tag2"],
       "date": "2025-10-30",
       "readTime": "5 min read",
       "thumbnail": "🎉",
       "author": "Moyun-Duan"
   }
   ```

4. **刷新页面** - 文章自动出现！

### 方法二：批量添加

如果有多篇文章，可以使用脚本自动生成 JSON 条目（未来可以创建辅助工具）。

## 🎯 字段说明

### articles.json 字段详解

| 字段 | 类型 | 必填 | 说明 | 示例 |
|------|------|------|------|------|
| `id` | Number | ✅ | 唯一标识符 | `1` |
| `title` | String | ✅ | 文章标题 | `"Getting Started"` |
| `excerpt` | String | ✅ | 摘要（150-200字符） | `"Learn web dev..."` |
| `file` | String | ✅ | Markdown 文件名 | `"1-article.md"` |
| `category` | String | ✅ | 分类 | `"tutorial"` / `"design"` / `"programming"` / `"thoughts"` |
| `tags` | Array | ✅ | 标签数组 | `["HTML", "CSS"]` |
| `date` | String | ✅ | 发布日期 (YYYY-MM-DD) | `"2025-10-29"` |
| `readTime` | String | ✅ | 预计阅读时间 | `"5 min read"` |
| `thumbnail` | String | ✅ | 缩略图 (Emoji 或图片 URL) | `"💻"` |
| `author` | String | ✅ | 作者名 | `"Moyun-Duan"` |

### 分类颜色映射

```javascript
programming: #3b82f6  // 蓝色
design:      #ec4899  // 粉色
tutorial:    #10b981  // 绿色
thoughts:    #f59e0b  // 橙色
```

## 🚀 测试步骤

1. **本地测试**
   ```bash
   # 使用本地服务器（文件协议不支持 fetch）
   python -m http.server 8000
   # 或
   npx serve
   ```

2. **访问博客**
   ```
   http://localhost:8000/blog.html
   ```

3. **验证功能**
   - ✅ 文章列表正确显示
   - ✅ 搜索功能工作
   - ✅ 分类筛选工作
   - ✅ 点击文章跳转到详情页
   - ✅ 详情页正确加载 Markdown 内容
   - ✅ 代码高亮显示

## ⚠️ 常见问题

### 1. 文章列表为空

**原因**：`articles.json` 加载失败

**解决方法**：
- 检查 JSON 文件路径是否正确
- 确保使用本地服务器（不能用 `file://` 协议）
- 打开浏览器控制台查看错误信息

### 2. 文章内容不显示

**原因**：Markdown 文件加载失败

**解决方法**：
- 检查 `articles.json` 中的 `file` 字段是否正确
- 确认 Markdown 文件存在于 `blog/articles/` 目录
- 检查文件名大小写是否匹配

### 3. 代码没有高亮

**原因**：Highlight.js 未加载

**解决方法**：
- 确保 `article.html` 中引入了 Highlight.js
  ```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  ```

### 4. 图片无法显示

**原因**：Markdown 中使用了相对路径

**解决方法**：
- 使用绝对 URL（推荐）：`![Image](https://example.com/image.jpg)`
- 或使用项目内相对路径：`![Image](../images/photo.jpg)`

## 💡 最佳实践

### 文章命名规范

```
{id}-{url-friendly-title}.md

示例：
1-getting-started-web-dev.md
2-css-grid-tutorial.md
3-design-principles.md
```

### Markdown 写作技巧

1. **使用标题层级**
   ```markdown
   # H1 - 文章主标题（只用一次）
   ## H2 - 主要章节
   ### H3 - 子章节
   ```

2. **添加代码块**
   ````markdown
   ```javascript
   const greeting = 'Hello, World!';
   console.log(greeting);
   ```
   ````

3. **使用 Emoji 增强可读性**
   ```markdown
   ## 为什么重要？ 🎯
   - ✅ 优点一
   - ⚠️ 注意事项
   - 📚 扩展阅读
   ```

4. **插入图片**
   ```markdown
   ![描述文字](https://images.unsplash.com/photo-xxx?w=800)
   ```

### 阅读时间计算

粗略估算公式：
```
阅读时间（分钟） = 字数 / 200（中文）或 字数 / 250（英文）
```

## 🔧 未来优化方向

1. **自动生成工具**
   - 创建脚本自动扫描 Markdown 文件
   - 自动提取标题、摘要、标签
   - 自动生成 `articles.json`

2. **内容管理界面**
   - 可视化编辑器
   - 实时预览
   - 一键发布

3. **缓存优化**
   - localStorage 缓存文章列表
   - Service Worker 离线访问
   - 图片懒加载

4. **SEO 增强**
   - 自动生成 sitemap
   - 结构化数据
   - Open Graph 标签

## 📚 相关文档

- [Markdown 语法参考](https://www.markdownguide.org/)
- [Marked.js 文档](https://marked.js.org/)
- [Highlight.js 文档](https://highlightjs.org/)

---

**需要帮助？** 查看控制台错误信息或联系开发者。
