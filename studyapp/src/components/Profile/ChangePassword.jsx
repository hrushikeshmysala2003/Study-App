import { Button, Container, Heading, VStack, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profile';
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submitHandler = (e) => {
      e.preventDefault();

      dispatch(changePassword(oldPassword, newPassword));

      navigate("/profile")

    }

    const {loading, message, error} = useSelector(state=>state.profile)
    useEffect( () => {
      if(error){
        toast.error(error);
        dispatch({type: "clearError"})
      }
      if(message){
        toast.success(message);
        dispatch({type: "clearMessage"})
      }
    }, [dispatch, error, message] )

  return (
    <Container py="16" minH={"90vh"} >
        <form onSubmit={submitHandler} >
            <Heading textTransform={"uppercase"} children="Change Password" my="16" textAlign={["center", "left"]} />
            <VStack spacing={"8"}>
            <Input required id='oldpassword'  placeholder="Old password" value={oldPassword} type='password' onChange={ e => setOldPassword(e.target.value) } focusBorderColor='cyan' />
            <Input required id='newpassword'  placeholder="New password" value={newPassword} type='password' onChange={ e => setNewPassword(e.target.value) } focusBorderColor='cyan' />
            <Button isLoading={loading} w={"full"} color={"aqua"} type='submit' >Change</Button>
            </VStack>
        </form>
    </Container>
  )
}

export default ChangePassword
