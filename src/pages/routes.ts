import Create from 'src/pages/Create.svelte'
import Detail from 'src/pages/Detail.svelte'
import MyPages from 'src/pages/MyPages.svelte'
import NotFound from 'src/pages/NotFound.svelte'
import BunnyList from 'src/pages/BunnyList.svelte'

export const routes = {
  '/': Create,
  '/my': MyPages,
  '/:id': Detail,
  '/bunny-list': BunnyList,
  '*': NotFound,
}

export type Route = keyof typeof routes
