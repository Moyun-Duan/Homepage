// Forum 页面 JavaScript - 留言板功能

// 全局变量
let currentNickname = localStorage.getItem('forumNickname') || '';
const nicknameModal = document.getElementById('nicknameModal');
const forumContainer = document.getElementById('forumContainer');
const nicknameInput = document.getElementById('nicknameInput');
const nicknameSubmit = document.getElementById('nicknameSubmit');
const currentUserSpan = document.getElementById('currentUser');
const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const changeNicknameBtn = document.getElementById('changeNickname');
const clearMessagesBtn = document.getElementById('clearMessages');

// 初始化
function init() {
    if (currentNickname) {
        showForum();
    } else {
        showNicknameModal();
    }
    loadMessages();
}

// 显示昵称输入弹窗
function showNicknameModal() {
    nicknameModal.style.display = 'flex';
    forumContainer.style.display = 'none';
    nicknameInput.focus();
}

// 显示论坛
function showForum() {
    nicknameModal.style.display = 'none';
    forumContainer.style.display = 'block';
    currentUserSpan.textContent = currentNickname;
}

// 设置昵称
function setNickname() {
    const nickname = nicknameInput.value.trim();
    if (nickname === '') {
        alert('Please enter a nickname!');
        return;
    }
    currentNickname = nickname;
    localStorage.setItem('forumNickname', nickname);
    nicknameInput.value = '';
    showForum();
}

// 加载所有留言
async function loadMessages() {
    try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
            throw new Error('Failed to fetch messages.');
        }
        const messages = await response.json();
        chatBox.innerHTML = '';

        if (messages.length === 0) {
            chatBox.innerHTML = `
                <div class="welcome-message">
                    <p>Welcome to the message board! Be the first to leave a message.</p>
                </div>
            `;
        } else {
            messages.forEach(msg => {
                addMessageToBoard(msg.author, msg.content, msg.timestamp, false);
            });
        }
    } catch (error) {
        console.error('Error loading messages:', error);
        chatBox.innerHTML = `
            <div class="welcome-message">
                <p>Error loading messages. Please try again later.</p>
            </div>
        `;
    } finally {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// 格式化时间戳
function formatTimestamp(isoString) {
    const date = new Date(isoString);
    return date.getFullYear() + '-' +
           String(date.getMonth() + 1).padStart(2, '0') + '-' +
           String(date.getDate()).padStart(2, '0') + ' ' +
           String(date.getHours()).padStart(2, '0') + ':' +
           String(date.getMinutes()).padStart(2, '0');
}

// 添加留言到页面
function addMessageToBoard(nickname, text, time, isNew = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-board-item';
    
    const formattedTime = formatTimestamp(time);

    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="message-nickname">${nickname}</span>
            <span class="message-time">${formattedTime}</span>
        </div>
        <div class="message-text">${text}</div>
    `;
    
    if (isNew) {
        messageDiv.classList.add('new-message');
    }
    
    // 如果欢迎消息存在，则先移除
    const welcomeMessage = chatBox.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }
    
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// 发送留言
async function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === '' || !currentNickname) return;

    const newMessage = {
        author: currentNickname,
        content: messageText,
    };

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMessage),
        });

        if (!response.ok) {
            throw new Error('Failed to send message.');
        }

        const savedMessage = await response.json();
        addMessageToBoard(savedMessage.author, savedMessage.content, savedMessage.timestamp, true);
        messageInput.value = '';
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Could not send message. Please try again.');
    }
}

// 更改昵称
function changeNickname() {
    if (confirm('Change your nickname? This will only affect future messages.')) {
        currentNickname = '';
        localStorage.removeItem('forumNickname');
        showNicknameModal();
    }
}

// 事件监听
nicknameSubmit.addEventListener('click', setNickname);
nicknameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') setNickname();
});

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

changeNicknameBtn.addEventListener('click', changeNickname);

// 页面加载时初始化
init();
