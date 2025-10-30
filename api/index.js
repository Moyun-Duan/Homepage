const { kv } = require('@vercel/kv');

// Vercel 无服务器函数的入口点
module.exports = async (req, res) => {
    // 设置 CORS 标头，允许任何来源的请求
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理 OPTIONS 预检请求
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            // 从 Vercel KV 获取所有帖子
            const posts = await kv.get('posts') || [];
            res.status(200).json(posts);
        } else if (req.method === 'POST') {
            // 从 Vercel KV 获取当前帖子
            const posts = await kv.get('posts') || [];
            
            // 创建新帖子
            const newPost = {
                id: Date.now(),
                author: req.body.author,
                content: req.body.content,
                timestamp: new Date().toISOString()
            };
            
            // 将新帖子添加到数组中
            posts.push(newPost);
            
            // 将更新后的数组存回 Vercel KV
            await kv.set('posts', posts);
            
            res.status(201).json(newPost);
        } else {
            // 处理不支持的请求方法
            res.status(405).send('Method Not Allowed');
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
