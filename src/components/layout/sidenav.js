import React from "react"
import { Button, Stack, Box, Center, Icon } from "@chakra-ui/react"
import { CgNotes } from "react-icons/cg"
import { TbVocabulary } from "react-icons/tb"
import { MdLogout } from "react-icons/md"

function Side({ onToggle }) {
  return (
    <Stack position="relative" bg="primary.500" width="50px" pt={4}>
      <Center>
        <Button
          onClick={onToggle}
          colorScheme="primary"
          _hover={{
            background: "primary.700",
          }}
        >
          <Icon boxSize={30} as={CgNotes} />
        </Button>
      </Center>
      <Center>
        <Button
          onClick={onToggle}
          colorScheme="primary"
          _hover={{
            background: "primary.700",
          }}
        >
          <Icon boxSize={30} as={TbVocabulary} />
        </Button>
      </Center>
    </Stack>
  )
}

export default Side
