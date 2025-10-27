# Homepage Project Structure

This is the personal homepage for Moyun-Duan (清风).

## 📁 File Structure

```
homepage/
├── index.html          # 主页
├── person.html         # 个人信息页
├── book.html           # 书籍页面
├── project.html        # 项目列表页
├── forum.html          # 留言板页面
├── sqtp.html           # SQTP 项目详情页
├── public.css          # 全局样式表
│
├── js/                 # JavaScript 文件夹
│   ├── forum.js        # 留言板功能脚本
│   └── sqtp.js         # SQTP 项目页面脚本
│
└── sqtp/               # SQTP 项目内容模块
    ├── members.html    # 成员页面内容
    ├── settings.html   # 项目设定内容
    └── results.html    # 研究成果内容
```

## 🎯 Features

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

## 🚀 Deployment

Website is deployed on GitHub Pages:
- **Live URL**: https://moyun-duan.github.io/Homepage/

## 💾 Data Storage

Forum messages are stored in browser's localStorage:
- `forumNickname` - User nickname
- `forumMessages` - All messages (JSON array)

## 🛠️ Technologies

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- localStorage API
- Fetch API

## 📝 How to Update Content

### Add a new SQTP section:
1. Create a new HTML file in `sqtp/` folder
2. Add a navigation link in `sqtp.html` sidebar
3. Update `js/sqtp.js` if needed

### Modify forum functionality:
- Edit `js/forum.js`

### Add a new project:
- Add project card in `project.html`
- Create a new detail page (like sqtp.html)

## 📄 License

© 2025 清风 (Moyun-Duan). All rights reserved.
