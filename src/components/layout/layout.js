import React from "react"
import { Box, Flex, useDisclosure, Collapse } from "@chakra-ui/react"
import Navbar from "./navbar"
import Note from "../../features/note"
import SideNav from "./sidenav"

const paddingContent = "56px"

function Index({ children }) {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box bg="main.500">
      <Navbar />
      <Box pt={paddingContent}>
        <Flex height={`calc(100vh - ${paddingContent})`}>
          <Box flex={1}>{children}</Box>
          <Collapse in={isOpen} animateOpacity>
            <Note />
          </Collapse>
          <SideNav onToggle={onToggle} />
        </Flex>
      </Box>
    </Box>
  )
}

Index.propTypes = {}

export default Index
