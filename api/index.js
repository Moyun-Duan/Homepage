const fs = require('fs');
const path = require('path');

// Vercel 的无服务器函数只有一个可写的临时目录 /tmp
const dataFilePath = path.join('/tmp', 'forum-data.json');

// 帮助函数：从 JSON 文件读取数据
const readData = () => {
    if (!fs.existsSync(dataFilePath)) {
        // 如果文件不存在，创建一个空数组
        fs.writeFileSync(dataFilePath, JSON.stringify([]));
        return [];
    }
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // 如果文件损坏或为空，返回空数组
        return [];
    }
};

// 帮助函数：将数据写入 JSON 文件
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

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

    if (req.method === 'GET') {
        // 处理获取所有帖子的请求
        const posts = readData();
        res.status(200).json(posts);
    } else if (req.method === 'POST') {
        // 处理创建新帖子的请求
        const posts = readData();
        const newPost = {
            id: Date.now(),
            author: req.body.author,
            content: req.body.content,
            timestamp: new Date().toISOString()
        };
        posts.push(newPost);
        writeData(posts);
        res.status(201).json(newPost);
    } else {
        // 处理不支持的请求方法
        res.status(405).send('Method Not Allowed');
    }
};
