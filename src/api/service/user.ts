import axios from 'axios'
import type {ApiResponseType} from 'src/types/api'
import type {PhotoRes} from 'src/types/photo'
import type {UserInfo} from 'src/types/user'

export const getUserInfo = async () => {
  const result = await axios.get<ApiResponseType<UserInfo>>(`${import.meta.env.VITE_APP_API_URL}/user/info`, {
    withCredentials: true,
  })
  return result.data.data
}

export const getUserPhotos = async () => {
  const result = await axios.get<ApiResponseType<PhotoRes[]>>(`${import.meta.env.VITE_APP_API_URL}/user/photos`, {
    withCredentials: true,
  })
  return result.data.data
}
