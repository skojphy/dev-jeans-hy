import axios from 'axios'

export const postLogin = async ({idToken}: {idToken: string}) => {
  const result = await axios.post(`${import.meta.env.VITE_APP_API_URL}/v1/oauth/login`, {
    idToken,
  })
  return result.data
}
