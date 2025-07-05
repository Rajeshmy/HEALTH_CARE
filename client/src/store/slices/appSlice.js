import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        isLoading: false
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload.isLoading
        },
    }
});

export const { setIsLoading } = appSlice.actions;

export default appSlice.reducer;