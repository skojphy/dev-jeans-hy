<script lang="ts">
  import Router from 'svelte-spa-router'
  import {QueryClient, QueryClientProvider} from '@tanstack/svelte-query'

  import {routes} from 'src/pages/routes'
  import {onMount} from 'svelte'
  import {initUser} from './lib/initUser'

  const queryClient = new QueryClient()
  onMount(initUser)
</script>

<QueryClientProvider client={queryClient}>
  <Router {routes} />
</QueryClientProvider>
