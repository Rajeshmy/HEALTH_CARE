import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import appReducer from "./slices/appSlice"


const rootReducer = combineReducers({
    user: userReducer,
    appState: appReducer

});

export default rootReducer;