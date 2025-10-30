# CSS 模块化结构说明

## 📁 文件结构

```
css/
├── global.css        # 全局样式
├── layout.css        # 布局样式
├── components.css    # 通用组件
├── forum.css         # 论坛页面
├── project.css       # 项目页面
├── animations.css    # 动画效果
└── responsive.css    # 响应式设计
```

## 📋 各文件说明

### global.css - 全局样式
**用途**: 所有页面的基础样式
- CSS 重置 (`*` 选择器)
- `body` 背景和水印
- 通用段落、链接、标题样式
- 所有页面都需要引入

### layout.css - 布局样式
**用途**: 页面结构布局
- 导航栏 (`nav`)
- 页眉 (`header`)
- 主内容区域 (`main`)
- 页脚 (`footer`)
- 所有页面都需要引入

### components.css - 通用组件
**用途**: 可复用的 UI 组件
- 按钮样式 (`.small-btn`, `.danger-btn`)
- 标签样式 (`.tag`, `.tech-tag`)
- 模态框 (`.modal`, `.modal-content`)
- 输入框和表单元素
- 仅在使用这些组件的页面引入

### forum.css - 论坛样式
**用途**: 论坛/留言板特定样式
- 聊天容器 (`.chat-container`)
- 聊天框 (`.chat-box`)
- 消息样式 (`.message`, `.message-content`)
- 留言板条目 (`.message-board-item`)
- 仅在 `forum.html` 引入

### project.css - 项目样式
**用途**: 项目页面特定样式
- 项目卡片 (`.project-card`)
- 侧边栏 (`.sidebar`)
- 成员网格 (`.members-grid`, `.member-card`)
- 设置和结果容器
- 仅在 `project.html` 和 `sqtp.html` 引入

### animations.css - 动画效果
**用途**: 所有动画关键帧
- `fadeInUp` - 淡入上移
- `slideIn` - 滑入
- `messageSlide` - 消息滑动
- `fadeIn` - 淡入
- `slideDown` - 下滑
- 所有需要动画的页面引入

### responsive.css - 响应式设计
**用途**: 移动端适配
- 媒体查询 `@media (max-width: 768px)`
- 移动端布局调整
- 所有页面都需要引入

## 📄 页面引用示例

### 基础页面 (index.html, person.html, book.html)
```html
<link rel="stylesheet" href="css/global.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/animations.css">
<link rel="stylesheet" href="css/responsive.css">
```

### 论坛页面 (forum.html)
```html
<link rel="stylesheet" href="css/global.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/forum.css">
<link rel="stylesheet" href="css/animations.css">
<link rel="stylesheet" href="css/responsive.css">
```

### 项目页面 (project.html, sqtp.html)
```html
<link rel="stylesheet" href="css/global.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/project.css">
<link rel="stylesheet" href="css/animations.css">
<link rel="stylesheet" href="css/responsive.css">
```

## ✅ 优势

1. **模块化**: 每个文件职责清晰，易于维护
2. **按需加载**: 页面只加载需要的样式
3. **减少冗余**: 避免重复代码
4. **便于调试**: 快速定位样式所在文件
5. **团队协作**: 多人可同时编辑不同模块

## 🔄 迁移说明

- 原 `public.css` 已重命名为 `public.css.backup`
- 所有 HTML 文件已更新为新的模块化引用
- 功能完全保持一致，无需修改 HTML 结构

## 📝 维护建议

1. **添加新样式时**:
   - 通用样式 → `global.css`
   - 布局相关 → `layout.css`
   - 页面特定 → 对应的页面 CSS

2. **修改样式时**:
   - 先确定样式所属模块
   - 在对应文件中修改
   - 测试相关页面

3. **添加新页面时**:
   - 根据需要引入相应的 CSS 模块
   - 如有特定样式，创建新的页面 CSS 文件
