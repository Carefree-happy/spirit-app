import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLoading: false,
        error: null
    },
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// 模拟登录请求
export const loginUser = (username, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
        // 模拟API请求延迟
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 模拟验证
        if (username === "test" && password === "123456") {
            dispatch(loginSuccess({ username, id: Date.now() }));
            return true;
        } else {
            throw new Error("用户名或密码错误");
        }
    } catch (error) {
        dispatch(loginFailure(error.message));
        return false;
    }
};

// 模拟注册请求
export const registerUser = (username, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
        // 模拟API请求延迟
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 模拟注册成功
        dispatch(loginSuccess({ username, id: Date.now() }));
        return true;
    } catch (error) {
        dispatch(loginFailure(error.message));
        return false;
    }
};

export default authSlice.reducer; 