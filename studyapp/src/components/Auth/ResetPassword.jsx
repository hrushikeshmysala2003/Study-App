import { Container, Heading, VStack, FormLabel, Input, Box,  Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ResetPassword = () => {
    const params = useParams()
    console.log(params.token)
    const [ password, setPassword] = useState("")
  return <Container h={"95vh"} >
  <VStack h={"full"} justifyContent={"center"} spacing={"16"} >

      <Heading children="Reset Password" />

      <form style={{width: "100%"}} >
       
        <Box my={"4"} >
            <FormLabel htmlFor="password" children="Enter New Password" />
            <Input type='password' required id='password' value={password} placeholder='Enter Your password' onChange={ e => setPassword(e.target.value) } focusBorderColor='cyan' />
        </Box>

          
          
          <Button width={"100%"} my={"4"} colorScheme='cyan' type='submit' >Reset Password</Button>

      </form>

  </VStack>
</Container>
}


export default ResetPassword
