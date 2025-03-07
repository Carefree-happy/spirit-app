import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: {},  // 按对话ID分组的消息
    onlineStatus: {},  // 用户在线状态
    unreadCount: {},  // 未读消息计数
    loading: false,
    error: null,
};

const directChatSlice = createSlice({
  name: 'directChat',
  initialState,
  reducers: {
        sendDirectMessage: (state, action) => {
            const { chatId, message } = action.payload;
            if (!state.messages[chatId]) {
                state.messages[chatId] = [];
            }
            state.messages[chatId].push({
                ...message,
                id: Date.now(),
                status: 'sending',
                timestamp: new Date().toISOString(),
            });
        },
        updateMessageStatus: (state, action) => {
            const { chatId, messageId, status } = action.payload;
            const message = state.messages[chatId]?.find(msg => msg.id === messageId);
            if (message) {
                message.status = status;
            }
        },
        setUserOnlineStatus: (state, action) => {
            const { userId, status } = action.payload;
            state.onlineStatus[userId] = status;
        },
        incrementUnreadCount: (state, action) => {
            const { chatId } = action.payload;
            state.unreadCount[chatId] = (state.unreadCount[chatId] || 0) + 1;
        },
        clearUnreadCount: (state, action) => {
            const { chatId } = action.payload;
            state.unreadCount[chatId] = 0;
        },
        receiveDirectMessage: (state, action) => {
            const { chatId, message } = action.payload;
            if (!state.messages[chatId]) {
                state.messages[chatId] = [];
            }
            state.messages[chatId].push({
                ...message,
                status: 'received',
            });
        },
        setDirectChatLoading: (state, action) => {
            state.loading = action.payload;
        },
        setDirectChatError: (state, action) => {
            state.error = action.payload;
        },
        clearDirectChat: (state, action) => {
            const chatId = action.payload;
            state.messages[chatId] = [];
            state.unreadCount[chatId] = 0;
        },
    },
});

export const {
    sendDirectMessage,
    updateMessageStatus,
    setUserOnlineStatus,
    incrementUnreadCount,
    clearUnreadCount,
    receiveDirectMessage,
    setDirectChatLoading,
    setDirectChatError,
    clearDirectChat,
} = directChatSlice.actions;

export default directChatSlice.reducer;