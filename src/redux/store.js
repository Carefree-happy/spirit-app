import { configureStore } from "@reduxjs/toolkit";
import characterChatReducer from "./characterChatSlice";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        characterChat: characterChatReducer,
        auth: authReducer,
    },
});

export default store;
