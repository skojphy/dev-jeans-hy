import {fabric} from 'fabric'
import {penColors} from 'src/const/colors'
import {get, writable} from 'svelte/store'
import {canvas as canvasState} from './canvas'

const defaultDrawing = {
  isDrawingMode: true,
  color: penColors[0],
  width: 5,
}

export const drawing = writable(defaultDrawing)
export const setDrawingColor = (color: string) => drawing.update((d) => ({...d, color}))
export const setDrawingWidth = (width: number) => drawing.update((d) => ({...d, width}))
export const resetDrawing = () => drawing.set(defaultDrawing)
export const onDrawingMode = () => {
  const canvas = get(canvasState)
  drawing.set({...get(drawing), isDrawingMode: true})
  canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
  canvas.freeDrawingBrush.color = get(drawing).color
  canvas.freeDrawingBrush.width = get(drawing).width
}
export const offDrawingMode = () => {
  const canvas = get(canvasState)
  canvas.isDrawingMode = false
  resetDrawing()
}
