/* ========================================
   SEO 优化增强功能
   用于所有页面的通用脚本
   ======================================== */

// ===== 结构化数据（JSON-LD） =====
const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Moyun-Duan",
    "alternateName": "清风",
    "url": "https://moyun-duan.github.io/Homepage/",
    "jobTitle": "Project Designer",
    "description": "Enthusiastic Learner and Project Designer",
    "sameAs": [
        "https://github.com/Moyun-Duan"
    ],
    "knowsAbout": [
        "Web Development",
        "Project Design",
        "Programming"
    ]
};

// 插入结构化数据
function addStructuredData() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// ===== 页面加载性能监控 =====
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log(`📊 ${entry.name}: ${entry.duration}ms`);
        }
    });
    observer.observe({ entryTypes: ['navigation', 'paint'] });
}

// ===== 预加载关键资源 =====
function preloadCriticalResources() {
    const resources = [
        { href: 'css/theme.css', as: 'style' },
        { href: 'css/global.css', as: 'style' }
    ];
    
    resources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        document.head.appendChild(link);
    });
}

// ===== 页面可见性 API - 性能优化 =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('⏸️ Page hidden - pausing non-critical operations');
    } else {
        console.log('▶️ Page visible - resuming operations');
    }
});

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    addStructuredData();
    
    // 添加加载完成标记
    document.body.classList.add('loaded');
    
    // 性能日志
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Page loaded in ${loadTime}ms`);
    }
});

// ===== 错误监控 =====
window.addEventListener('error', (event) => {
    console.error('❌ Error:', event.error);
});

// ===== 平滑滚动到锚点 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // 更新 URL
            history.pushState(null, null, targetId);
        }
    });
});

// ===== 返回顶部功能 =====
function createBackToTop() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Back to top');
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9999;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--accent-gradient);
        color: white;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-md);
    `;
    
    document.body.appendChild(button);
    
    // 显示/隐藏按钮
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    // 点击返回顶部
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
}

// 初始化返回顶部按钮
createBackToTop();

// ===== 导出功能供其他脚本使用 =====
window.seoEnhance = {
    structuredData,
    addStructuredData,
    preloadCriticalResources
};
