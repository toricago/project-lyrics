import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  useBoolean,
  useDisclosure,
  CircularProgress,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import axios from "axios"

function KanjiPopover({ children, kanji }) {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const getKanji = () => {
    const _url = encodeURI("http://localhost:3001" + "/kanji?kanji=" + kanji)

    const options = {
      url: _url,
      method: "GET",
    }

    setLoading(true)

    axios(options)
      .then((res) => {
        setData(res.data.kanji)
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!isOpen) return

    getKanji()
  }, [isOpen])

  // console.log(data)

  console.log(loading)

  const kun_sound = data?.kanji?.kunyomi?.romaji
  const on_sound = data?.kanji?.onyomi?.romaji

  return (
    <Popover isLazy onClose={onClose} isOpen={isOpen}>
      <PopoverTrigger>
        {React.cloneElement(children, { onClick: onToggle })}
        {/* <Button>Trigger</Button> */}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{kanji}</PopoverHeader>
        <PopoverBody>
          {loading ? (
            <CircularProgress isIndeterminate color="green.300" />
          ) : (
            [kun_sound, on_sound].join(", ")
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default KanjiPopover
