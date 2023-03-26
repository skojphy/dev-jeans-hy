import axios from 'axios'
import type {ApiResponseType} from 'src/types/api'
import type {PhotoRes} from 'src/types/photo'

// 사진 업로드
export const uploadPhoto = async (body: {image: FormData; thumbnail: FormData; photo_title: string}) => {
  const result = await axios.post<ApiResponseType<PhotoRes>>(`${import.meta.env.VITE_APP_API_URL}/photo/upload`, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...body,
  })
  return result.data.data
}

// 사진 삭제
export const deletePhoto = async ({id}: {id: string}) => {
  const result = await axios.delete<ApiResponseType<string>>(`${import.meta.env.VITE_APP_API_URL}/photo/${id}`, {
    withCredentials: true,
  })
  return result.data.data
}

// 특정 사진 가져오기
export const getPhoto = async ({id}: {id: string}) => {
  const result = await axios.get<ApiResponseType<PhotoRes>>(`${import.meta.env.VITE_APP_API_URL}/photo/${id}`, {
    withCredentials: true,
  })
  return result.data.data
}

// 좋아요 토글
export const toggleLikePhoto = async ({isLike, id}: {isLike: boolean; id: string}) => {
  const result = isLike
    ? await axios.post<ApiResponseType<PhotoRes>>(`${import.meta.env.VITE_APP_API_URL}/photo/like/${id}`, {
        withCredentials: true,
      })
    : await axios.post<ApiResponseType<PhotoRes>>(`${import.meta.env.VITE_APP_API_URL}/photo/like/cancle/${id}`, {
        withCredentials: true,
      })
  return result.data.data
}

// 사진 리스트 가져오기 - 수정 예정
export const getPhotos = async ({sort, page = 0}: {sort: 'latest' | 'ranked'; page: number}) => {
  const result = await axios.get(`${import.meta.env.VITE_APP_API_URL}/photo/all/${sort}?page=${page}`, {
    withCredentials: true,
  })
  return result.data.data
}
