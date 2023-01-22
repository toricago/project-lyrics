import React from "react"
import { Box } from "@chakra-ui/react"

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <Box
      display="flex"
      m={2}
      alignItems="center"
      cursor="pointer"
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <Box ml={3}>
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </Box>
    </Box>
  )
}
