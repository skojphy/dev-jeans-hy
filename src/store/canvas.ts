import type {fabric} from 'fabric'
import {writable} from 'svelte/store'
import createMapStore from '../lib/createMapStore'

export const canvas = writable<fabric.Canvas | null>()
export const width = writable(600)

export const hasGlasses = writable(false)
export const hasHair = writable(false)
export const hasLaptop = writable(false)
export const hasCoffee = writable(false)
