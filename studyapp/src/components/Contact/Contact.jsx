import { Box, Container, Button,  FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ message, setMessage ] = useState("");
  return (
    <Container h="92vh" >
    <VStack h="full" justifyContent={"center"} spacing={"16"} >
        <Heading children="Contact Us"  />
        <form style={{width: "100%"}} >
            <Box my={"4"} >
                <FormLabel htmlFor="name" children="Name" />
                <Input required id='name' value={name}  placeholder='Name....'  onChange={ e => setName(e.target.value) } focusBorderColor='cyan' />
            </Box>
            <Box my={"4"} >
                <FormLabel htmlFor="email" children="Email Address" />
                <Input required id='email' value={email} placeholder='abc@gmail.com' onChange={ e => setEmail(e.target.value) } focusBorderColor='cyan' />
            </Box>
            <Box my={"4"} >
                <FormLabel htmlFor="message" children="Enter Message" />
                <Input required id='message' value={message} placeholder='Message...' onChange={ e => setMessage(e.target.value) } focusBorderColor='cyan' />
            </Box>
            
            <Button width={["100%", "auto"]} my={"4"} colorScheme='cyan' type='submit' >Send Mail</Button>

            <Box my={"4"} >
                Request for a course? <Link to={"/request"} >
                    <Button   size='sm' color='cyan' variant={"ghost"} >Request here</Button>
                    here!
                </Link>
            </Box>
            
        </form>
    </VStack>
    </Container>
  )
}

export default Contact
