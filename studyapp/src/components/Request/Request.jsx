import { Box, Container, Button,  FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { courseRequest } from '../../redux/actions/other'
import toast from "react-hot-toast"

const Request = () => {
    const dispatch = useDispatch();
    const {loading, message, error} = useSelector(state => state.other)
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ course, setCourse ] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(courseRequest(name, email, course))
        setCourse("")
        setEmail("")
        setName("")
    }
    useEffect(() => {
        if(message){
            toast.success(message);
            dispatch({type: "clearMessage"})
        }
        if(error){
            toast.error(error);
            dispatch({type: "clearError"})
        }
    }, [dispatch, loading, message, error])
  return (
    <Container h="92vh" >
    <VStack h="full" justifyContent={"center"} spacing={"16"} >
        <Heading children="Request New Course"  />
        <form onSubmit={submitHandler} style={{width: "100%"}} >
            <Box my={"4"} >
                <FormLabel htmlFor="name" children="Name" />
                <Input required id='name' value={name}  placeholder='Name....'  onChange={ e => setName(e.target.value) } focusBorderColor='cyan' />
            </Box>
            <Box my={"4"} >
                <FormLabel htmlFor="email" children="Email Address" />
                <Input required id='email' value={email} placeholder='abc@gmail.com' onChange={ e => setEmail(e.target.value) } focusBorderColor='cyan' />
            </Box>
            <Box my={"4"} >
                <FormLabel htmlFor="course" children="Course" />
                <Input required id='course' value={course} placeholder='Explain your course...' onChange={ e => setCourse(e.target.value) } focusBorderColor='cyan' />
            </Box>
            
            <Button width={["100%", "auto"]} my={"4"} colorScheme='cyan' type='submit' >Send Mail</Button>

            <Box my={"4"} >
                See available courses <Link to={"/courses"} >
                    <Button   size='sm' color='cyan' variant={"ghost"} >courses</Button>
                    here!
                </Link>
            </Box>
            
        </form>
    </VStack>
    </Container>
  )
}

export default Request
