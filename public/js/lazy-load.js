/* ========================================
   图片懒加载与优化
   提升页面性能
   ======================================== */

class LazyImageLoader {
    constructor(options = {}) {
        this.options = {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '50px',
            loadingClass: options.loadingClass || 'lazy-loading',
            loadedClass: options.loadedClass || 'lazy-loaded',
            errorClass: options.errorClass || 'lazy-error',
            placeholderColor: options.placeholderColor || '#e2e8f0'
        };
        
        this.observer = null;
        this.images = [];
        this.init();
    }
    
    init() {
        // 检查浏览器支持
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            // 降级方案：直接加载所有图片
            this.loadAllImages();
        }
        
        // 监听新增图片
        this.observeDOM();
    }
    
    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: this.options.threshold,
            rootMargin: this.options.rootMargin
        });
        
        this.registerImages();
    }
    
    registerImages() {
        // 查找所有需要懒加载的图片
        const lazyImages = document.querySelectorAll('img[loading="lazy"], img[data-src]');
        
        lazyImages.forEach(img => {
            if (!this.images.includes(img)) {
                this.images.push(img);
                
                // 添加加载中样式
                img.classList.add(this.options.loadingClass);
                
                // 添加占位背景
                if (!img.style.backgroundColor) {
                    img.style.backgroundColor = this.options.placeholderColor;
                }
                
                // 观察图片
                if (this.observer) {
                    this.observer.observe(img);
                }
            }
        });
    }
    
    loadImage(img) {
        const src = img.dataset.src || img.src;
        
        if (!src) return;
        
        // 创建新图片对象用于预加载
        const tempImage = new Image();
        
        tempImage.onload = () => {
            img.src = src;
            img.classList.remove(this.options.loadingClass);
            img.classList.add(this.options.loadedClass);
            img.style.backgroundColor = 'transparent';
            
            // 触发自定义事件
            img.dispatchEvent(new CustomEvent('lazyloaded', {
                detail: { src }
            }));
            
            console.log(`✅ Image loaded: ${src}`);
        };
        
        tempImage.onerror = () => {
            img.classList.remove(this.options.loadingClass);
            img.classList.add(this.options.errorClass);
            
            console.error(`❌ Failed to load image: ${src}`);
            
            // 显示错误占位符
            this.showErrorPlaceholder(img);
        };
        
        tempImage.src = src;
    }
    
    loadAllImages() {
        const images = document.querySelectorAll('img[loading="lazy"], img[data-src]');
        images.forEach(img => this.loadImage(img));
    }
    
    showErrorPlaceholder(img) {
        // 创建错误占位符
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            width: ${img.width || 200}px;
            height: ${img.height || 200}px;
            background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
            color: #999;
            font-size: 3em;
            border-radius: 8px;
        `;
        placeholder.innerHTML = '🖼️';
        
        img.parentNode.replaceChild(placeholder, img);
    }
    
    observeDOM() {
        // 监听 DOM 变化，自动注册新图片
        if ('MutationObserver' in window) {
            const observer = new MutationObserver(() => {
                this.registerImages();
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
    
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.images = [];
    }
}

// ===== CSS 样式 =====
const lazyStyles = `
    .lazy-loading {
        filter: blur(5px);
        opacity: 0.6;
        transition: filter 0.3s ease, opacity 0.3s ease;
    }
    
    .lazy-loaded {
        filter: blur(0);
        opacity: 1;
        animation: fadeIn 0.3s ease-in;
    }
    
    .lazy-error {
        opacity: 0.3;
        filter: grayscale(100%);
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    /* 响应式图片优化 */
    img {
        max-width: 100%;
        height: auto;
        display: block;
    }
    
    /* 渐进式图片加载效果 */
    img[loading="lazy"]:not(.lazy-loaded) {
        background: linear-gradient(
            90deg,
            #f0f0f0 0%,
            #e0e0e0 50%,
            #f0f0f0 100%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
    }
    
    @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
`;

// 注入样式
function injectLazyStyles() {
    const style = document.createElement('style');
    style.textContent = lazyStyles;
    document.head.appendChild(style);
}

// ===== 初始化 =====
let lazyLoader;

document.addEventListener('DOMContentLoaded', () => {
    injectLazyStyles();
    lazyLoader = new LazyImageLoader({
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    console.log('🖼️ Lazy Image Loader initialized');
});

// ===== 导出 =====
window.LazyImageLoader = LazyImageLoader;
window.lazyLoader = lazyLoader;
