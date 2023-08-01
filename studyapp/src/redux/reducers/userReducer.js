import {createReducer} from "@reduxjs/toolkit"



export const userReducer = createReducer({}, {
    loginRequest : (state) => {
        state.loading=true;
    },
    loginSuccess : (state, action) => {
        state.loading=false;
        state.isAuthenticated=true;
        state.user = action.payload.user;
        state.message = action.payload.message;
    },
    loginFail: (state, action) => {
        state.loading=false;
        state.isAuthenticated=false;
        state.error = action.payload;
    },
    loadUserRequest : (state) => {
        state.loading=true;
    },
    loadUserSuccess : (state, action) => {
        state.loading=false;
        state.isAuthenticated=true;
        state.user = action.payload;
    },
    loadUserFail: (state, action) => {
        state.loading=false;
        state.isAuthenticated=false;
        state.error = action.payload;
    },
    // Above we assigned message and error so will display it and clear as below
    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    }
})