<script lang="ts">
  import Router from 'svelte-spa-router'
  import {QueryClient, QueryClientProvider} from '@tanstack/svelte-query'
  import {SvelteToast} from '@zerodevx/svelte-toast'
  import {routes} from 'src/pages/routes'
  import {onMount} from 'svelte'
  import {initUser} from 'src/lib/initUser'

  const queryClient = new QueryClient()
  onMount(initUser)
</script>

<QueryClientProvider client={queryClient}>
  <SvelteToast
    options={{
      reversed: true,
      intro: {y: 192},
      duration: 1500,
      dismissable: false,
      theme: {
        '--toastBarHeight': 0,
        '--toastBackground': '#1982c4aa',
        '--toastBarBackground': '#1982c4',
      },
    }}
  />
  <Router {routes} />
</QueryClientProvider>
