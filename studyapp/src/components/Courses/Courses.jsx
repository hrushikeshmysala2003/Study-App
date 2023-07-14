import { Container, HStack, Heading, Input, Text, Button, Stack, VStack, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../Home/home.css"
const addToPlayListHandler = () => {
    console.log("Added Playlist")
}
const Course = ({views, title, imageSrc, id, addToPlayListHandler, creator, description, lectureCount}) => {
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
            <Link to={`courses/${id}`} > 
                <Button color={"cyan"} >Watch now</Button>
            </Link>

            <Button variant={"ghost"} colorScheme='cyan
            ' onClick={() => {addToPlayListHandler(id)}}>Add to Playlist</Button>

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
        <Course 
        title={"Sample"}
        description={"Sample"}
        imageSrc={"https://media.istockphoto.com/id/1270632735/photo/model-of-atom-and-elementary-particles-physics-concept-3d-rendered-illustration.jpg?s=2048x2048&w=is&k=20&c=LrAH2gdWQoUPKJXGTg_acHaahHQzhulmFQPPmpBo9s0="} 
        views={23}
        creator={"Sample Boy"}
        id={"sample"}
        lectureCount={2}
        addToPlayListHandler={addToPlayListHandler}
        />
    </Stack>

    </Container>
  )
}

export default Courses
