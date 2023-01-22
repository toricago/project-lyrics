import { extendTheme } from "@chakra-ui/react"

export const themeColors = {
  primary: {
    300: "#F29AA3",
    400: "#EE8787",
    500: "#e98074",
    600: "#D96E69",
    700: "#C85E5E",
    800: "#B65359",
    900: "#A54954",
  },
  main: {
    500: "#eae7dc",
  },
}

export default extendTheme({
  colors: themeColors,
})
