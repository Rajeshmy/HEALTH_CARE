import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        token: "",
        userDetails: {
            name: '',
            email: '',
            role: ''
        }
    },
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        setToken: (state, action) => {
            state.token = action.payload.token
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload.userDetails
        },
    }
});

export const { setIsLoggedIn, setToken, setUserDetails } = userSlice.actions;

export default userSlice.reducer;