import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 模拟API调用延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟历史消息数据
const mockHistoryMessages = {
  'group1': [
    {
      id: 1,
      text: '大家好！',
      senderId: 'user1',
      senderName: '用户1',
      timestamp: '2024-03-20T10:00:00.000Z',
    },
    {
      id: 2,
      text: '你好啊！',
      senderId: 'user2',
      senderName: '用户2',
      timestamp: '2024-03-20T10:01:00.000Z',
    },
  ]
};

// 异步加载消息
export const fetchGroupMessages = createAsyncThunk(
  'groupChat/fetchMessages',
  async (groupId) => {
    await delay(1000); // 模拟网络延迟
    return mockHistoryMessages[groupId] || [];
  }
);

// 异步发送消息
export const sendGroupMessageAsync = createAsyncThunk(
  'groupChat/sendMessage',
  async ({ groupId, message }) => {
    await delay(500); // 模拟网络延迟
    return {
      ...message,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };
  }
);

const initialState = {
  messages: {},  // 按群组ID分组的消息
  participants: {},  // 群组成员信息
  typing: {},  // 正在输入的用户
  loading: false,
  error: null,
};

const groupChatSlice = createSlice({
  name: 'groupChat',
  initialState,
  reducers: {
    sendGroupMessage: (state, action) => {
      const { groupId, message } = action.payload;
      if (!state.messages[groupId]) {
        state.messages[groupId] = [];
      }
      state.messages[groupId].push({
        ...message,
        id: Date.now(),
        timestamp: new Date().toISOString(),
      });
    },
    setParticipants: (state, action) => {
      const { groupId, participants } = action.payload;
      state.participants[groupId] = participants;
    },
    setTypingStatus: (state, action) => {
      const { groupId, userId, isTyping } = action.payload;
      if (!state.typing[groupId]) {
        state.typing[groupId] = {};
      }
      if (isTyping) {
        state.typing[groupId][userId] = true;
      } else {
        delete state.typing[groupId][userId];
      }
    },
    receiveGroupMessage: (state, action) => {
      const { groupId, message } = action.payload;
      if (!state.messages[groupId]) {
        state.messages[groupId] = [];
      }
      state.messages[groupId].push(message);
    },
    setGroupLoading: (state, action) => {
      state.loading = action.payload;
    },
    setGroupError: (state, action) => {
      state.error = action.payload;
    },
    clearGroupChat: (state, action) => {
      const groupId = action.payload;
      state.messages[groupId] = [];
      state.typing[groupId] = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupMessages.fulfilled, (state, action) => {
        const groupId = action.meta.arg;
        state.messages[groupId] = action.payload;
        state.loading = false;
      })
      .addCase(fetchGroupMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(sendGroupMessageAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendGroupMessageAsync.fulfilled, (state, action) => {
        const groupId = action.meta.arg.groupId;
        if (!state.messages[groupId]) {
          state.messages[groupId] = [];
        }
        state.messages[groupId].push(action.payload);
        state.loading = false;
      })
      .addCase(sendGroupMessageAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  sendGroupMessage,
  setParticipants,
  setTypingStatus,
  receiveGroupMessage,
  setGroupLoading,
  setGroupError,
  clearGroupChat,
} = groupChatSlice.actions;

export default groupChatSlice.reducer; 