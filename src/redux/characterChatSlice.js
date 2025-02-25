import { createSlice } from "@reduxjs/toolkit";

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
        }
    },
});

export const { setMessages, addMessage } = characterChatSlice.actions;

export const fetchCharacterChat = () => (dispatch) => {
    // 模拟 API 请求
    setTimeout(() => {
        dispatch(setMessages(["Hello!", "How are you?"]));
    }, 1000);
};

export default characterChatSlice.reducer;
