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
    deletecourseRequest: (state) => {state.loading = true},
    deletecourseSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;

    },
    deletecourseFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    deleteLectureRequest: (state) => {state.loading = true},
    deleteLectureSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;

    },
    deleteLectureFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addLectureRequest: (state) => {state.loading = true},
    addLectureSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    addLectureFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    
})