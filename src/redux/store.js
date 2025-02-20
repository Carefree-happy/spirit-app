import { configureStore } from "@reduxjs/toolkit";
import characterChatReducer from "./characterChatSlice";

const store = configureStore({
    reducer: {
        characterChat: characterChatReducer,
    },
});

export default store;
