
import { Container, Heading, Input, VStack, FormLabel, Box, Button, Avatar } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaFileUpload } from 'react-icons/fa'
import { Link } from 'react-router-dom'
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
const Register = () => {
    const [image, setImage] = useState("")
    const fileUploadHandler = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        }
    }
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const [ name, setName] = useState("")
    const [imagePrev, setImagePrev] = useState("")
  return <Container padding={"5"} >
    <VStack h={"full"} justifyContent={"center"} spacing={"10"} >

        <Heading paddingTop={"8"} textTransform={"uppercase"} children="Registration" />

        <form style={{width: "100%"}} >
            <Box display={"flex"}   justifyContent={"center"} my={"4"}  >
                <Avatar src={imagePrev} size={"2xl"} />
            </Box>
            <Box my={"4"} >
                <FormLabel htmlFor="name" children="Enter your name" />
                <Input required type='text' id='name' value={name} placeholder='abc' onChange={ e => setName(e.target.value) } focusBorderColor='cyan' />
            </Box>
            <Box my={"4"} >
                <FormLabel htmlFor="email" children="Email Address" />
                <Input type='email' required id='email' value={email} placeholder='abc@gmail.com' onChange={ e => setEmail(e.target.value) } focusBorderColor='cyan' />
            </Box>
            <Box my={"4"} >
                <FormLabel htmlFor="password" children="Password" />
                <Input required id='password'  placeholder="Enter your password" value={password}  onChange={ e => setPassword(e.target.value) } type='password' focusBorderColor='cyan' />
            </Box>
            <Box my={"4"} >
                <FormLabel htmlFor="chooseAvatar" children="Choose Avatar" />
                <Input accept='image/*' height={"-moz-max-content"} padding={"3"} value={image} css={fileUploadStyle} onChange={fileUploadHandler} type='file' required id='chooseAvatar'   focusBorderColor='cyan' />
            </Box>
            
            
            <Button width={["100%", "auto"]} my={"4"} colorScheme='cyan' type='submit' >Sign Up</Button>

            <Box my={"4"} >
                Already registered? <Link to={"/login"} >
                    <Button   size='sm' color='cyan' variant={"ghost"} >Login</Button>
                    here!
                </Link>
            </Box>
        </form>

    </VStack>
  </Container>
}


export default Register
