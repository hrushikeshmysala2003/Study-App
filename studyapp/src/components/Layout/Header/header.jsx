import React from 'react'
import { ColorModeSwitcher } from "../../../ColorModeSwitcher"
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure } from '@chakra-ui/react'
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from "react-icons/ri"
import { Link } from 'react-router-dom'
const LinkButton = ({url="/", title="Home"}) => {
    <Link to={url} >
        <Button colorScheme='cyan' variant={"ghost"}>{title}</Button>
    </Link>
}

const Header = () => {
    const isAuthenticated = true;
    const user = {
        role: "admin"
    }
    const { isOpen, onOpen, onClose } = useDisclosure();
    const logoutHandler = () => {
        console.log("Logout")
    }
  return (
    <div>
      <ColorModeSwitcher />

      <Button colorScheme={'blue'}  onClick={onOpen} width={'12'} height={'12'} rounded={'full'} position={'absolute'} left={'6'} top={'6'} >
        <RiMenu5Fill />
      </Button>

        <Drawer placement='left' onClose={onClose} isOpen={isOpen} >

            <DrawerOverlay backdropFilter={'blur(3px)'} />
            <DrawerContent>
                <DrawerHeader borderBottomWidth={'2px'} >Study_App</DrawerHeader>
                
                <DrawerBody>

                <VStack spacing={"4"} alignItems={"flex-start"} >

                    <Link to="/" >
                        <Button variant={"ghost"}>Home</Button>
                    </Link>

                    <Link to="/courses" >
                        <Button variant={"ghost"}>Browse All Courses</Button>
                    </Link>

                    <Link to="/request" >
                        <Button variant={"ghost"}>Request a course</Button>
                    </Link>

                    <Link to="/contact" >
                        <Button variant={"ghost"}>Contact Us</Button>
                    </Link>

                    <Link to="/about" >
                        <Button variant={"ghost"}>About</Button>
                    </Link>

                    <HStack justifyContent={"space-evenly"} position={"absolute"} bottom={"2rem"} width={"80%"} >

                        {isAuthenticated? (<>
                            <VStack width={"100%"} >
                                <HStack width={"100%"} justifyContent={"space-evenly"} >
                                <Link to="/profile" >
                                    <Button color={"aqua"} size='md' >Profile</Button>
                                </Link>

                                <Button color={"aqua"} size='md' onClick={logoutHandler} >
                                <RiLogoutBoxLine />
                                Logout</Button>
                                </HStack>

                                {user && user.role === "admin" && (
                                    <Link to="/admin/dashboard" >
                                        <Button  color={"purple.300"} width={"100%"} >
                                            <RiDashboardFill style={{margin: "5px"}} />
                                            DashBoard
                                        </Button>
                                    </Link>
                                )}

                            </VStack>
                        </>):(<>
                            <Link to="/login" >
                                <Button color={"aqua"} size='md' >Login</Button>
                            </Link>
                            <p>Or</p>
                            <Link to="/signup" >
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
