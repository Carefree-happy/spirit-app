import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const characterChatSlice = createSlice({
    name: "characterChat",
    initialState: {
        messages: [],
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
            // 保存消息到本地存储
            saveMessagesToStorage(state.messages);
        }
    },
});

export const { setMessages, addMessage } = characterChatSlice.actions;

// 保存消息到本地存储
const saveMessagesToStorage = async (messages) => {
    try {
        await AsyncStorage.setItem('chat_messages', JSON.stringify(messages));
    } catch (error) {
        console.error('Error saving messages:', error);
    }
};

// 从本地存储加载消息
export const loadMessagesFromStorage = () => async (dispatch) => {
    try {
        const messagesString = await AsyncStorage.getItem('chat_messages');
        if (messagesString) {
            const messages = JSON.parse(messagesString);
            dispatch(setMessages(messages));
        }
    } catch (error) {
        console.error('Error loading messages:', error);
    }
};

// 清除本地存储的消息
export const clearMessagesFromStorage = async () => {
    try {
        await AsyncStorage.removeItem('chat_messages');
    } catch (error) {
        console.error('Error clearing messages:', error);
    }
};

export default characterChatSlice.reducer;
