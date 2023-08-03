import {configureStore} from "@reduxjs/toolkit"
import {profileReducer, userReducer} from "./reducers/userReducer"
import { courseReducer } from "./reducers/courseReducer";
import { adminReducer } from "./reducers/adminReducer";

const store = configureStore({
    reducer:{
        user: userReducer,
        profile: profileReducer,
        course: courseReducer,
        admin: adminReducer,
    }
});

export default store;

export const server = "http://localhost:4000/api/v1";