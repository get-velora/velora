<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import { page } from '$app/state'; 
  import LeftBar from '../components/LeftBar.svelte';

  let { children } = $props();

  // Added /calendar to the check
  const isAppRoute = $derived(
    page.url.pathname.startsWith('/map') || 
    page.url.pathname.startsWith('/activities') ||
    page.url.pathname.startsWith('/colleges') ||
    page.url.pathname.startsWith('/calendar')
  );
</script>

<div class="h-screen w-full flex flex-row overflow-hidden bg-black select-none">
  {#if isAppRoute}
    <LeftBar />
  {/if}
  
  <div class="flex-1 min-h-0 relative overflow-hidden">
    {@render children()}
  </div>
</div>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overscroll-behavior: none;
    background-color: black;
  }
</style>