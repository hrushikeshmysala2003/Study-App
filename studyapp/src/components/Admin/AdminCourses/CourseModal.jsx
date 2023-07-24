import { Box, Button, Grid, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text } from '@chakra-ui/react'
import React from 'react'
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

const CourseModal = ({isOpen, onClose, id, deleteButtonHandler, courseTitle, addLectureHandler, lectures=[]}) => {
    
  return (
    <Modal onClose={onClose} isOpen={isOpen} size={"full"} >
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
                        <VideoCard
                            title="ReactIntro"
                            description="This is a intro lecture where u will know basics of react"
                            num={1}
                            lectureId={"sjbdkjdfbdjkvbuthe"}
                            courseId={"jcnjboijejbdhabcl"}
                            deleteButtonHandler={deleteButtonHandler}
                         />
                    </Box>

                    


                </Grid>


            </ModalBody>

        </ModalContent>

    </Modal>
  )
}

export default CourseModal
