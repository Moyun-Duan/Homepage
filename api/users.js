const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
    // 设置CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        try {
            const { nickname } = req.body;

            if (!nickname || nickname.trim().length === 0) {
                return res.status(400).json({ message: 'Nickname is required.' });
            }

            // 从数据库中获取所有帖子
            const posts = await kv.get('posts') || [];
            
            // 提取所有不重复的作者昵称
            const existingNicknames = [...new Set(posts.map(p => p.author))];

            // 检查昵称是否存在（不区分大小写）
            if (existingNicknames.some(name => name.toLowerCase() === nickname.toLowerCase())) {
                return res.status(409).json({ message: 'This nickname is already taken. Please choose another one.' });
            }

            // 如果昵称可用，返回成功
            res.status(200).json({ message: 'Nickname is available.' });

        } catch (error) {
            console.error('API Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
