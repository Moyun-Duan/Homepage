/* ========================================
   文章详情页 JavaScript
   ======================================== */

class ArticleRenderer {
    constructor() {
        this.articleId = null;
        this.article = null;
        this.init();
    }
    
    init() {
        // 获取文章 ID
        const urlParams = new URLSearchParams(window.location.search);
        this.articleId = urlParams.get('id');
        
        if (!this.articleId) {
            this.showError('Article not found');
            return;
        }
        
        // 等待 blogSystem 加载完成
        if (window.blogSystem && window.blogSystem.isReady) {
            this.loadArticle();
        } else {
            // 监听 blogSystemReady 事件
            window.addEventListener('blogSystemReady', () => {
                this.loadArticle();
            });
            
            // 备用：如果事件已经触发，使用定时器检查
            let attempts = 0;
            const checkInterval = setInterval(() => {
                attempts++;
                if (window.blogSystem && window.blogSystem.isReady) {
                    clearInterval(checkInterval);
                    this.loadArticle();
                } else if (attempts > 20) {
                    // 10秒后仍未加载，显示错误
                    clearInterval(checkInterval);
                    this.showError('Failed to load blog system');
                }
            }, 500);
        }
    }
    
    loadArticle() {
        console.log('🔍 Loading article with ID:', this.articleId);
        console.log('📦 BlogSystem available:', !!window.blogSystem);
        console.log('✅ BlogSystem ready:', window.blogSystem?.isReady);
        console.log('📚 Available articles:', window.blogSystem?.articles?.length);
        
        // 从博客系统获取文章
        this.article = window.blogSystem?.getArticleById(this.articleId);
        
        console.log('📄 Found article:', this.article);
        
        if (!this.article) {
            console.error('❌ Article not found for ID:', this.articleId);
            this.showError('Article not found');
            return;
        }
        
        // 渲染文章
        this.renderArticle();
    }
    
    renderArticle() {
        // 更新页面标题
        document.getElementById('articleTitle').textContent = `${this.article.title} - Moyun-Duan`;
        document.getElementById('articleHeaderTitle').textContent = this.article.title;
        
        // 更新分类
        const categoryColors = {
            programming: '#3b82f6',
            design: '#ec4899',
            tutorial: '#10b981',
            thoughts: '#f59e0b'
        };
        
        const categoryElement = document.getElementById('articleCategory');
        categoryElement.textContent = this.article.category;
        categoryElement.style.background = categoryColors[this.article.category] || '#667eea';
        
        // 更新日期
        document.getElementById('articleDate').textContent = `📅 ${this.formatDate(this.article.date)}`;
        
        // 更新标签
        const tagsContainer = document.getElementById('articleTags');
        tagsContainer.innerHTML = this.article.tags.map(tag => 
            `<span class="article-tag">#${tag}</span>`
        ).join('');
        
        // 更新阅读时间
        document.getElementById('articleReadTime').textContent = `⏱️ ${this.article.readTime}`;
        
        // 显示 AI 警告（仅前6篇文章）
        const aiWarning = document.getElementById('aiWarning');
        if (aiWarning && this.article.id <= 6) {
            aiWarning.style.display = 'block';
        }
        
        // 加载文章内容
        this.loadArticleContent();
    }
    
    loadArticleContent() {
        const bodyElement = document.getElementById('articleBody');
        
        // 显示加载状态
        bodyElement.innerHTML = '<div class="loading-spinner">Loading article...</div>';
        
        // 从 Markdown 文件加载内容
        const mdFile = `blog/articles/${this.article.file}`;
        
        fetch(mdFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load article content');
                }
                return response.text();
            })
            .then(markdown => {
                // 使用 marked.js 解析 Markdown
                if (typeof marked !== 'undefined') {
                    bodyElement.innerHTML = marked.parse(markdown);
                    
                    // 代码高亮
                    if (typeof hljs !== 'undefined') {
                        document.querySelectorAll('pre code').forEach((block) => {
                            hljs.highlightElement(block);
                        });
                    }
                } else {
                    bodyElement.innerHTML = `<pre>${markdown}</pre>`;
                }
                
                // 添加渐入动画
                bodyElement.classList.add('fade-in');
                
                console.log(`✅ Loaded article: ${this.article.title}`);
            })
            .catch(error => {
                console.error('❌ Error loading article:', error);
                bodyElement.innerHTML = `
                    <div class="error-message">
                        <h2>⚠️ Failed to load article</h2>
                        <p>Sorry, we couldn't load this article. Please try again later.</p>
                        <a href="blog.html" class="button">← Back to Blog</a>
                    </div>
                `;
            });
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    showError(message) {
        const bodyElement = document.getElementById('articleBody');
        bodyElement.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 5em; margin-bottom: 20px;">😕</div>
                <h2>${message}</h2>
                <p style="color: var(--text-secondary); margin-bottom: 30px;">
                    The article you're looking for doesn't exist or has been removed.
                </p>
                <a href="blog.html" style="background: var(--accent-gradient); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">
                    ← Back to Blog
                </a>
            </div>
        `;
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new ArticleRenderer();
});
