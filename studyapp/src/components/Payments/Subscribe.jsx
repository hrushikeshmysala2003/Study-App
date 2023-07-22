import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Subscribe = () => {
  return <Container  p="16"  >
    <Heading children="Welcome" my="8" textAlign={"Center"} />

    <VStack 
    boxShadow={"lg"}
    alignItems="strech"
    borderRadius={"lg"}
    spacing={"8"}
    >
        <Box bg={"aqua"} p={"4"} css={{borderRadius: "8px 8px 0 0"}} >
            <Text color={"black"} children={`Pro Pack - 299.00`} />
        </Box>
        <Box p="4" >
            <VStack textAlign={"center"} paddingX={"8"} mt={"4"} spacing={"8"} >
                <Text children={"Join Pro Pack and Get Access to all content."} />
                <Heading size={"md"} children={"299 Only"} />
            </VStack>

            <Button my="8"  w={"full"} color={'red'}   >Buy Now</Button>
        </Box>

        <Box bg={"aqua"} p={"4"} css={{ borderRadius: "0 0 8px 8px"}} >
            <Heading textTransform={"uppercase"} color={"black"} size={"md"} children={"100% refund at camcellation"} />

            <Text fontSize={"xs"} color="aqua" children="Terms and conditions Apply" />
        </Box>
    </VStack>
  </Container>
}

export default Subscribe
