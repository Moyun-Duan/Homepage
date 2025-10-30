const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
    // 设置CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // 验证管理员密码
        if (req.method === 'POST' && req.url === '/api/admin') {
            const { password } = req.body;
            const adminPassword = process.env.ADMIN_PASSWORD || 'qingfengmoyun';

            if (password === adminPassword) {
                // 生成一个简单的令牌（实际项目中应使用 JWT）
                const token = Buffer.from(`admin:${Date.now()}`).toString('base64');
                res.status(200).json({ 
                    success: true, 
                    token,
                    message: 'Admin authenticated successfully.' 
                });
            } else {
                res.status(401).json({ 
                    success: false, 
                    message: 'Invalid password.' 
                });
            }
        }
        // 获取所有帖子和统计信息
        else if (req.method === 'GET') {
            // 简单验证（实际项目中应验证 JWT token）
            const posts = await kv.get('posts') || [];
            const uniqueAuthors = [...new Set(posts.map(p => p.author))];
            
            res.status(200).json({
                posts,
                stats: {
                    totalPosts: posts.length,
                    totalUsers: uniqueAuthors.length,
                    authors: uniqueAuthors
                }
            });
        }
        // 更新帖子内容
        else if (req.method === 'PUT') {
            const { id, content } = req.body;

            if (!id || !content) {
                return res.status(400).json({ message: 'Post ID and content are required.' });
            }

            const posts = await kv.get('posts') || [];
            const postIndex = posts.findIndex(p => p.id === id);

            if (postIndex === -1) {
                return res.status(404).json({ message: 'Post not found.' });
            }

            posts[postIndex].content = content;
            posts[postIndex].edited = true;
            posts[postIndex].editedAt = new Date().toISOString();

            await kv.set('posts', posts);

            res.status(200).json({ 
                message: 'Post updated successfully.',
                post: posts[postIndex]
            });
        }
        else {
            res.status(405).send('Method Not Allowed');
        }
    } catch (error) {
        console.error('Admin API Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
