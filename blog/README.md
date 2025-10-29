# 博客文章文件夹

这个文件夹用于存放所有博客文章的 Markdown 文件。

## 📁 文件结构

```
blog/
├── articles/           # 文章 Markdown 文件
│   ├── 1-welcome-web-dev.md
│   ├── 2-dark-mode-guide.md
│   ├── 3-design-principles.md
│   └── ...
└── README.md          # 本文件
```

## ✍️ 写作指南

### 文件命名规范

使用以下格式命名文章文件：
```
{id}-{slug}.md
```

示例：
- `1-welcome-web-dev.md`
- `2-dark-mode-guide.md`
- `3-design-principles.md`

### Markdown 格式

文章应包含以下部分：

```markdown
# 文章标题

## 引言
简短介绍...

## 主要内容
详细内容...

## 总结
总结要点...
```

### 支持的 Markdown 语法

- **标题**: `#` 到 `######`
- **粗体**: `**文本**`
- **斜体**: `*文本*`
- **代码**: `` `代码` ``
- **代码块**: 
  ````markdown
  ```javascript
  代码内容
  ```
  ````
- **引用**: `> 引用文本`
- **列表**: `- 项目` 或 `1. 项目`
- **链接**: `[文本](url)`
- **图片**: `![描述](url)`

### 代码高亮

支持的语言：
- JavaScript
- Python
- HTML
- CSS
- Java
- C++
- 等等...

### 示例文章

查看 `articles/` 文件夹中的示例文章了解更多。

## 📝 添加新文章

1. 在 `articles/` 文件夹中创建新的 `.md` 文件
2. 编写文章内容
3. 在 `js/blog.js` 中添加文章元数据：

```javascript
{
    id: 7,
    title: '你的文章标题',
    excerpt: '文章摘要...',
    content: '7-your-article.md',
    category: 'programming',
    tags: ['标签1', '标签2'],
    date: '2025-10-29',
    readTime: '5 min read',
    thumbnail: '💻',
    author: 'Moyun-Duan'
}
```

## 🎨 文章分类

- **programming** - 编程相关
- **design** - 设计相关
- **tutorial** - 教程
- **thoughts** - 个人思考

## 🚀 预览文章

在浏览器中打开 `blog.html` 查看文章列表。

## 📚 更多资源

- [Markdown 指南](https://www.markdownguide.org/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)

---

**Happy Writing! ✍️**
