import { useEffect } from "react"
import axios from "axios"
import AuthSlice from "./authSlice"

const api_url = process.env.REACT_APP_API_ENDPOINT || ""

// const axiosApiInstance = axios.create()

export default function useAuth(code) {
  const {
    accessToken,
    refreshToken,
    expiresIn,
    setAccessToken,
    setRefreshToken,
    setExpiresIn,
  } = AuthSlice()

  // useEffect(() => {
  //   // Response interceptor for API calls
  //   axiosApiInstance.interceptors.response.use(
  //     (response) => {
  //       return response
  //     },
  //     async function (error) {
  //       const originalRequest = error.config
  //       if (error.response.status === 403 && !originalRequest._retry) {
  //         originalRequest._retry = true
  //         const access_token = await refreshAccessToken()
  //         axios.defaults.headers.common["Authorization"] =
  //           "Bearer " + access_token
  //         return axiosApiInstance(originalRequest)
  //       }
  //       return Promise.reject(error)
  //     }
  //   )
  // }, [])

  useEffect(() => {
    if (!code) return

    const call = async function () {
      await axios
        .post(`${api_url}/auth/loginWithCode`, { code })
        .then((res) => {
          console.log(res)
          setAccessToken(res.data.accessToken)
          setRefreshToken(res.data.refreshToken)
          setExpiresIn(res.data.expiresIn)
          window.history.pushState({}, null, "/")
        })
        .catch(() => {
          // window.location = "/"
        })
    }

    call()

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios
        .post(`${api_url}/auth/refresh`, {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        .catch(() => {
          window.location = "/"
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
    // eslint-disable-next-line
  }, [])

  return accessToken
}
