import { ChakraProvider } from "@chakra-ui/react"
import Login from "./components/Login"
import Dashboard from "./Dashboard"
import theme from "./theme"

import useAuth from "./components/auth/useAuth"
import Layout from "./components/layout/layout"

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  const _accessToken = useAuth(code)
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        {_accessToken ? <Dashboard accessToken={_accessToken} /> : <Login />}
      </Layout>
    </ChakraProvider>
  )
}

export default App
