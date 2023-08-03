import {server} from "../store";
import axios from "axios";

export const createCourse = (formdata) => async (dispatch) => {
    try {
        dispatch({type: "createcourseRequest"});

        const {data} = await axios.post(`${server}/createcourse`, formdata, {
            headers: {
                "Content-type": "multipart/form-data"
            },
            withCredentials: true
        })

        dispatch({type: "createcourseSuccess", payload: data.message})
    } catch (error) {
        dispatch({type: "createcourseFail", payload: error.response.data.message })
    }
}