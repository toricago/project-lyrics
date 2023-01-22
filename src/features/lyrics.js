import React from "react"
import XRegExp from "xregexp"
import { Box } from "@chakra-ui/react"

import KanjiPopover from "./kanjiPopover"

function Lyrics({ lyrics }) {
  // const _lyrics = lyrics
  //   ? [...lyrics]
  //       .map((c) => {
  //         if (XRegExp("^\\p{Han}+$").test(c)) {
  //           return (
  //             <KanjiPopover kanji={c}>
  //               <span style={{ color: "red" }}>{c}</span>
  //             </KanjiPopover>
  //           )
  //         }
  //         return c
  //       })
  //       .reduce((prev, curr) => [prev, "", curr])
  //   : ""

  return (
    <Box textAlign="center" whiteSpace="pre">
      {lyrics}
    </Box>
  )
}

export default Lyrics
