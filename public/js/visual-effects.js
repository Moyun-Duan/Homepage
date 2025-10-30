/* ========================================
   页面加载和视觉效果 JavaScript
   ======================================== */

class PageLoader {
    constructor() {
        this.loader = null;
        this.progressBar = null;
        this.progress = 0;
        this.init();
    }
    
    init() {
        // 创建加载器
        this.createLoader();
        
        // 模拟加载进度
        this.simulateProgress();
        
        // 监听页面加载完成
        if (document.readyState === 'complete') {
            this.hideLoader();
        } else {
            window.addEventListener('load', () => {
                this.hideLoader();
            });
        }
    }
    
    createLoader() {
        const loaderHTML = `
            <div class="page-loader" id="pageLoader">
                <div class="loader-content">
                    <div class="spinner">
                        <div class="spinner-ring"></div>
                        <div class="spinner-ring"></div>
                        <div class="spinner-ring"></div>
                    </div>
                    <div class="loader-text">Loading Amazing Content...</div>
                    <div class="loading-progress">
                        <div class="progress-bar" id="progressBar"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', loaderHTML);
        this.loader = document.getElementById('pageLoader');
        this.progressBar = document.getElementById('progressBar');
    }
    
    simulateProgress() {
        const interval = setInterval(() => {
            this.progress += Math.random() * 30;
            if (this.progress >= 90) {
                this.progress = 90;
                clearInterval(interval);
            }
            this.updateProgress(this.progress);
        }, 200);
    }
    
    updateProgress(value) {
        if (this.progressBar) {
            this.progressBar.style.width = `${value}%`;
        }
    }
    
    hideLoader() {
        this.updateProgress(100);
        setTimeout(() => {
            if (this.loader) {
                this.loader.classList.add('hidden');
                setTimeout(() => {
                    this.loader.remove();
                }, 500);
            }
            
            // 触发内容动画
            this.animateContent();
        }, 300);
    }
    
    animateContent() {
        // 为页面元素添加渐入动画
        const elements = document.querySelectorAll('header, main > *, footer');
        elements.forEach((el, index) => {
            el.classList.add('fade-in', `fade-in-delay-${Math.min(index + 1, 5)}`);
        });
    }
}

// ===== 滚动进度条 =====
class ScrollProgress {
    constructor() {
        this.progressBar = null;
        this.init();
    }
    
    init() {
        // 创建进度条
        const progressHTML = '<div class="scroll-progress" id="scrollProgress"></div>';
        document.body.insertAdjacentHTML('afterbegin', progressHTML);
        this.progressBar = document.getElementById('scrollProgress');
        
        // 监听滚动
        window.addEventListener('scroll', () => this.updateProgress());
        this.updateProgress();
    }
    
    updateProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        if (this.progressBar) {
            this.progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
        }
    }
}

// ===== 元素可见性动画 =====
class VisibilityAnimator {
    constructor(options = {}) {
        this.options = {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px',
            animationClass: options.animationClass || 'fade-in'
        };
        this.observer = null;
        this.init();
    }
    
    init() {
        if (!('IntersectionObserver' in window)) return;
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(this.options.animationClass);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: this.options.threshold,
            rootMargin: this.options.rootMargin
        });
        
        // 观察所有需要动画的元素
        this.observeElements();
    }
    
    observeElements() {
        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach(el => this.observer.observe(el));
    }
}

// ===== 涟漪效果 =====
function addRippleEffect() {
    const rippleElements = document.querySelectorAll('.ripple, button, .social-icon, .project-link');
    
    rippleElements.forEach(element => {
        if (!element.classList.contains('ripple')) {
            element.classList.add('ripple');
        }
    });
}

// ===== Toast 消息系统 =====
class ToastNotification {
    constructor() {
        this.container = null;
        this.init();
    }
    
    init() {
        const containerHTML = '<div class="toast-container" id="toastContainer"></div>';
        document.body.insertAdjacentHTML('beforeend', containerHTML);
        this.container = document.getElementById('toastContainer');
    }
    
    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${message}</span>
        `;
        
        this.container.appendChild(toast);
        
        // 触发动画
        setTimeout(() => toast.classList.add('show'), 10);
        
        // 自动隐藏
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

// Toast 样式（添加到 loading.css）
const toastStyles = `
.toast-container {
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.toast {
    background: var(--bg-card);
    color: var(--text-primary);
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 300px;
    transform: translateX(400px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    border-left: 4px solid var(--accent-primary);
}

.toast.show {
    transform: translateX(0);
    opacity: 1;
}

.toast-icon {
    font-size: 1.5em;
}

.toast-message {
    flex: 1;
    font-size: 0.95em;
}

.toast-success { border-left-color: #10b981; }
.toast-error { border-left-color: #ef4444; }
.toast-warning { border-left-color: #f59e0b; }
.toast-info { border-left-color: #3b82f6; }

@media (max-width: 768px) {
    .toast-container {
        right: 10px;
        left: 10px;
    }
    
    .toast {
        min-width: auto;
    }
}
`;

// 注入 Toast 样式
function injectToastStyles() {
    const style = document.createElement('style');
    style.textContent = toastStyles;
    document.head.appendChild(style);
}

// ===== 页面切换动画 =====
function initPageTransitions() {
    // 为所有内部链接添加页面切换效果
    document.querySelectorAll('a[href^="index.html"], a[href^="person.html"], a[href^="project.html"], a[href^="forum.html"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#')) {
                e.preventDefault();
                
                // 淡出动画
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    // 页面加载器
    new PageLoader();
    
    // 滚动进度条
    new ScrollProgress();
    
    // 可见性动画
    new VisibilityAnimator();
    
    // 涟漪效果
    addRippleEffect();
    
    // Toast 样式
    injectToastStyles();
    
    // 页面切换
    initPageTransitions();
    
    console.log('✨ Visual effects initialized!');
});

// ===== 导出全局对象 =====
window.toast = new ToastNotification();
window.PageLoader = PageLoader;
window.ScrollProgress = ScrollProgress;

// 使用示例：
// window.toast.show('操作成功！', 'success');
// window.toast.show('发生错误！', 'error');
// window.toast.show('请注意！', 'warning');
// window.toast.show('提示信息', 'info');
