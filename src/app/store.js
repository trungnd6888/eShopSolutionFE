import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from '../features/Auth/snackbarSlice';
import userReducer from '../features/Auth/userSlice';
import drawerReducer from '../layouts/drawerSlice';

const rootReducer = {
    user: userReducer,
    snackbar: snackbarReducer,
    drawer: drawerReducer,
};

const store = configureStore({
    reducer: rootReducer
});

export default store;