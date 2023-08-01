import { Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    <VStack h={"100vh"} justifyContent={"center"} >
        <div style={{transform: "scale(3)"}} >
            <Spinner thickness='2px' speed='0.65s' emptyColor='transparent' color='aqua' size={"xl"} />
        </div>
    </VStack>
  )
}

export default Loader
