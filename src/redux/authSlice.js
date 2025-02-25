import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadUserFromStorage = () => {
    try {
        // 检查是否在浏览器环境
        if (typeof window !== 'undefined' && window.localStorage) {
            const serializedUser = localStorage.getItem('user');
            if (serializedUser === null) {
                return { type: 'auth/loadUser', payload: null };
            }
            return { type: 'auth/loadUser', payload: JSON.parse(serializedUser) };
        }
        return { type: 'auth/loadUser', payload: null };
    } catch (err) {
        console.error('Error loading user from storage:', err);
        return { type: 'auth/loadUser', payload: null };
    }
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: true,
        error: null
    },
    reducers: {
        loadUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.loading = false;
        },
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.error = null;
            state.loading = false;
        });
    }
});

export const { loadUser, loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

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

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch }) => {
        // 清除本地存储的用户信息
        await AsyncStorage.removeItem('user');
        return null;
    }
);

export default authSlice.reducer; 