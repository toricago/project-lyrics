import { useState, useEffect } from "react"
import { Box, Flex, Input, FormControl } from "@chakra-ui/react"
import Player from "./components/Player"
import TrackSearchResult from "./components/TrackSearchResult"
import SpotifyWebApi from "spotify-web-api-node"
import LyricsSection from "./features/lyrics"

import axios from "axios"
const api_url = process.env.REACT_APP_API_ENDPOINT || ""

const spotifyApi = new SpotifyWebApi({
  clientId: "10d707619ffb4c42965555b5bb95bcd2",
})

export default function Dashboard({ accessToken }) {
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
  }

  console.log(playingTrack)

  useEffect(() => {
    if (!playingTrack) return

    axios
      .get(`${api_url}/lyrics`, {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics)
      })
      .catch((err) => {})
  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])

  return (
    <Flex direction="column" justify="space-between" height="100%" pt={3}>
      <Box px={2}>
        <FormControl bg="white">
          <Input
            type="text"
            placeholder="Search Songs/Artists"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormControl>
      </Box>
      <Box flexGrow="1" my={2} overflowY="auto" px={2}>
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && <LyricsSection lyrics={lyrics} />}
      </Box>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Flex>
  )
}
