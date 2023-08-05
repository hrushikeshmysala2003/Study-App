import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React, { Children, useEffect, useState } from 'react'
import introVideo from "../../assets/videos/intro.mp4"
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { getCourseLectures } from '../../redux/actions/course'
import Loader from '../Layout/Loader/Loader'
const Coursepage = ({user}) => {
    const dispatch = useDispatch();
    const params = useParams();
    const [lectureNumber, setLectureNumber]=useState(0);
    const {lectures, loading} = useSelector(state => state.course)
    useEffect(() => {
        dispatch(getCourseLectures(params.id))
    }, [dispatch, params.id])

    if(user.role!=="admin"){
        if(user.subscription===undefined){
            return <Navigate to={"/subscribe"} />
        }
        
        
    }

  return loading ? (
    <Loader />
  ) : (
    <Grid  padding={"4"} minH={"90vh"} templateColumns={['1fr', '3fr 1fr']}>
        
            {lectures && lectures.length > 0 ? (
                <>
                <Box>
        <video
        width={"100%"}
        src={lectures[lectureNumber].video.url}
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
                </>
            ):(
                <Heading pt={"16"} textAlign={"center"} h={"full"} w={"full"} color={"white"} children="Lectures have been not added yet" />
            )}
        
        </Grid>
  )
}

export default Coursepage
