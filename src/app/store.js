import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from '../features/Auth/snackbarSlice';
import authReducer from '../features/Auth/authSlice';
import drawerReducer from '../layouts/drawerSlice';

const rootReducer = {
    auth: authReducer,
    snackbar: snackbarReducer,
    drawer: drawerReducer,
};

const store = configureStore({
    reducer: rootReducer
});

export default store;