import { configureStore } from "@reduxjs/toolkit";
import aiChatReducer from "./aiChatSlice";
import groupChatReducer from "./groupChatSlice";
import directChatReducer from "./directChatSlice";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        aiChat: aiChatReducer,
        groupChat: groupChatReducer,
        directChat: directChatReducer,
    },
});

export default store;
