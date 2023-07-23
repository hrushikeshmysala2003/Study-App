import React, { useState } from 'react'
import {  Button, Container, Grid, Heading, Image, Input, Select, VStack } from '@chakra-ui/react'

import cursor from "../../../assets/images/cursor.png"
import Sidebar from '../Sidebar'
const CreateCourse = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [category, setCategory] = useState("")
    const [createdBy, setCreatedBy] = useState("")
    const [imagePrev, setImagePrev] = useState("")

    const categories = [
        "Web Development", "Artificial Intelligence", "Data Structure and Algorithms",
        "App Development", "Data Science", "Game Development"
    ]
    const changeImageHandler = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        }
    }
    const fileUploadStyle = {
        "&::file-selector-button": {
            marginRight: "20px",
            border: "none",
            background: "#084cdf",
            padding: "10px 20px",
            borderRadius: "10px",
            color: "#fff",
            cursor: "pointer"
          },
          
          "&::file-selector-button:hover": {
            background: "#0d45a5"
          }
    }
  return (
    <Grid css={{cursor: `url(${cursor}), default`}} minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]} >
        <Container py={"16"}>
            <Heading py={"8"} textTransform={"uppercase"} children="Create Course" textAlign={["center", "left"]} />
                <VStack  spacing={"8"}  >

                <Input required placeholder="Title" value={title} type='text' onChange={ e => setTitle(e.target.value) } focusBorderColor='purple.300' />

                <Input required placeholder="Description" value={description} type='text' onChange={ e => setDescription(e.target.value) } focusBorderColor='purple.300' />
                <Input required placeholder="created By" value={createdBy} type='text' onChange={ e => setCreatedBy(e.target.value) } focusBorderColor='purple.300' />
                <Select required focusBorderColor='purple.300' value={category} onChange={ e => setCategory(e.target.value) } >
                    <option value="category">Category</option>

                    {categories.map((item) => (
                        <option key={item} value={item} >{item}</option>
                    ))}
                </Select>
                <Input accept='image/*' height={"-moz-max-content"} css={fileUploadStyle} onChange={changeImageHandler} type='file' required focusBorderColor='purple.300' />

                {imagePrev && (
                    <Image src={imagePrev} boxSize={"64"} objectFit={"contain"} />
                )}

                <Button w="full" variant={"ghost"} color='purple' type='submit' >
                    Submit
                </Button>
                </VStack>
            
        </Container>
        <Sidebar />
    </Grid>
  )
}

export default CreateCourse
