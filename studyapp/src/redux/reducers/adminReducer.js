import { createReducer } from "@reduxjs/toolkit";

export const adminReducer = createReducer({}, {
    getAdminStatsRequest: (state) => {state.loading = true},
    getAdminStatsSuccess: (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.viewsCount = action.payload.viewCount;
        state.subscription = action.payload.subscriptionCount;
        state.usersCount = action.payload.usersCount;
        state.subscriptionPercentage = action.payload.subscriptionPercentage;
        state.viewsPercentage = action.payload.viewsPercentage;
        state.usersPercentage = action.payload.usersPercentage;
        state.subscriptionProfit = action.payload.subscriptionProfit;
        state.viewsProfit = action.payload.viewsProfit;
        state.usersProfit = action.payload.usersProfit;

    },
    getAdminStatsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    getAllUsersRequest: (state) => {state.loading = true},
    getAllUsersSuccess: (state, action) => {
        state.loading = false;
        state.users = action.payload;

    },
    getAllUsersFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    updateUserRoleRequest: (state) => {state.loading = true},
    updateUserRoleSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;

    },
    updateUserRoleFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    deleteUserRequest: (state) => {state.loading = true},
    deleteUserSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;

    },
    deleteUserFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
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