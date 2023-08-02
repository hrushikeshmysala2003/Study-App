import React from 'react'
import { useState } from 'react';
import { Button, Container, Heading, VStack, Input } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux"
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';
const UpdateProfile = ({user}) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector(state=>state.profile)
    const submitHandler = async (e) => {
      e.preventDefault();

      await dispatch(updateProfile(name, email));
      dispatch(loadUser());
      navigate("/profile");
    }
  return (
    
    <Container py="16" minH={"90vh"} >
        <form onSubmit={submitHandler} >
            <Heading textTransform={"uppercase"} children="Update Profile" my="16" textAlign={["center", "left"]} />
            <VStack spacing={"8"}>
            <Input id='name'  placeholder="Name" value={name} type='text' onChange={ e => setName(e.target.value) } focusBorderColor='cyan' />
            <Input id='email'  placeholder="Email" value={email} type='email' onChange={ e => setEmail(e.target.value) } focusBorderColor='cyan' />
            <Button isLoading={loading} w={"full"} color={"aqua"} type='submit' >Update</Button>
            </VStack>
        </form> 
    </Container>
  )
}

export default UpdateProfile
