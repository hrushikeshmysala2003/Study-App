import { Container, Heading, VStack, FormLabel, Input, Box,  Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { forgetPassword } from '../../redux/actions/profile';
import toast, { Toaster } from 'react-hot-toast';
const ForgetPassword = () => {
    
    const [ email, setEmail] = useState("");
    const navigate = useNavigate();

    const {loading, message, error} = useSelector(state => state.profile);

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgetPassword(email));
        navigate("/login")
    }

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch({type: "clearError"})
        }
        if(message){
            toast.message(message)
            dispatch({type: "clearMessage"})
        }
    }, [dispatch, error, message])
  return <Container h={"95vh"} >
  <VStack h={"full"} justifyContent={"center"} spacing={"16"} >

      <Heading children="Forget Password" />

      <form  onSubmit={submitHandler} style={{width: "100%"}} >
          <Box my={"4"} >
              <FormLabel htmlFor="email" children="Email Address" />
              <Input required id='email' value={email} placeholder='abc@gmail.com' onChange={ e => setEmail(e.target.value) } focusBorderColor='cyan' />
          </Box>
          
          <Button isLoading={loading} width={"100%"} my={"4"} colorScheme='cyan' type='submit' >Send Reset Link</Button>

      </form>

  </VStack>
  <Toaster />
</Container>
}

export default ForgetPassword
