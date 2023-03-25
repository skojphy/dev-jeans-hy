import {fabric} from 'fabric'
import {penColors} from 'src/const/colors'
import {get, writable} from 'svelte/store'
import {canvas as canvasState} from './canvas'

type Mode = 'drawing' | 'erasing' | null

const defaultDrawing: {
  mode: Mode
  color: string
  width: number
} = {
  mode: 'drawing',
  color: penColors[0],
  width: 5,
}

export const drawing = writable(defaultDrawing)
export const setDrawingColor = (color: string) => drawing.update((d) => ({...d, color}))
export const setDrawingWidth = (width: number) => drawing.update((d) => ({...d, width}))
export const resetDrawing = () => drawing.set(defaultDrawing)
export const onDrawingMode = () => {
  const canvas = get(canvasState)
  canvas.isDrawingMode = true
  drawing.update((d) => ({...d, mode: 'drawing'}))
  canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
  canvas.freeDrawingBrush.color = get(drawing).color
  canvas.freeDrawingBrush.width = get(drawing).width
}
export const onErasingMode = () => {
  const canvas = get(canvasState)
  canvas.isDrawingMode = true
  drawing.update((d) => ({...d, mode: 'erasing'}))
  canvas.freeDrawingBrush = new fabric.EraserBrush(canvas)
  canvas.freeDrawingBrush.width = get(drawing).width
}
export const offDrawingMode = () => {
  const canvas = get(canvasState)
  canvas.isDrawingMode = false
  drawing.update((d) => ({...d, mode: null}))
}
