import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userApi from '../../api/userApi';
import { STORAGE_CONST } from '../../constants/common';
import jwtDecode from 'jwt-decode';

export const login = createAsyncThunk(
    'user/login',
    async (payload) => {
        const data = await userApi.login(payload);
        const token = data;
        const user = jwtDecode(token);

        localStorage.setItem(STORAGE_CONST.USER, JSON.stringify(user));
        localStorage.setItem(STORAGE_CONST.TOKEN, token);
        return user;
    });

export const register = createAsyncThunk(
    'user/register',
    async (payload) => {
        const data = await userApi.register(payload);
        return data.user;
    });

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(STORAGE_CONST.USER)),
        setting: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem(STORAGE_CONST.USER);
            localStorage.removeItem(STORAGE_CONST.TOKEN);
            state.current = null;
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