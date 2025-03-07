import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: {},  // 按chatId分组的消息
  loading: false,
  error: null,
};

const aiChatSlice = createSlice({
  name: 'aiChat',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      const { chatId, message } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      state.messages[chatId].push(message);
    },
    receiveAIResponse: (state, action) => {
      const { chatId, response } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      state.messages[chatId].push({
        id: Date.now(),
        text: response,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      });
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearMessages: (state, action) => {
      const chatId = action.payload;
      state.messages[chatId] = [];
    },
  },
});

export const { 
  sendMessage, 
  receiveAIResponse, 
  setLoading, 
  setError, 
  clearMessages 
} = aiChatSlice.actions;

export default aiChatSlice.reducer; 