import React from 'react'
import { ColorModeSwitcher } from "../../../ColorModeSwitcher"
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure } from '@chakra-ui/react'
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from "react-icons/ri"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/actions/user'
const LinkButton = ({url="/", title="Home"}) => {
    <Link to={url} >
        <Button colorScheme='cyan' variant={"ghost"}>{title}</Button>
    </Link>
}

const Header = ({isAuthenticated = false, user}) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useDispatch();
    const logoutHandler = () => {
        onClose();
        dispatch(logout());
    }
  return (
    <div>
      <ColorModeSwitcher />

      <Button colorScheme={'blue'} zIndex={"overlay"} onClick={onOpen} width={'12'} height={'12'} rounded={'full'} position={'absolute'} left={'6'} top={'6'} >
        <RiMenu5Fill />
      </Button>

        <Drawer placement='left' onClose={onClose} isOpen={isOpen} >

            <DrawerOverlay backdropFilter={'blur(3px)'} />
            <DrawerContent>
                <DrawerHeader borderBottomWidth={'2px'} >Study_App</DrawerHeader>
                
                <DrawerBody>

                <VStack spacing={"4"} alignItems={"flex-start"} >

                    <Link to="/" onClick={onClose} >
                        <Button variant={"ghost"}>Home</Button>
                    </Link>

                    <Link to="/courses" onClick={onClose}  >
                        <Button variant={"ghost"}>Browse All Courses</Button>
                    </Link>

                    <Link to="/request" onClick={onClose}  >
                        <Button variant={"ghost"}>Request a course</Button>
                    </Link>

                    <Link to="/contact" onClick={onClose}  >
                        <Button variant={"ghost"}>Contact Us</Button>
                    </Link>

                    <Link to="/about" onClick={onClose}  >
                        <Button variant={"ghost"}>About</Button>
                    </Link>

                    <HStack justifyContent={"space-evenly"} position={"absolute"} bottom={"2rem"} width={"80%"} >

                        {isAuthenticated? (<>
                            <VStack width={"100%"} >
                                <HStack width={"100%"} justifyContent={"space-evenly"} >
                                <Link onClick={onClose}  to="/profile" >
                                    <Button color={"aqua"} size='md' >Profile</Button>
                                </Link>

                                <Button color={"aqua"} size='md' onClick={logoutHandler} >
                                <RiLogoutBoxLine />
                                Logout</Button>
                                </HStack>

                                {user && user.role === "admin" && (
                                    <Link onClick={onClose}  to="/admin/dashboard" >
                                        <Button  color={"purple.300"} width={"100%"} >
                                            <RiDashboardFill style={{margin: "5px"}} />
                                            DashBoard
                                        </Button>
                                    </Link>
                                )}

                            </VStack>
                        </>):(<>
                            <Link onClick={onClose}  to="/login" >
                                <Button color={"aqua"} size='md' >Login</Button>
                            </Link>
                            <p>Or</p>
                            <Link onClick={onClose}  to="/register" >
                                <Button color={"aqua"} size='md' >Sign Up</Button>
                            </Link>
                        </>)}
                        

                    </HStack>
                    
                </VStack>

                </DrawerBody>

            </DrawerContent>
        </Drawer>

    </div>
  )
}



export default Header
