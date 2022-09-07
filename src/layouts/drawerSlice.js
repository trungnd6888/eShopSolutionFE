import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
    name: 'drawer',
    initialState: false,
    reducers: {
        openDrawer: (state, action) => state = action.payload,
    }
});

const { actions, reducer } = drawerSlice;
export const { openDrawer } = actions;
export default reducer;