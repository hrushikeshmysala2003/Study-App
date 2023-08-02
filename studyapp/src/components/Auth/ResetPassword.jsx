import { Container, Heading, VStack, FormLabel, Input, Box,  Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../../redux/actions/profile'
import { useDispatch, useSelector } from 'react-redux'
import toast  from 'react-hot-toast'

const ResetPassword = () => {
    const params = useParams()
    const [ password, setPassword] = useState("");
    const navigate = useNavigate();

    const {loading, message, error} = useSelector(state => state.profile);

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(params.token, password));
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

      <Heading children="Reset Password" />

      <form onSubmit={submitHandler} style={{width: "100%"}} >
       
        <Box my={"4"} >
            <FormLabel htmlFor="password" children="Enter New Password" />
            <Input type='password' required id='password' value={password} placeholder='Enter Your password' onChange={ e => setPassword(e.target.value) } focusBorderColor='cyan' />
        </Box>

          
          
          <Button isLoading={loading} width={"100%"} my={"4"} colorScheme='cyan' type='submit' >Reset Password</Button>

      </form>

  </VStack>
</Container>
}


export default ResetPassword
