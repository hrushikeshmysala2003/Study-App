import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, HStack, Heading, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'

import cursor from "../../../assets/images/cursor.png"
import Sidebar from '../Sidebar'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import CourseModal from './CourseModal'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses, getCourseLectures } from '../../../redux/actions/course'
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/admin'
import toast from 'react-hot-toast'

const Row = ({item, courseDetailsHandler, deleteButtonHandler, loading}) => {
    
    return (
        <Tr>
            <Td>#{item._id}</Td>
            <Td>
                <Image src={item.poster.url}  />
            </Td>
            <Td>{item.title}</Td>
            <Td textTransform={"uppercase"} >{item.category}</Td>
            <Td>{item.createdBy}</Td>
            <Td isNumeric >{item.views}</Td>
            <Td isNumeric >{item.numOfVideos}</Td>

            <Td isNumeric >
                <HStack justifyContent={"flex-end"} >
                    <Button onClick={() => {
                        courseDetailsHandler(item._id, item.title)
                    }} variant={"outline"} color={"purple.500"}>View Lectures</Button>
                    <Button isLoading={loading} onClick={() => {
                        deleteButtonHandler(item._id)
                    }} ><RiDeleteBin7Fill /></Button>
                </HStack>
            </Td>
        </Tr>
    )
}
const AdminCourses = () => {
    const dispatch = useDispatch();
    const [courseId, setCourseId] = useState("")
    const [courseTitle, setCourseTitle] = useState("")
    const {isOpen, onClose, onOpen} = useDisclosure()
    const courseDetailsHandler = (id, title) => {
        setCourseTitle(title)
        setCourseId(id);
        dispatch(getCourseLectures(id))
        onOpen();
        
    }
    const deleteButtonHandler = (id) => {
        dispatch(deleteCourse(id))
    }
    const deleteLectureButtonHandler = async (courseId, lectureId) => {
        await dispatch(deleteLecture(courseId, lectureId))
        dispatch(getCourseLectures(courseId));
    }
    const addLectureHandler = async (e, courseId, title, description, video) => {
        e.preventDefault();

        const myform = new FormData();

        myform.append("title", title);
        myform.append("description", description);
        myform.append("file", video)

        await dispatch(addLecture(courseId, myform))
        dispatch(getCourseLectures(courseId));
    }
    const {courses, lectures} = useSelector(state => state.course)

    const {loading, message, error } = useSelector(state => state.admin)
    useEffect(() => {
        dispatch(getAllCourses());
    }, [dispatch])
    useEffect(() => {
        dispatch(getAllCourses());
        if(message){
            toast.success(message);
            dispatch({type: "clearMessage"})
        }
        if(error){
            toast.error(error);
            dispatch({type: "clearError"})
        }
    }, [dispatch, loading, message, error])
    
  return (
    <Grid css={{cursor: `url(${cursor}), default`}} minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]} >
        <Box p={["0", "14"]} overflowX={"auto"} >
            <Heading py={"8"} textTransform={"uppercase"} children="All Courses" textAlign={["center", "left"]} />

            <TableContainer w={["100vw", "full"]} >
                <Table variant={"simple"} size={"lg"} >
                    <TableCaption >All available courses in the database</TableCaption>
                    <Thead >
                        <Tr>
                            <Th>Id</Th>
                            <Th>Poster</Th>
                            <Th>Title</Th>
                            <Th>Category</Th>
                            <Th>Creator</Th>
                            <Th isNumeric >Views</Th>
                            <Th isNumeric >Lectures</Th>
                            <Th isNumeric >Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            courses.map((item) => (
                                <Row loading={loading} courseDetailsHandler={courseDetailsHandler} deleteButtonHandler={deleteButtonHandler}  key={item._id} item={item} />
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
            <CourseModal loading={loading} lectures={lectures} courseTitle={courseTitle} isOpen={isOpen} id={courseId} addLectureHandler={addLectureHandler} deleteButtonHandler={deleteLectureButtonHandler} onClose={onClose} />
        </Box>
        <Sidebar />
    </Grid>
  )
}




export default AdminCourses
