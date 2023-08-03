import { Avatar, Button, Container, HStack, Heading, Image, Input, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link} from "react-router-dom"
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader, 
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPlaylist, updateProfilePicture } from '../../redux/actions/profile'
import { loadUser } from '../../redux/actions/user'
import toast from 'react-hot-toast'
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

const Profile = ({user}) => {


    
  const {isOpen, onClose, onOpen} = useDisclosure()
  
  const dispatch = useDispatch();

  const {loading, message, error} = useSelector(state => state.profile)

  useEffect(() => {
    if(error) {
      toast.error(error, {
        duration: 4000,
      });
      dispatch({ type: "clearError" })
    }

    if(message) {
      toast.success(message, {
        duration: 4000,
      });
      dispatch({ type: "clearMessage" })
    }
  }, [dispatch, error, message])

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("file", image);

    await dispatch(updateProfilePicture(myForm));

    dispatch(loadUser());
  }

  const removeFromPlaylistHandler = async (id) => {
     await dispatch(removeFromPlaylist(id))
      dispatch(loadUser());
  }


  
  
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
           <Avatar src={user.avatar.url} boxSize={"48"} />

            <Button color={"aqua"} size={"md"} onClick={onOpen} >Change Photo</Button>
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
                {(user.subscription && user.subscription.status === "active")?(
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
                <Button isLoading={loading} color={"aqua"} size={"sm"} >Update Profile</Button>
              </Link>
              <Link to={"/changepassword"}>
                <Button isLoading={loading} color={"aqua"} size={"sm"} >Change Password</Button>
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
                  <Image boxSize={"full"} objectFit="contain" src={element.poster} />
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
        <ChangePhotosBox changeImageSubmitHandler={changeImageSubmitHandler} isOpen={isOpen} onClose={onClose} loading={loading} />
    </Container>
  )
}

export default Profile;






function ChangePhotosBox({isOpen, onClose, changeImageSubmitHandler, loading}){
    const [imagePrev, setImagePrev] = useState("");
    const [image, setImage] = useState("");
    const changeImage = (e) => {
        const file = e.target.files[0];
    
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        }
    }

    const closeHandler = () => {
        onClose();
        setImagePrev("");
        setImage("");
     }
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}  >
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={(e) => changeImageSubmitHandler(e, image)} >
              <VStack spacing={"8"}>
                <Avatar src={imagePrev} boxSize={"48"} />
                <Input  height={"-moz-min-content"} type='file' css={fileUploadStyle} onChange={changeImage} />
                <Button w="full" color={"aqua"} type="submit" isLoading={loading} >Change</Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button mr={"3"} onClick={closeHandler} >Cancel</Button>
        </ModalFooter>
      </ModalContent>
      
    </Modal>
  )
}
