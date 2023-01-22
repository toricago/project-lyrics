import React from "react"
import { Box, Text, Textarea } from "@chakra-ui/react"

import { useEffect, useState } from "react"

function Note(props) {
  return (
    <Box bgColor={"#d8c3a5"} width={"500px"} h="100%" p={3}>
      <Text fontSize="4xl" textAlign="center">
        My Note
      </Text>
      <Box bgColor={"#FFFFFF"}>
        <Textarea height="500px" />
      </Box>
    </Box>
  )
}
export default Note
