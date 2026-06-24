<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import LeftBar from '../components/LeftBar.svelte';

  // Svelte 5 render slot syntax
  let { children } = $props(); 
</script>

<!-- Clean horizontal layout: LeftBar side-by-side with the active page -->
<div class="h-screen w-full flex flex-row overflow-hidden bg-black select-none">
  <!-- Persistent Leftmost Sidebar -->
  <LeftBar />
  
  <!-- Remaining active workspace takes exactly the remaining width -->
  <div class="flex-1 min-h-0 relative overflow-hidden">
    {@render children()}
  </div>
</div>

<style>
  /* Base reset to lock down default browser margins and rubber-banding */
  :global(html, body) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overscroll-behavior: none;
  }
</style>