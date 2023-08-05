import React from 'react'
import { Heading, Stack, VStack, Text, Button, Image, Box, HStack, useColorMode } from '@chakra-ui/react';
import "./home.css"
import { Link } from 'react-router-dom';
import vg from "../../assets/images/bg3.jfif"
import { CgGoogle, CgYoutube } from "react-icons/cg"
import {SiCoursera, SiUdemy} from "react-icons/si"
import {DiAws} from "react-icons/di"
// import introVideo from "../../assets/videos/intro.mp4"
const Home = () => {
  return <section className='home' >
    
    <div className="container" style={{paddingTop: "4"}} >
        <Stack 
        className='stack'
        direction={["column", "row"]}
        height={"100%"}
        justifyContent={["center", "space-between"]}
        alignItems={"center"}
        spacing={['16', '56']}
        >
            <VStack marginTop={10} width={'full'} spacing={"5"} alignItems={["center", "flex-end"]}>
                <Heading children="LEARN MORE FROM EXPERTS" size={'2xl'} />
                <Text fontSize={"2xl"} fontFamily="cursive" textAlign={["center", "left"]} children="Find Valuable content At Reasonable Price" />
                <Link to="/courses" >
                    <Button size={"lg"} color={"aqua"} >
                        Explore Now
                    </Button>
                </Link>
            </VStack>

            <Image  className='vector-graphics' src={vg} objectFit={"contain"}  boxSize="md" borderRadius="full" />
        </Stack>
    </div>

    <Box padding={"8"} bg={"#526D82"}>
        <Heading textAlign={"center"} fontFamily={"body"} color={"#00ffff"} children="OUR BRANDS" />

        <HStack className='brandsBanner' justifyContent={"space-evenly"} >
            <CgGoogle />
            <CgYoutube />
            <SiCoursera />
            <SiUdemy />
            <DiAws />
        </HStack>

    </Box>

    <div className="container2">
        <video
        src={"https://res.cloudinary.com/dwna7axtx/video/upload/v1691219098/intro_qybxye.mp4"}
        autoPlay={true}
        controls={true}
        controlsList='nodownload nofullscreen noremoteplay'
        disablePictureInPicture={true}
        disableRemotePlayback={true}
        ></video>
        
    </div> 
  </section>
};

export default Home;
