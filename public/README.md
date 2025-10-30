<div align="center">

# 🌟 Personal Homepage

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success?logo=github)](https://moyun-duan.github.io/Homepage/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**Personal homepage for Moyun-Duan (清风)**

[🌐 Live Demo](https://moyun-duan.github.io/Homepage/) | [📖 Documentation](#-documentation) | [🎨 Customization Guide](CUSTOMIZATION_GUIDE.md)

</div>

---

## 📸 Screenshots

> � Add your screenshots here! See [images/README.md](images/README.md) for guidelines.

```
Coming soon...
```

---

## ✨ Features

### 📄 Pages
- **🏠 Home** - Welcome page with personal introduction
- **👤 Person** - Personal information and bio
- **📚 Book** - Book collection showcase
- **💼 Project** - Project portfolio
- **💬 Forum** - Interactive message board with nickname and localStorage support
- **🔬 SQTP** - Detailed project page with sidebar navigation

### 🎯 Highlights
- ✅ **Modular CSS Architecture** - 7 organized CSS modules for better maintainability
- ✅ **Interactive Forum** - Real-time message board with localStorage persistence
- ✅ **Responsive Design** - Mobile-friendly layout with smooth animations
- ✅ **Dynamic Content Loading** - AJAX-based content switching for SQTP sections
- ✅ **Customizable** - Easy-to-modify content sections with detailed guides

---

## 🚀 Quick Start

### View Online
Visit the live website: **https://moyun-duan.github.io/Homepage/**

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Moyun-Duan/Homepage.git
   cd Homepage
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     ```

3. **Visit** `http://localhost:8000`

---

## 📁 Project Structure

```
homepage/
├── 📄 index.html              # Homepage
├── 📄 person.html             # Personal info page
├── 📄 project.html            # Project showcase
├── 📄 forum.html              # Message board
├── 📄 sqtp.html               # SQTP project details
│
├── 📁 css/                    # Modular CSS files
│   ├── global.css             # Global styles & resets
│   ├── layout.css             # Page layouts
│   ├── components.css         # UI components
│   ├── forum.css              # Forum styles
│   ├── project.css            # Project page styles
│   ├── animations.css         # Animation keyframes
│   ├── responsive.css         # Mobile responsive
│   └── README.md              # CSS documentation
│
├── 📁 js/                     # JavaScript modules
│   ├── forum.js               # Forum functionality
│   └── sqtp.js                # SQTP navigation
│
├── 📁 sqtp/                   # SQTP content modules
│   ├── members.html           # Team members
│   ├── settings.html          # Project settings
│   └── results.html           # Research results
│
├── 📁 images/                 # Image assets
│   └── README.md              # Image guidelines
│
├── 📄 README.md               # This file
├── 📄 LICENSE                 # Apache 2.0 License
├── 📄 CHANGELOG.md            # Version history
├── 📄 CUSTOMIZATION_GUIDE.md  # Content customization
└── 📄 CSS_REFACTOR.md         # CSS refactoring notes
```

---

## 🎯 Features (Legacy)

### Pages

- **Home** - 欢迎页面，介绍项目
- **Person** - 个人信息
- **Book** - 书籍收藏
- **Project** - 项目展示列表
- **Forum** - 留言板（支持昵称、留言存储）
- **SQTP** - 项目详情（带侧边导航）

### JavaScript Modules

- **forum.js** - 留言板完整功能
  - 昵称管理
  - 留言发送/显示
  - localStorage 数据持久化

- **sqtp.js** - SQTP 项目页面交互
  - 侧边导航切换
  - 动态内容加载

### SQTP Content Modules

- **members.html** - 团队成员展示
- **settings.html** - 项目设定和时间线
- **results.html** - 研究成果记录

---

## 💾 Data Storage

Forum messages are stored in browser's **localStorage**:

- `forumNickname` - User's chosen nickname
- `forumMessages` - All messages (JSON array)

**Privacy Note**: All data is stored locally in your browser. Clearing browser data will remove all messages.

---

## 🛠️ Technologies

| Technology | Usage |
|------------|-------|
| **HTML5** | Semantic markup and structure |
| **CSS3** | Modular styling with Flexbox/Grid |
| **JavaScript (ES6+)** | Interactive features and DOM manipulation |
| **localStorage API** | Client-side data persistence |
| **Fetch API** | Dynamic content loading |

---

## � Documentation

- **[CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)** - How to customize content (skills, timeline, etc.)
- **[CSS_REFACTOR.md](CSS_REFACTOR.md)** - CSS modularization details
- **[css/README.md](css/README.md)** - CSS module usage guide
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and updates
- **[images/README.md](images/README.md)** - Image asset guidelines

---

## 🎨 Customization

### Quick Content Updates

1. **Personal Info & Skills**
   - See [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) for detailed instructions
   - Update skills, timeline, and interests in `index.html`

2. **Profile Picture**
   - Add `images/profile.jpg` (400x400px recommended)
   - See [images/README.md](images/README.md) for guidelines

3. **Projects**
   - Add new project cards in `project.html`
   - Create detailed pages following `sqtp.html` pattern

4. **Forum Messages**
   - Messages are auto-managed through the UI
   - Stored in browser localStorage

---

## 📝 Development Guide

### Adding New Pages

1. Create new HTML file in root directory
2. Add navigation link in all pages' `<nav>` section
3. Import necessary CSS modules from `css/` folder
4. Follow existing naming conventions

### CSS Modules

Each page should import only the CSS it needs:

**Basic pages:**
```html
<link rel="stylesheet" href="css/global.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/animations.css">
<link rel="stylesheet" href="css/responsive.css">
```

**Forum page:**
```html
<!-- Basic + -->
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/forum.css">
```

**Project pages:**
```html
<!-- Basic + -->
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/project.css">
```

See [css/README.md](css/README.md) for detailed module documentation.

### JavaScript Modules

- **forum.js** - Handles all forum functionality
- **sqtp.js** - Manages SQTP sidebar navigation

---

## 🚢 Deployment

### GitHub Pages (Current)

This site is automatically deployed via GitHub Pages:

1. Push changes to the `main` branch
2. GitHub Pages automatically builds and deploys
3. Visit: https://moyun-duan.github.io/Homepage/

### Other Hosting Options

Since this is a static site, you can deploy to:

- **Netlify**: Drag & drop the folder
- **Vercel**: Connect GitHub repo
- **Cloudflare Pages**: Connect GitHub repo
- **Any web server**: Upload files via FTP

---

## 🤝 Contributing

Contributions are welcome! However, as this is a personal homepage, please note:

- This project is primarily for personal use
- Feel free to fork and customize for your own use
- Bug reports and suggestions are appreciated
- See [LICENSE](LICENSE) for usage terms

---

## 📄 License

```
Copyright 2025 Moyun-Duan (清风)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

See [LICENSE](LICENSE) file for full details.

---

## 🌟 Acknowledgments

- Icons and emojis: Unicode and system defaults
- Design inspiration: Modern personal portfolio websites
- Built with ❤️ using pure HTML, CSS, and JavaScript

---

## 📞 Contact

- **GitHub**: [@Moyun-Duan](https://github.com/Moyun-Duan)
- **Website**: [https://moyun-duan.github.io/Homepage/](https://moyun-duan.github.io/Homepage/)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with 💜 by [Moyun-Duan](https://github.com/Moyun-Duan)

</div>

