import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        token: ""
    },
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        setToken: (state, action) => {
            state.token = action.payload.token
        },
    }
});

export const { setIsLoggedIn, setToken } = userSlice.actions;

export default userSlice.reducer;