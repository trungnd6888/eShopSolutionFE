import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        status: false,
        message: '',
        type: 'success',
    },
    reducers: {
        open: (state, action) => {
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.type = action.payload.type;
        }
    }
});

const { actions, reducer } = snackbarSlice;
export const { open } = actions;
export default reducer;