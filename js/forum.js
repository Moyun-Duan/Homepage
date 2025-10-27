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
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('forumMessages') || '[]');
    chatBox.innerHTML = '';
    
    if (messages.length === 0) {
        chatBox.innerHTML = `
            <div class="welcome-message">
                <p>Welcome to the message board! Be the first to leave a message.</p>
            </div>
        `;
    } else {
        messages.forEach(msg => {
            addMessageToBoard(msg.nickname, msg.text, msg.time, false);
        });
    }
    
    chatBox.scrollTop = chatBox.scrollHeight;
}

// 添加留言到页面
function addMessageToBoard(nickname, text, time, isNew = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-board-item';
    
    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="message-nickname">${nickname}</span>
            <span class="message-time">${time}</span>
        </div>
        <div class="message-text">${text}</div>
    `;
    
    if (isNew) {
        messageDiv.classList.add('new-message');
    }
    
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// 发送留言
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === '') return;

    const now = new Date();
    const time = now.getFullYear() + '-' + 
                 String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                 String(now.getDate()).padStart(2, '0') + ' ' +
                 String(now.getHours()).padStart(2, '0') + ':' + 
                 String(now.getMinutes()).padStart(2, '0');

    // 保存到 localStorage
    const messages = JSON.parse(localStorage.getItem('forumMessages') || '[]');
    const newMessage = {
        nickname: currentNickname,
        text: messageText,
        time: time,
        timestamp: now.getTime()
    };
    messages.push(newMessage);
    localStorage.setItem('forumMessages', JSON.stringify(messages));

    // 添加到页面
    addMessageToBoard(currentNickname, messageText, time, true);
    messageInput.value = '';
}

// 更改昵称
function changeNickname() {
    if (confirm('Change your nickname? This will only affect future messages.')) {
        currentNickname = '';
        localStorage.removeItem('forumNickname');
        showNicknameModal();
    }
}

// 清除所有留言
function clearAllMessages() {
    if (confirm('Are you sure you want to delete ALL messages? This cannot be undone!')) {
        localStorage.removeItem('forumMessages');
        loadMessages();
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
clearMessagesBtn.addEventListener('click', clearAllMessages);

// 页面加载时初始化
init();
