import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { Link, useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {
    const refernce = useSearchParams()[0].get("reference")
  return (
    <Container h={"90vh"} p="16">
        <Heading my={"8"} textAlign={"center"}>You have a Pro Pack</Heading>
        <VStack boxShadow={"lg"} pb="16" alignItems={"center"} borderRadius={"lg"} >
            <Box w={"full"} bg={"aqua"} p="4" css={{borderRadius: "8px 8px 0 0"}} >
                <Text color={"black"}>Payment success</Text>
            </Box>

            <Box p="4">
                <VStack textAlign={"center"} px="8" mt={"4"} spacing={"8"} >
                    <Text>
                        Congratulations you are a pro member. You ahve access to premium content
                    </Text>

                    <Heading size={"4xl"} >
                        <RiCheckboxCircleFill />
                    </Heading>
                </VStack>
            </Box>

            <Link to={"/profile"}>
                <Button size={"lg"} color={"aqua"} >Go to profile</Button>

            </Link>

            <Heading size={"xs"}  >
                Reference: {refernce}
            </Heading>
        </VStack>
    </Container>
  )
}

export default PaymentSuccess
