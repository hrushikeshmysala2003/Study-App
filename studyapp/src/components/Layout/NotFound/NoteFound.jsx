import {  Button, Container, Heading,  VStack } from '@chakra-ui/react'
import React from 'react'
import {  RiErrorWarningFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const NoteFound = () => {
  return (
    <Container h={"90vh"} >
        <VStack h="full" justifyContent={"center"} spacing={"4"} >
        <RiErrorWarningFill size={"5rem"} />
            <Heading my={"8"} textAlign={"center"}>Page Not Found</Heading>
            <Link to={"/"}>
                <Button size={"lg"} color={"aqua"} >Go to home</Button>
            </Link>
        </VStack>
    </Container>
  )
}

export default NoteFound
