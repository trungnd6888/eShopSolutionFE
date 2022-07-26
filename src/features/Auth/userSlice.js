import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userApi from '../../api/UserApi';
import { STORAGE_CONST } from '../../constants/common';

export const login = createAsyncThunk(
    'user/login',
    async (payload) => {
        const data = await userApi.login(payload);

        localStorage.setItem(STORAGE_CONST.USER, JSON.stringify(data.user));
        localStorage.setItem(STORAGE_CONST.TOKEN, data.token);
        return data.user;
    });

export const register = createAsyncThunk(
    'user/register',
    async (payload) => {
        const data = await userApi.register(payload);

        localStorage.setItem(STORAGE_CONST.USER, JSON.stringify(data.user));
        localStorage.setItem(STORAGE_CONST.TOKEN, data.token);
        return data.user;
    });

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(STORAGE_CONST.USER)),
        setting: {},
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem(STORAGE.USER);
            localStorage.removeItem(STORAGE.TOKEN);
            state.current = {};
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.current = action.payload;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.current = action.payload;
            })
    }
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;