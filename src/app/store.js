import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/Auth/userSlice';
import snackbarReducer from '../features/Auth/snackbarSlice';

const rootReducer = {
    user: userReducer,
    snackbar: snackbarReducer
};

const store = configureStore({
    reducer: rootReducer
});

export default store;