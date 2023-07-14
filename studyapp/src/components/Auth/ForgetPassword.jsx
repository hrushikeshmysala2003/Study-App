import { Container, Heading, VStack, FormLabel, Input, Box,  Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const ForgetPassword = () => {
    
    const [ email, setEmail] = useState("")
  return <Container h={"95vh"} >
  <VStack h={"full"} justifyContent={"center"} spacing={"16"} >

      <Heading children="Forget Password" />

      <form style={{width: "100%"}} >
          <Box my={"4"} >
              <FormLabel htmlFor="email" children="Email Address" />
              <Input required id='email' value={email} placeholder='abc@gmail.com' onChange={ e => setEmail(e.target.value) } focusBorderColor='cyan' />
          </Box>
          
          <Button width={"100%"} my={"4"} colorScheme='cyan' type='submit' >Send Reset Link</Button>

      </form>

  </VStack>
</Container>
}

export default ForgetPassword
