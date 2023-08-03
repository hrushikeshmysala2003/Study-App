import { Container, HStack, Heading, Input, Text, Button, Stack, VStack, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../Home/home.css"
import {useDispatch, useSelector} from "react-redux"
import { getAllCourses } from '../../redux/actions/course'
import toast from "react-hot-toast"
import {addToPlaylist} from "../../redux/actions/profile"
import { loadUser } from '../../redux/actions/user'



const Course = ({views, title, imageSrc, id, addToPlayListHandler, creator, description, lectureCount, loading}) => {
    
  return (
    <VStack className='course' alignItems={["center", "flex-start"]} >
        <Image src={imageSrc} boxSize="60" objectFit={"contain"} />
        <Heading textAlign={["center", "left"]} maxW={"200px"} children={title} size={"sm"} fontFamily={'sans-serif'}  />
        <Text  children={description} noOfLines={2} />

        <HStack>
            <Text fontWeight={'bold'} textTransform={"uppercase"} children={"Creator : "} />
            <Text fontFamily={'body'} textTransform={"uppercase"} children={creator} />
        </HStack>

        <Heading textAlign={"center"} size={"xs"} children={`Lectures - ${lectureCount}`} />
        <Heading textAlign={"center"} size={"xs"} textTransform={"uppercase"} children={`Views - ${views}`} />

        <Stack direction={["column", "row"]} alignItems={"center"} > 
            <Link to={`/course/${id}`} > 
                <Button color={"cyan"} >Watch now</Button>
            </Link>

            <Button variant={"ghost"} colorScheme='cyan' isLoading={loading}
             onClick={() => {addToPlayListHandler(id)}}>Add to Playlist</Button> 

        </Stack>
    </VStack>
  )
}





const Courses = () => {
    const [ keyword, setKeyword ] = useState("");
    const [category, setCategory ] = useState("");

    const categories = [
        "Web Development", "Artificial Intelligence", "Data Structure and Algorithms",
        "App Development", "Data Science", "Game Development"
    ]

    const {loading, courses, error, message} = useSelector(state => state.course)

    const dispatch = useDispatch();
    const addToPlayListHandler = async (id) => {
        await dispatch(addToPlaylist(id));
        dispatch(loadUser());
    }
    useEffect(() => {
        dispatch(getAllCourses(category, keyword));

        if(error){
            toast.error(error, {
                duration: 4000,
            })
            dispatch({type: "clearError"})
        }
        if(message){
            toast.success(message, {
                duration: 8000,
                position: 'top-center'
            })
            dispatch({type: "clearMessage"})
        }
    }, [category, keyword, error, message,dispatch])

  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'} >

    <Heading paddingTop={"4"} children="All Courses" m={"8"} />
    <Input value={keyword} onChange={ e => setKeyword(e.target.value) } placeholder='Seacrch a course...' type='text' focusBorderColor='cyan'  />

    <HStack overflowX={"auto"} paddingY={"8"} css={{"&::-webkit-scrollbar": {display: "none"}}} >
    {
        categories.map( (item, index) => (
            <Button key={index} onClick={() => setCategory(item)} minW={"60"} >
                <Text  children={item} />
            </Button>
        ) )
    }
    </HStack>

    <Stack direction={["column", "row"]} flexWrap={"wrap"} justifyContent={["flex-start", "space-evenly"]} alignItems={["center", "flex-start"]} >
        {
            courses.length > 0 ? (courses.map((item) => (
                <Course 
                key={item._id}
                title={item.title}
                description={item.description}
                imageSrc={item.poster.url} 
                views={item.views}
                creator={item.createdBy}
                id={item._id}
                lectureCount={item.numOfVideos}
                addToPlayListHandler={addToPlayListHandler}
                loading={loading}
                />
            ))) : (
                <Heading mt={"4"} opacity={0.5} children="Course Not Found" />
            )
        }
    </Stack>

    </Container>
  )
}

export default Courses
