import React from 'react'
import { Box, Grid } from '@chakra-ui/react'

import cursor from "../../../assets/images/cursor.png"
import Sidebar from '../Sidebar'
const AdminUsers = () => {
  return (
    <Grid css={{cursor: `url(${cursor}), default`}} minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]} >
        <Box p={["0", "16"]} overflowX={"auto"} >
        </Box>
        <Sidebar />
    </Grid>
  )
}

export default AdminUsers
