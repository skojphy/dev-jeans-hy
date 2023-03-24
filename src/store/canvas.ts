import type {fabric} from 'fabric'
import {writable} from 'svelte/store'

import {getRandomInt} from 'src/lib/getRandom'
import {backgrounds} from 'src/const/colors'
import {
  airpotImg,
  ballCapImg,
  basketballImg,
  basketballVestImg,
  coffeeImg,
  cookieImg,
  darkCirclesImg,
  glassesImg,
  gogglesImg,
  hairbandImg,
  hairImg,
  hardHatImg,
  headphonesImg,
  laptopImg,
  sneakersImg,
  toastImg,
  watchImg,
} from 'src/const/imgUrl'

export const background = writable(backgrounds[getRandomInt(0, backgrounds.length - 1)])

export const canvas = writable<fabric.Canvas | null>()
export const width = writable(600)

const defaultCostume = {
  glasses: false,
  hair: false,
  laptop: false,
  coffee: false,
  goggles: false,
  hairband: false,
  headphones: false,
  basketball: false,
  basketballVest: false,
  airpot: false,
  ballCap: false,
  darkCircles: false,
  hardHat: false,
  toast: false,
  watch: false,
  sneakers: false,
  cookie: false,
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
  goggles: {
    title: '고글',
    src: gogglesImg,
  },
  headphones: {
    title: '헤드폰',
    src: headphonesImg,
  },
  hairband: {
    title: '농구 머리띠',
    src: hairbandImg,
  },
  basketballVest: {
    title: '농구 조끼',
    src: basketballVestImg,
  },
  basketball: {
    title: '농구 공',
    src: basketballImg,
  },
  airpot: {
    title: '에어팟',
    src: airpotImg,
  },
  ballCap: {
    title: '볼캡',
    src: ballCapImg,
  },
  darkCircles: {
    title: '다크써클',
    src: darkCirclesImg,
  },
  hardHat: {
    title: '안전모',
    src: hardHatImg,
  },
  toast: {
    title: '토스트',
    src: toastImg,
  },
  watch: {
    title: '애플워치',
    src: watchImg,
  },
  sneakers: {
    title: '운동화',
    src: sneakersImg,
  },
  cookie: {
    title: '쿠키',
    src: cookieImg,
  },
}

export const hasCostume = writable(defaultCostume)

export const toggleCostume = (target: keyof typeof defaultCostume) => {
  hasCostume.update((prev) => ({
    ...prev,
    [target]: !prev[target],
  }))
}

export const resetCostume = () => {
  hasCostume.set(defaultCostume)
}
