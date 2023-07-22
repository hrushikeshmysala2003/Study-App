import {  Button, Container, Heading,  VStack } from '@chakra-ui/react'
import React from 'react'
import {  RiErrorWarningFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const NoteFound = () => {
  return (
    <Container h={"90vh"} >
        <VStack h="full" justifyContent={"center"} spacing={"4"} >
        <RiErrorWarningFill size={"5rem"} />
            <Heading textTransform={"uppercase"} my={"8"} textAlign={"center"}>Payment Failed</Heading>
            <Link to={"/subscribe"}>
                <Button size={"lg"} color={"aqua"} >Try Again</Button>
            </Link>
        </VStack>
    </Container>
  )
}

export default NoteFound
