import axios from 'axios'
import type {ApiResponseType} from 'src/types/api'
import type {UserInfo} from 'src/types/user'

export const getUserInfo = async () => {
  const result = await axios.get<ApiResponseType<UserInfo>>(`${import.meta.env.VITE_APP_API_URL}/user/info`, {
    withCredentials: true,
  })
  return result.data.data
}
