# 个人主页自定义指南

## 📋 内容自定义说明

这份指南帮助你快速找到并修改个人主页中的自定义内容区域。

---

## 🎨 1. 个人头像

### 位置
`images/profile.jpg`

### 操作
将你的个人照片命名为 `profile.jpg`，放入 `images` 文件夹即可。

**建议尺寸：** 400x400 像素，正方形图片效果最佳。

如果没有图片，页面会自动显示一个紫色渐变的占位符图标 👤。

---

## 👤 2. About Me - 技能标签

### 位置
`index.html` 第 48-54 行

```html
<div class="skills-placeholder">
    <!-- 自定义内容：在这里添加你的技能标签 -->
    <span class="skill-tag">Python</span>
    <span class="skill-tag">Web Development</span>
    <span class="skill-tag">Machine Learning</span>
    <!-- 添加更多技能: <span class="skill-tag">Your Skill</span> -->
</div>
```

### 操作
复制 `<span class="skill-tag">Your Skill</span>` 并修改文字即可添加新技能。

**示例：**
```html
<span class="skill-tag">JavaScript</span>
<span class="skill-tag">React</span>
<span class="skill-tag">Node.js</span>
```

---

## 🎯 3. About Me - 专注领域

### 位置
`index.html` 第 59-65 行

```html
<ul class="interests-list">
    <!-- 自定义内容：在这里添加你的专注领域 -->
    <li>📊 Data Science & Analysis</li>
    <li>🤖 Artificial Intelligence</li>
    <li>🎨 UI/UX Design</li>
    <!-- 添加更多: <li>📌 Your Interest Area</li> -->
</ul>
```

### 操作
复制 `<li>📌 Your Interest Area</li>` 并修改文字和表情符号。

**示例：**
```html
<li>🎮 Game Development</li>
<li>📱 Mobile App Design</li>
<li>☁️ Cloud Computing</li>
```

---

## ⏱️ 4. My Journey - 时间线

### 位置
`index.html` 第 85-115 行

### 操作
每个时间线节点的模板如下：

```html
<div class="timeline-item">
    <div class="timeline-date">YYYY.MM</div>
    <div class="timeline-content">
        <h4>🎯 Your Milestone Title</h4>
        <p>Description of what you achieved or learned.</p>
    </div>
</div>
```

### 添加新节点步骤
1. 找到最后一个 `timeline-placeholder` 之前的位置
2. 复制上面的模板
3. 修改以下内容：
   - `YYYY.MM`：时间（例如：2025.06）
   - `🎯 Your Milestone Title`：里程碑标题（可以换表情符号）
   - `Description...`：详细描述

**示例：**
```html
<div class="timeline-item">
    <div class="timeline-date">2025.06</div>
    <div class="timeline-content">
        <h4>🏆 First Project Completed</h4>
        <p>Successfully launched my first web application with over 100 users!</p>
    </div>
</div>
```

---

## 💼 5. My Projects - 项目展示

### 位置
`index.html` 第 136-160 行

### 操作
每个项目卡片的模板如下：

```html
<div class="project-card">
    <div class="project-icon">🎨</div>
    <h3>Your Project Name</h3>
    <p class="project-description">
        Brief description of your project (1-2 sentences).
    </p>
    <div class="project-tech">
        <span class="tech-tag">Tech1</span>
        <span class="tech-tag">Tech2</span>
        <span class="tech-tag">Tech3</span>
    </div>
    <a href="https://github.com/Moyun-Duan/your-repo" target="_blank" class="project-link">View Project →</a>
</div>
```

### 添加新项目步骤
1. 找到 `project-placeholder` 之前的位置
2. 复制上面的模板
3. 修改以下内容：
   - `🎨`：项目图标（表情符号）
   - `Your Project Name`：项目名称
   - `Brief description...`：项目简介
   - `Tech1`, `Tech2`：使用的技术栈
   - `https://github.com/...`：项目链接

**示例：**
```html
<div class="project-card">
    <div class="project-icon">🤖</div>
    <h3>AI Chatbot</h3>
    <p class="project-description">
        An intelligent chatbot powered by GPT-4 API for customer service automation.
    </p>
    <div class="project-tech">
        <span class="tech-tag">Python</span>
        <span class="tech-tag">OpenAI API</span>
        <span class="tech-tag">Flask</span>
    </div>
    <a href="https://github.com/Moyun-Duan/ai-chatbot" target="_blank" class="project-link">View Project →</a>
</div>
```

---

## 🔗 6. 社交媒体链接

### 位置
`index.html` 第 30-38 行

```html
<div class="social-links">
    <a href="https://github.com/Moyun-Duan" target="_blank" title="GitHub" class="social-icon">
        <span>🐙 GitHub</span>
    </a>
    <a href="mailto:duanmoyun0521@gmail.com" title="Email" class="social-icon">
        <span>📧 Email</span>
    </a>
    <!-- 预留其他社交媒体链接 -->
    <!-- <a href="#" target="_blank" title="LinkedIn" class="social-icon"><span>💼 LinkedIn</span></a> -->
    <!-- <a href="#" target="_blank" title="Twitter" class="social-icon"><span>🐦 Twitter</span></a> -->
</div>
```

### 操作
取消注释并修改链接即可添加新的社交媒体。

**示例：**
```html
<a href="https://linkedin.com/in/yourprofile" target="_blank" title="LinkedIn" class="social-icon">
    <span>💼 LinkedIn</span>
</a>
<a href="https://twitter.com/yourhandle" target="_blank" title="Twitter" class="social-icon">
    <span>🐦 Twitter</span>
</a>
```

---

## 📞 7. 联系方式

### 位置
`index.html` 第 176-190 行

你已经填写了 Email、Phone/WeChat、QQ 信息，如需修改直接编辑对应的 `<p>` 标签内容即可。

---

## 🎨 常用表情符号参考

- **技术类：** 💻 🖥️ ⚙️ 🔧 🛠️ 📱 🌐 ☁️ 🔐 🤖
- **学习类：** 📚 📖 ✏️ 🎓 🧠 💡 🔍 📊 📈 📉
- **成就类：** 🏆 🎯 ⭐ 🌟 ✨ 🎉 🎊 🚀 💪 🔥
- **项目类：** 🎨 🎮 🎵 🎬 📷 🏠 🛒 💬 📧 🔔
- **社交类：** 🐙 📧 💼 🐦 📱 💬 🌍 🔗 👥 🤝

---

## ⚡ 快速修改清单

每次更新个人主页时，按照以下顺序检查：

- [ ] 更新个人头像（`images/profile.jpg`）
- [ ] 添加/修改技能标签（Skills）
- [ ] 添加/修改专注领域（Focus Areas）
- [ ] 添加新的时间线节点（My Journey）
- [ ] 添加新的项目卡片（My Projects）
- [ ] 更新社交媒体链接
- [ ] 检查联系方式是否最新

---

## 💡 提示

1. **备份原文件：** 修改前建议复制一份 `index.html` 作为备份
2. **测试修改：** 在浏览器中打开查看效果
3. **保持一致性：** 使用相似的表情符号和语言风格
4. **移动端适配：** 所有样式已自动适配移动设备，无需额外配置

---

## 🆘 需要帮助？

如果遇到问题，可以：
1. 查看浏览器控制台的错误信息（F12）
2. 对比原模板和修改后的代码
3. 联系网页开发者获取支持

**祝你的个人主页越来越精彩！** 🎉
