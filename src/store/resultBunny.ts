import {writable} from 'svelte/store'
import {persisted} from 'svelte-local-storage-store'

type ResultBunny = {
  origin: string
  thumbnail: string
}

// export const resultBunny = persisted<ResultBunny>('resultBunny', null)
export const resultBunny = writable<ResultBunny>()

export const setResultBunny = (bunny: ResultBunny) => resultBunny.set(bunny)
