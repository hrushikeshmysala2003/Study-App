import { Button, Container, Heading, VStack, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
  return (
    <Container py="16" minH={"90vh"} >
        <form>
            <Heading textTransform={"uppercase"} children="Change Password" my="16" textAlign={["center", "left"]} />
            <VStack spacing={"8"}>
            <Input required id='oldpassword'  placeholder="Old password" value={oldPassword} type='password' onChange={ e => setOldPassword(e.target.value) } focusBorderColor='cyan' />
            <Input required id='newpassword'  placeholder="New password" value={newPassword} type='password' onChange={ e => setNewPassword(e.target.value) } focusBorderColor='cyan' />
            <Button w={"full"} color={"aqua"} type='submit' >Change</Button>
            </VStack>
        </form>
    </Container>
  )
}

export default ChangePassword
