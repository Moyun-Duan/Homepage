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
async function setNickname() {
    const nickname = nicknameInput.value.trim();
    if (nickname === '') {
        alert('Please enter a nickname!');
        return;
    }

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nickname: nickname }),
        });

        const result = await response.json();

        if (!response.ok) {
            // 如果昵称已存在 (409 Conflict) 或其他错误
            alert(result.message);
            return;
        }

        // 如果昵称可用
        currentNickname = nickname;
        localStorage.setItem('forumNickname', nickname);
        nicknameInput.value = '';
        showForum();

    } catch (error) {
        console.error('Error setting nickname:', error);
        alert('An error occurred while setting the nickname. Please try again.');
    }
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
                addMessageToBoard(msg.author, msg.content, msg.timestamp, false, msg.id);
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
function addMessageToBoard(nickname, text, time, isNew = true, postId = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-board-item';
    messageDiv.dataset.postId = postId;
    
    const formattedTime = formatTimestamp(time);

    // 判断是否是当前用户的留言
    const isCurrentUser = nickname === currentNickname;
    const deleteButton = isCurrentUser ? '<button class="delete-btn" title="删除这条留言">🗑️</button>' : '';

    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="message-nickname">${nickname}</span>
            <span class="message-time">${formattedTime}</span>
            ${deleteButton}
        </div>
        <div class="message-text">${text}</div>
    `;
    
    if (isNew) {
        messageDiv.classList.add('new-message');
    }

    // 如果是当前用户的留言，绑定删除按钮事件
    if (isCurrentUser) {
        const deleteBtn = messageDiv.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteMessage(postId, messageDiv));
    }
    
    // 如果欢迎消息存在，则先移除
    const welcomeMessage = chatBox.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }
    
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// 删除留言
async function deleteMessage(postId, messageElement) {
    if (!confirm('确定要删除这条留言吗？')) {
        return;
    }

    try {
        const response = await fetch('/api/posts', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id: postId,
                author: currentNickname 
            }),
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message || 'Failed to delete message.');
        }

        // 删除成功，从界面移除
        messageElement.remove();

        // 检查是否还有留言，如果没有显示欢迎消息
        if (chatBox.children.length === 0) {
            chatBox.innerHTML = `
                <div class="welcome-message">
                    <p>Welcome to the message board! Be the first to leave a message.</p>
                </div>
            `;
        }

    } catch (error) {
        console.error('Error deleting message:', error);
        alert('无法删除留言：' + error.message);
    }
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
        addMessageToBoard(savedMessage.author, savedMessage.content, savedMessage.timestamp, true, savedMessage.id);
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
