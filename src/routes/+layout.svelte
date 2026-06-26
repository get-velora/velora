<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import { page } from '$app/state'; 
  import LeftBar from '../components/LeftBar.svelte';

  let { children } = $props();

  // Defined app routes array for view management
  const APP_ROUTES = ['/map', '/activities', '/colleges', '/calendar', '/documents', '/settings'];

  // Derived state checking if current route belongs inside the app core
  const isAppRoute = $derived(
    APP_ROUTES.some(route => page.url.pathname.startsWith(route))
  );
</script>

<svelte:head>
  <title>velora | Free and Open Source Application Manager</title>
</svelte:head>

<div class="h-screen w-full flex flex-row overflow-hidden bg-black select-none">
  {#if isAppRoute}
    <!-- Current pathname dictates the "active" state inside LeftBar -->
    <LeftBar currentPath={page.url.pathname} />
  {/if}
  
  <div class="flex-1 min-h-0 relative overflow-hidden">
    {@render children()}
  </div>
</div>
