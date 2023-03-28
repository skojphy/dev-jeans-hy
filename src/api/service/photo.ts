import axios from 'axios'
import type {ApiResponseType} from 'src/types/api'
import type {PhotoPages, PhotoRes, SortType} from 'src/types/photo'

// 사진 업로드
export const uploadPhoto = async (formData: FormData) => {
  const config = {headers: {'Content-Type': 'multipart/form-data'}}

  const result = await axios.post<ApiResponseType<PhotoRes>>(
    `${import.meta.env.VITE_APP_API_URL}/photo/upload`,
    formData,
    config,
  )
  return result.data.data
}

// 사진 삭제
export const deletePhoto = async ({id}: {id: string | number}) => {
  const result = await axios.delete<ApiResponseType<string>>(`${import.meta.env.VITE_APP_API_URL}/photo/${id}`, {
    withCredentials: true,
  })
  return result.data.data
}

// 특정 사진 가져오기
export const getPhoto = async ({id}: {id: string | number}) => {
  const result = await axios.get<ApiResponseType<PhotoRes>>(`${import.meta.env.VITE_APP_API_URL}/photo/${id}`, {
    withCredentials: true,
  })
  return result.data.data
}

// 좋아요 토글
export const toggleLikePhoto = async ({isLiked, id}: {isLiked: boolean; id: string | number}) => {
  const result = isLiked
    ? await axios.post<ApiResponseType<PhotoRes>>(`${import.meta.env.VITE_APP_API_URL}/photo/like/${id}`, {
        withCredentials: true,
      })
    : await axios.post<ApiResponseType<PhotoRes>>(`${import.meta.env.VITE_APP_API_URL}/photo/like/cancel/${id}`, {
        withCredentials: true,
      })
  return result.data.data
}

// 버니 리스트 가져오기
export const getPhotos =
  (sort: SortType = 'latest') =>
  async ({pageParam = 0}) => {
    const result = await axios.get<ApiResponseType<PhotoPages>>(
      `${import.meta.env.VITE_APP_API_URL}/photo/all/${sort}?page=${pageParam}`,
    )

    return result.data
  }

// 좋아요 했는지 확인
export const checkLikePhoto = async ({photoId}: {photoId: string | number}) => {
  const result = await axios.get<ApiResponseType<boolean>>(
    `${import.meta.env.VITE_APP_API_URL}/photo/user/like?photoId=${photoId}`,
    {
      withCredentials: true,
    },
  )
  return result.data.data
}

// ranked 버니 리스트 한 페이지 가져오기
export const getBestPhotos = async () => {
  const result = await axios.get<ApiResponseType<PhotoRes>>(
    `${import.meta.env.VITE_APP_API_URL}/photo/all/ranked?page=0`,
    {
      withCredentials: true,
    },
  )
  return result.data.data
}
