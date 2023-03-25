import axios from 'axios'

export const getUserInfo = async () => {
  const result = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user/info`, {
    withCredentials: true,
  })
  return result.data
}
