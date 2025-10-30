// SQTP 项目页面 JavaScript - 侧边导航切换功能

// 侧边导航切换功能
const sidebarLinks = document.querySelectorAll('.sidebar-link');

sidebarLinks.forEach(link => {
    link.addEventListener('click', async (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('data-page');

        // 移除所有激活状态
        sidebarLinks.forEach(l => l.classList.remove('active'));
        
        // 添加激活状态
        link.classList.add('active');

        // 加载对应的内容页面
        const contentContainer = document.getElementById('content-container');
        
        try {
            const response = await fetch(`sqtp/${targetPage}.html`);
            if (response.ok) {
                const html = await response.text();
                contentContainer.innerHTML = html;
            } else {
                contentContainer.innerHTML = '<p style="padding: 40px; text-align: center;">Failed to load content.</p>';
            }
        } catch (error) {
            contentContainer.innerHTML = '<p style="padding: 40px; text-align: center;">Error loading content.</p>';
        }

        // 平滑滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// 页面加载时默认显示第一个内容
window.addEventListener('DOMContentLoaded', () => {
    const firstLink = document.querySelector('.sidebar-link');
    if (firstLink) {
        firstLink.click();
    }
});
