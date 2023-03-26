<script lang="ts">
  import Router from 'svelte-spa-router'

  import {routes} from 'src/pages/routes'
  import {onMount} from 'svelte'
  import {initUser} from './lib/initUser'

  onMount(initUser)
</script>

<Router {routes} />
