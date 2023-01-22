import create from "zustand"
import { persist } from "zustand/middleware"

const authSlice = create(
  persist(
    (set, get) => ({
      accessToken: "",
      refreshToken: "",
      expiresIn: "",
      setAccessToken: (accessToken) => set({ accessToken }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setExpiresIn: (expiresIn) => set({ expiresIn }),
    }),
    {
      name: "spotify-auth", // unique name
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
)

export default authSlice
