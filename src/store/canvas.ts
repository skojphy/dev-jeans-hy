import type {fabric} from 'fabric'
import {writable} from 'svelte/store'

export const background = writable('#F9BB01')

export const canvas = writable<fabric.Canvas | null>()
export const width = writable(600)

const defaultCostume = {
  glasses: false,
  hair: false,
  laptop: false,
  coffee: false,
}

export type CostumeKeys = keyof typeof defaultCostume

export const costumeInfo = {
  glasses: {
    title: '안경',
    src: 'src/assets/costume/glasses.png',
  },
  hair: {
    title: '앞머리',
    src: 'src/assets/costume/hair.png',
  },
  laptop: {
    title: '노트북',
    src: 'src/assets/costume/laptop.png',
  },
  coffee: {
    title: '커피',
    src: 'src/assets/costume/coffee.png',
  },
}

export const hasCostume = writable(defaultCostume)

export const toggleCostume = (target: keyof typeof defaultCostume) => {
  hasCostume.update((prev) => ({
    ...prev,
    [target]: !prev[target],
  }))
}
