import React from 'react'
import { useState } from 'react';
import { Button, Container, Heading, VStack, Input } from '@chakra-ui/react'

const UpdateProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
  return (
    
    <Container py="16" minH={"90vh"} >
        <form>
            <Heading textTransform={"uppercase"} children="Update Profile" my="16" textAlign={["center", "left"]} />
            <VStack spacing={"8"}>
            <Input id='name'  placeholder="Name" value={name} type='text' onChange={ e => setName(e.target.value) } focusBorderColor='cyan' />
            <Input id='email'  placeholder="Email" value={email} type='email' onChange={ e => setEmail(e.target.value) } focusBorderColor='cyan' />
            <Button w={"full"} color={"aqua"} type='submit' >Update</Button>
            </VStack>
        </form>
    </Container>
  )
}

export default UpdateProfile
