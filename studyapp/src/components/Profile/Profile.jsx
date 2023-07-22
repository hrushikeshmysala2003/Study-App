import { Avatar, Button, Container, HStack, Heading, Image, Input, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link} from "react-router-dom"
import image from "../../assets/images/bg.jfif"
import { RiDeleteBin7Fill } from 'react-icons/ri'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
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
const Profile = () => {

  
  const user = {
    name: "Rushi",
    email: "abhi@gmail.com",
    createdAt: String( new Date().toISOString() ),
    role: "user",
    subscription: {
      status: undefined,
    },
    playlist: [
      {
        course: "hsdbvkjsd",
        poster: {image}
      },
    ]
  }

  const removeFromPlaylistHandler = id => {
    console.log(id);
  }
//   const fileUploadHandler = (e) => {
//     const file = e.target.files[0];

//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onloadend = () => {
//         setImagePrev(reader.result);
//         setImage(file);
//     }
// }
  return (
    <Container minH={"95vh"} maxW={"container.lg"} py="8" >
        <Heading textAlign={"center"} children="Profile" m="8" textTransform={"uppercase"}  />

        <Stack
        justifyContent={"flex-start"}
        direction={["column", "row"]}
        alignItems={"center"}
        spacing={["8", "16"]}
        padding={"8"}
        >
          <VStack>
            <Avatar boxSize={"48"} />

            <Button color={"aqua"} size={"md"} >Change Photo</Button>
          </VStack>

          <VStack spacing={"4"} alignItems={["center", "flex-start"]}>
            <HStack>
              <Text children="Name : " fontWeight={"bold"} />
              <Text children={user.name} fontWeight={"bold"} />
            </HStack>
            <HStack>
              <Text children="Email : " fontWeight={"bold"} />
              <Text children={user.email} fontWeight={"bold"} />
            </HStack>
            <HStack>
              <Text children="Created At : " fontWeight={"bold"} />
              <Text children={user.createdAt.split("T")[0]} fontWeight={"bold"} />
            </HStack>
            {user.role !== "admin" && <HStack>
              <Text children="Subscription  " fontWeight={"bold"}  />
                {user.subscription.status === "active"?(
                  <Button color={"red"} >Cancel Subscription</Button>
                ):(
                  <Link to="/subscribe" >
                    <Button size="sm" color={"aqua"} >subscribe</Button>
                  </Link>
                )}
            </HStack>}

            <Stack
            direction={["column", "row"]}
            alignItems={"center"}
            >
              <Link to={"/updateprofile"}>
                <Button size={"sm"} >Update Profile</Button>
              </Link>
              <Link to={"/changepassword"}>
                <Button size={"sm"} >Change Password</Button>
              </Link>
            </Stack>
          </VStack>
        </Stack>

        <Heading children="Playlist" size={"md"} my="8" />

        {user.playlist.length > 0 && 
          <Stack direction={["column", "row"]} alignItems={"center"} flexWrap={"wrap"} p="4" >
            

            {
              user.playlist.map((element, index) => (
                <VStack w="48" m="2" key={element.course}>
                  <Image boxSize={"full"} objectFit="contain" src={"https://res.cloudinary.com/dwna7axtx/image/upload/v1689922950/1639911330663_gp3s77.png"} />
                  <HStack justifyContent={"space-between"} >
                    <Link to={`/course/${element.course}`}>
                    <Button size={"sm"} color={"aqua"}  >
                      Watch Now
                    </Button>
                    </Link>

                    <Button onClick={() => removeFromPlaylistHandler(element.course)} >
                      <RiDeleteBin7Fill size={"16"} />
                    </Button>
                  </HStack>
                </VStack>
              ))
            }
          </Stack>
        }
        <ChangePhotosBox />
    </Container>
  )
}

export default Profile;

function ChangePhotosBox({}){
  return (
    <Modal>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody>
          <Container>
            <form>
              <VStack spacing={"8"}>
                <Avatar boxSize={"48"} />
                <Input type='file' css={fileUploadStyle} />
                <Button w="full" color={"aqua"} type="submit" >Change</Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
      </ModalContent>
      
    </Modal>
  )
}
