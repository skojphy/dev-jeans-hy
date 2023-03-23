import type {fabric} from 'fabric'
import {writable} from 'svelte/store'

import glassesImg from '../assets/costume/glasses.png'
import laptopImg from '../assets/costume/laptop.png'
import hairImg from '../assets/costume/hair.png'
import coffeeImg from '../assets/costume/coffee.png'

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
    src: glassesImg,
  },
  hair: {
    title: '앞머리',
    src: hairImg,
  },
  laptop: {
    title: '노트북',
    src: laptopImg,
  },
  coffee: {
    title: '커피',
    src: coffeeImg,
  },
}

export const hasCostume = writable(defaultCostume)

export const toggleCostume = (target: keyof typeof defaultCostume) => {
  hasCostume.update((prev) => ({
    ...prev,
    [target]: !prev[target],
  }))
}
