import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { server } from '../../redux/store'
import { buySubscription } from '../../redux/actions/user'
import toast from "react-hot-toast"
import axios from "axios"
const Subscribe = ({user}) => {
    const dispatch = useDispatch();
    const [key, setKey] = useState("")

    const {loading, error, subscriptionId} = useSelector(state => state.subscription)
    const {error:courseError} = useSelector(state => state.course)
    const subscribeHandler = async() => {
        const {data} = await axios.get(`${server}/razorpaykey`)
        setKey(data.key)
        dispatch(buySubscription())
    }
    useEffect(() => {
        if(error){
            toast.error(error)
            dispatch({type: "clearError"})
        }
        if(courseError){
            toast.error(courseError)
            dispatch({type: "clearError"})
        }
        if(subscriptionId){
            const openPopUp = () => {
                const options ={
                    key,
                    name: "StudyApp",
                    desription: "Get access to all premium content",
                    // image: logo
                    subscription_id: subscriptionId,
                    callback_url: `${server}/paymentverification`,
                    prefill: {
                        name: user.name,
                        email: user.email,
                        contact:""
                    },
                    notes:{
                        address: "rushi Programmer",
                    },
                    theme: {
                        color: "#0099ff"
                    }
                }
                const razor = new window.Razorpay(options)
                razor.open()
            } 
            openPopUp();
        }
    }, [dispatch, error, courseError ,user.name, user.email, key, subscriptionId])
  return <Container  p="16"  >
    <Heading children="Welcome" my="8" textAlign={"Center"} />

    <VStack 
    boxShadow={"lg"}
    alignItems="strech"
    borderRadius={"lg"}
    spacing={"8"}
    >
        <Box bg={"aqua"} p={"4"} css={{borderRadius: "8px 8px 0 0"}} >
            <Text color={"black"} children={`Pro Pack - 299.00`} />
        </Box>
        <Box p="4" >
            <VStack textAlign={"center"} paddingX={"8"} mt={"4"} spacing={"8"} >
                <Text children={"Join Pro Pack and Get Access to all content."} />
                <Heading size={"md"} children={"299 Only"} />
            </VStack>

            <Button isLoading={loading} my="8"  w={"full"} color={'red'} onClick={subscribeHandler}  >Buy Now</Button>
        </Box>

        <Box bg={"aqua"} p={"4"} css={{ borderRadius: "0 0 8px 8px"}} >
            <Heading textTransform={"uppercase"} color={"black"} size={"md"} children={"100% refund at camcellation"} />

            <Text fontSize={"xs"} color="aqua" children="Terms and conditions Apply" />
        </Box>
    </VStack>
  </Container>
}

export default Subscribe
