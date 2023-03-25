import {TabValue} from 'src/const/tab'
import {writable} from 'svelte/store'

export const activeTabValue = writable(TabValue.Decorate)
