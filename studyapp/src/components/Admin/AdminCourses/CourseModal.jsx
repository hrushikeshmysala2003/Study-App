import { Box, Button, Grid, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'

const VideoCard = ({title, description, num, lectureId, courseId, deleteButtonHandler}) => {
    return (
        <Stack direction={["column", "row"]} my="8" borderRadius={"lg"} boxShadow={"0 0 10px rgba(107, 70, 193, 0.5)"} justifyContent={["flex-start", "space-between"]} padding={["4", "8"]} >
            <Box>
                <Heading size={"sm"} children={`#${num} ${title}`} />
                <Text children={description} />
            </Box>

            <Button color={"purple.600"} onClick={() => {
                deleteButtonHandler(courseId, lectureId)
            }} >
                <RiDeleteBin7Fill />
            </Button>
            
        </Stack>
    )
}

const CourseModal = ({isOpen, onClose, id, deleteButtonHandler, courseTitle, addLectureHandler, lectures, loading}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState("");
    const [videoPrev, setVideoPrev] = useState("");
    const fileUploadStyle = {
        "&::file-selector-button": {
            marginRight: "20px",
            border: "none",
            background: "#084cdf",
            padding: "10px 20px",
            borderRadius: "10px",
            color: "#fff",
            cursor: "pointer"
          },
          
          "&::file-selector-button:hover": {
            background: "#0d45a5"
          }
    }
    const changeVideoHandler = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setVideoPrev(reader.result);
            setVideo(file);
        }
    }

    const handleClose = () => {
        setTitle("");
        setDescription("");
        setVideo("");
        setVideoPrev("");
        onClose();
    }
  return (
    <Modal scrollBehavior='outside' onClose={handleClose} isOpen={isOpen} size={"full"} >
        <ModalOverlay />
        <ModalContent >

            <ModalHeader>{courseTitle}</ModalHeader>
            <ModalCloseButton onClick={onClose} />

            <ModalBody p="16" >
                <Grid templateColumns={["1fr", "3fr 1fr"]}>
                    <Box px={["8", "16"]} >
                        <Box my="5">
                            <Heading children={courseTitle} />
                            <Heading children={`#${id}`} opacity={0.4} size={"sm"} />
                        </Box>

                        <Heading children={"Lectures"} size="lg" />
                        

                         {
                            lectures?.map((item, index) => (
                                <VideoCard
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    num={index+1}
                                    lectureId={item._id}
                                    courseId={id}
                                    deleteButtonHandler={deleteButtonHandler}
                                />
                            ))
                         }
                    </Box>

                    <Box >
                        <form onSubmit={e => addLectureHandler(e, id, title, description, video)} >
                            <VStack spacing={"4"} >
                                <Heading children="Add Lecture" size="md" textTransform={"uppercse"} />
                                <Input focusBorderColor='purple.500' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />

                                <Input focusBorderColor='purple.500' placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)} />

                                <Input accept='video/mp4' height={"-moz-max-content"} css={fileUploadStyle} onChange={changeVideoHandler} type='file' required focusBorderColor='purple.300' />

                                {
                                    videoPrev && (
                                        <video src={videoPrev} controlsList='nodownload' controls  ></video>
                                    )
                                }

                                <Button isLoading={loading} w="full" color={"purple.600"} type='submit'>Upload</Button>
                            </VStack>
                        </form>
                    </Box>


                </Grid>


            </ModalBody>

            <ModalFooter>
                <Button onClick={handleClose} >Close</Button>
            </ModalFooter>

        </ModalContent>

    </Modal>
  )
}

export default CourseModal
