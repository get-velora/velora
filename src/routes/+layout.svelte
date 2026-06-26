<script lang="ts">
  import '../app.css';
  import { page } from '$app/state'; 
  import LeftBar from '../components/LeftBar.svelte';

  let { children } = $props();

  // Define your app routes in one clean array
  const APP_ROUTES = ['/map', '/activities', '/colleges', '/calendar', '/documents', '/settings'];

  // Simplified derived logic
  const isAppRoute = $derived(
    APP_ROUTES.some(route => page.url.pathname.startsWith(route))
  );
</script>

<div class="h-screen w-full flex flex-row overflow-hidden bg-black select-none">
  {#if isAppRoute}
    <!-- Pass the current pathname to the LeftBar for the "active" state -->
    <LeftBar currentPath={page.url.pathname} />
  {/if}
  
  <div class="flex-1 min-h-0 relative overflow-hidden">
    {@render children()}
  </div>
</div>