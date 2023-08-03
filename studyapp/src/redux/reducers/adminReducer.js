import { createReducer } from "@reduxjs/toolkit";

export const adminReducer = createReducer({}, {
    createcourseRequest: (state) => {state.loading = true},
    createcourseSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;

    },
    createcourseFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },
})