import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

import introVideo from "../../assets/videos/intro.mp4"
const Coursepage = () => {
    const LectureTitle="LectureTitle";
    const [lectureNumber, setLectureNumber]=useState(0);
    const lectures=[{
        _id: "saddsad",
        title: "Sample1",
        description: "dhbclskdbs",
        video: {
            public_id: "kjsdblks",

        },
    },
        {
            _id: "saddsad",
            title: "Sample2",
            description: "dhbclskdbs",
            video: {
                public_id: "kjsdblks",
    
            },
        },
            {
                _id: "saddsad",
                title: "Sample3",
                description: "dhbclskdbs",
                video: {
                    public_id: "kjsdblks",
        
                },
    }]
  return (
    
        
        <Grid  padding={"4"} minH={"90vh"} templateColumns={['1fr', '3fr 1fr']}>
        <Box>
        <video
        width={"100%"}
        src={introVideo}
        autoPlay={true}
        controls={true}
        controlsList='nodownload noremoteplay'
        disablePictureInPicture={true}
        disableRemotePlayback={true}
        ></video>

        <Heading p={"2"} textAlign={"center"} children={` ${lectureNumber+1}  ${lectures[lectureNumber].title}`} />
        <Heading m="4" children="Description" />


        <Text m="4" children={`${lectures[lectureNumber].description}`} />

        </Box>

        <VStack>
            {
                lectures.map((item, index) => (
                    <button
                    onClick={() => {
                        setLectureNumber(index)
                    }}
                    key={item._id} style={{
                        width:"100%",
                        padding: "1rem",
                        margin: 0,
                        borderRadius: "1px solid rgba(255,255,255,0.2)"
                    }} ><Text>
                        #{index+1} {item.title}
                    </Text> </button>
                ) )
            }
        </VStack>
    </Grid>

    
    
  )
}

export default Coursepage
