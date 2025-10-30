/* ========================================
   博客系统 JavaScript
   文章管理、搜索、筛选和渲染
   ======================================== */

class BlogSystem {
    constructor() {
        this.articles = [];
        this.filteredArticles = [];
        this.currentCategory = 'all';
        this.currentPage = 1;
        this.articlesPerPage = 6;
        this.isReady = false;
        // 不在构造函数中调用 init，由外部调用
    }
    
    async init() {
        // 加载文章数据
        await this.loadArticles();
        
        // 绑定事件
        this.bindEvents();
        
        // 渲染文章
        this.renderArticles();
        
        // 标记为已就绪
        this.isReady = true;
    }
    
    async loadArticles() {
        try {
            // 从 JSON 文件加载文章元数据
            const response = await fetch('blog/articles.json');
            
            if (!response.ok) {
                throw new Error('Failed to load articles');
            }
            
            this.articles = await response.json();
            this.filteredArticles = [...this.articles];
            
            console.log(`✅ Loaded ${this.articles.length} articles`);
            
        } catch (error) {
            console.error('❌ Error loading articles:', error);
            
            // 显示错误提示
            if (window.toast) {
                window.toast.show('Failed to load articles', 'error');
            }
            
            // 使用空数组防止程序崩溃
            this.articles = [];
            this.filteredArticles = [];
        }
    }
    
    bindEvents() {
        // 搜索功能
        const searchInput = document.getElementById('blogSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
        
        // 分类筛选
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // 更新激活状态
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                // 筛选文章
                const category = e.target.dataset.category;
                this.filterByCategory(category);
            });
        });
    }
    
    handleSearch(query) {
        const searchQuery = query.toLowerCase().trim();
        
        if (!searchQuery) {
            this.filteredArticles = this.currentCategory === 'all' 
                ? [...this.articles]
                : this.articles.filter(article => article.category === this.currentCategory);
        } else {
            let articlesToSearch = this.currentCategory === 'all'
                ? this.articles
                : this.articles.filter(article => article.category === this.currentCategory);
            
            this.filteredArticles = articlesToSearch.filter(article => 
                article.title.toLowerCase().includes(searchQuery) ||
                article.excerpt.toLowerCase().includes(searchQuery) ||
                article.tags.some(tag => tag.toLowerCase().includes(searchQuery))
            );
        }
        
        this.currentPage = 1;
        this.renderArticles();
    }
    
    filterByCategory(category) {
        this.currentCategory = category;
        
        if (category === 'all') {
            this.filteredArticles = [...this.articles];
        } else {
            this.filteredArticles = this.articles.filter(
                article => article.category === category
            );
        }
        
        // 重新应用搜索（如果有）
        const searchInput = document.getElementById('blogSearch');
        if (searchInput && searchInput.value) {
            this.handleSearch(searchInput.value);
        } else {
            this.currentPage = 1;
            this.renderArticles();
        }
    }
    
    renderArticles() {
        const grid = document.getElementById('articlesGrid');
        const loadingState = document.getElementById('loadingState');
        const emptyState = document.getElementById('emptyState');
        
        if (!grid) return;
        
        // 显示加载状态
        loadingState.style.display = 'flex';
        grid.innerHTML = '';
        emptyState.style.display = 'none';
        
        // 模拟加载延迟
        setTimeout(() => {
            loadingState.style.display = 'none';
            
            // 检查是否有文章
            if (this.filteredArticles.length === 0) {
                emptyState.style.display = 'block';
                return;
            }
            
            // 分页
            const startIndex = (this.currentPage - 1) * this.articlesPerPage;
            const endIndex = startIndex + this.articlesPerPage;
            const articlesToShow = this.filteredArticles.slice(startIndex, endIndex);
            
            // 渲染文章卡片
            articlesToShow.forEach((article, index) => {
                const card = this.createArticleCard(article, index);
                grid.appendChild(card);
            });
            
            // 渲染分页
            this.renderPagination();
            
        }, 300);
    }
    
    createArticleCard(article, index) {
        const card = document.createElement('div');
        card.className = 'article-card fade-in';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const categoryColors = {
            programming: '#3b82f6',
            design: '#ec4899',
            tutorial: '#10b981',
            thoughts: '#f59e0b'
        };
        
        card.innerHTML = `
            <div class="article-thumbnail">${article.thumbnail}</div>
            <div class="article-content">
                <div class="article-meta">
                    <span class="article-category" style="background: ${categoryColors[article.category] || '#667eea'}">
                        ${article.category}
                    </span>
                    <span class="article-date">
                        📅 ${this.formatDate(article.date)}
                    </span>
                </div>
                <h3>${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                ${article.id <= 6 ? `
                <div style="margin: 10px 0; padding: 8px 12px; background: rgba(251, 191, 36, 0.1); border-left: 3px solid #f59e0b; border-radius: 4px;">
                    <p style="margin: 0; font-size: 0.85rem; color: #d97706; line-height: 1.4;">
                        ⚠️ <strong>AI-Generated Content:</strong> Large portions of this article were generated by AI. Please review critically.
                    </p>
                </div>
                ` : ''}
                <div class="article-tags">
                    ${article.tags.map(tag => `<span class="article-tag">#${tag}</span>`).join('')}
                </div>
                <div class="article-footer">
                    <span class="read-time">⏱️ ${article.readTime}</span>
                    <a href="article.html?id=${article.id}" class="read-more">
                        Read More →
                    </a>
                </div>
            </div>
        `;
        
        // 点击卡片跳转
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.read-more')) {
                window.location.href = `article.html?id=${article.id}`;
            }
        });
        
        return card;
    }
    
    renderPagination() {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;
        
        const totalPages = Math.ceil(this.filteredArticles.length / this.articlesPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // 上一页按钮
        paginationHTML += `
            <button class="page-btn" ${this.currentPage === 1 ? 'disabled' : ''} 
                    onclick="blogSystem.goToPage(${this.currentPage - 1})">
                ← Prev
            </button>
        `;
        
        // 页码按钮
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || 
                i === totalPages || 
                (i >= this.currentPage - 1 && i <= this.currentPage + 1)
            ) {
                paginationHTML += `
                    <button class="page-btn ${i === this.currentPage ? 'active' : ''}" 
                            onclick="blogSystem.goToPage(${i})">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                paginationHTML += '<span style="padding: 10px;">...</span>';
            }
        }
        
        // 下一页按钮
        paginationHTML += `
            <button class="page-btn" ${this.currentPage === totalPages ? 'disabled' : ''} 
                    onclick="blogSystem.goToPage(${this.currentPage + 1})">
                Next →
            </button>
        `;
        
        pagination.innerHTML = paginationHTML;
    }
    
    goToPage(page) {
        this.currentPage = page;
        this.renderArticles();
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    // 获取单篇文章（用于文章详情页）
    getArticleById(id) {
        return this.articles.find(article => article.id === parseInt(id));
    }
}

// ===== 初始化 =====
let blogSystem;

document.addEventListener('DOMContentLoaded', async () => {
    blogSystem = new BlogSystem();
    
    // 等待文章加载完成
    await blogSystem.init();
    
    // 导出到全局，供 article.js 使用
    window.blogSystem = blogSystem;
    
    console.log('📝 Blog system initialized!');
    
    // 触发自定义事件，通知其他模块博客系统已就绪
    window.dispatchEvent(new CustomEvent('blogSystemReady', { detail: { blogSystem } }));
    
    // 显示欢迎消息
    if (window.toast) {
        setTimeout(() => {
            window.toast.show('Welcome to the blog! 📚', 'info', 2000);
        }, 1000);
    }
});
