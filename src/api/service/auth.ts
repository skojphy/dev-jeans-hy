import axios from 'axios'
import {idToken as curIdToken} from 'src/store/user'

export const login = async ({idToken}: {idToken: string}) => {
  try {
    const result = await axios.post(`${import.meta.env.VITE_APP_API_URL}/v1/oauth/login`, {
      idToken,
      withCredentials: true,
    })
    return result.data
  } catch (e) {
    curIdToken.set(null)
    console.error(e)
  }
}

export const logout = async () => {
  try {
    const result = await axios.post(`${import.meta.env.VITE_APP_API_URL}/v1/oauth/logout`)
    curIdToken.set(null)

    return result.data
  } catch (e) {
    console.error(e)
  }
}
