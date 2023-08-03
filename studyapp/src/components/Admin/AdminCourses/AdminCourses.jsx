import React, { useEffect } from 'react'
import { Box, Button, Grid, HStack, Heading, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'

import cursor from "../../../assets/images/cursor.png"
import Sidebar from '../Sidebar'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import CourseModal from './CourseModal'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../../redux/actions/course'

const Row = ({item, courseDetailsHandler, deleteButtonHandler}) => {
    
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
                        courseDetailsHandler(item._id)
                    }} variant={"outline"} color={"purple.500"}>View Lectures</Button>
                    <Button onClick={() => {
                        deleteButtonHandler(item._id)
                    }} ><RiDeleteBin7Fill /></Button>
                </HStack>
            </Td>
        </Tr>
    )
}
const AdminCourses = () => {
    const dispatch = useDispatch();
    const {isOpen, onClose, onOpen} = useDisclosure()
    const courseDetailsHandler = (userId) => {
        onOpen();
        console.log(userId)
    }
    const deleteButtonHandler = (userId) => {
        console.log(userId)
    }
    const deleteLectureButtonHandler = (courseId, lectureId) => {
        console.log(courseId, lectureId);
    }
    const addLectureHandler = (e, courseId, title, description, video) => {
        e.preventDefault();
    }
    const {courses } = useSelector(state => state.course)

    useEffect(() => {
        dispatch(getAllCourses());
    }, [dispatch])
    
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
                                <Row courseDetailsHandler={courseDetailsHandler} deleteButtonHandler={deleteButtonHandler}  key={item._id} item={item} />
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
            <CourseModal courseTitle="React Course" isOpen={isOpen} id={"dhbcsduhisdnvbj"} addLectureHandler={addLectureHandler} deleteButtonHandler={deleteLectureButtonHandler} onClose={onClose} />
        </Box>
        <Sidebar />
    </Grid>
  )
}




export default AdminCourses
