import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import {TiSocialYoutubeCircular, TiSocialInstagramCircular, TiSocialGithubCircular} from "react-icons/ti"
const Footer = () => {
  return <Box  padding={"4"} bg={'#65849b'} minH={"10vh"}  >
    <Stack direction={["column", 'row']} >
        <VStack alignItems={["center" , "flex-start"]} width={"full"} >
            <Heading children="All Rights Reserved" color={"#424242"} />
            <Heading children="@Rushi Programmer" fontSize={"2xl"} colorScheme={"cyan"} />
        </VStack>

        <HStack spacing={["2", "10"]} fontSize={"50"} justifyContent={"center"} >
            <a href="https://youtube.com" target='_blank'>
                <TiSocialYoutubeCircular />
            </a>
            <a href="https://youtube.com" target='_blank'>
                <TiSocialInstagramCircular />
            </a>
            <a href="https://youtube.com" target='_blank'>
                <TiSocialGithubCircular />
            </a>
        </HStack>

    </Stack>
  </Box>
}

export default Footer
