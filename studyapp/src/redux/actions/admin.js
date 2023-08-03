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


export const deleteCourse = (id) => async (dispatch) => {
    try {
        dispatch({type: "deletecourseRequest"});

        const {data} = await axios.delete(`${server}/course/${id}`, {
            
            withCredentials: true
        })

        dispatch({type: "deletecourseSuccess", payload: data.message})
    } catch (error) {
        dispatch({type: "deletecourseFail", payload: error.response.data.message })
    }
}

export const addLecture = (id, formdata) => async (dispatch) => {
    try {
        dispatch({type: "addLectureRequest"});

        const {data} = await axios.post(`${server}/course/${id}`,formdata, {
            headers: {
                "Content-Type" : "multipart/form-data"
            },
            withCredentials: true
        })

        dispatch({type: "addLectureSuccess", payload: data.message})
    } catch (error) {
        dispatch({type: "addLectureFail", payload: error.response.data.message })
    }
}

export const deleteLecture = (courseId, lectureId) => async (dispatch) => {
    try {
        dispatch({type: "deleteLectureRequest"});

        const {data} = await axios.delete(`${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`, {
            
            withCredentials: true
        })

        dispatch({type: "deleteLectureSuccess", payload: data.message})
    } catch (error) {
        dispatch({type: "deleteLectureFail", payload: error.response.data.message })
    }
}