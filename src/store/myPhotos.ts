import {getUserPhotos} from 'src/api/service/user'
import type {PhotoRes} from 'src/types/photo'
import {writable} from 'svelte/store'

export const myPhotos = writable<PhotoRes[]>([])
export const mutateMyPhotos = () => {
  getUserPhotos().then((res) => {
    myPhotos.set(res)
  })
}
