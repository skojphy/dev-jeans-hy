import Create from 'src/pages/Create.svelte'
import Detail from 'src/pages/Detail.svelte'
import MyPages from 'src/pages/MyPages.svelte'
import NotFound from 'src/pages/NotFound.svelte'
import LatestList from './LatestList.svelte'
import Login from './Login.svelte'
import RankedList from './RankedList.svelte'
import Upload from './Upload.svelte'

export const routes = {
  '/': Create,
  '/my': MyPages,
  '/login': Login,
  '/upload': Upload,
  '/detail/:id': Detail,
  '/bunny-list/latest': LatestList,
  '/bunny-list/ranked': RankedList,
  '*': NotFound,
}

export type Route = keyof typeof routes
