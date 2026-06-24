<script lang="ts">
  import '../app.css'; // Global Tailwind import
  import LeftBar from '../components/LeftBar.svelte'; // Sidebar
  import Titlebar from '../components/Titlebar.svelte'; // Custom Titlebar

  let { children } = $props();
</script>

<!-- 
  We changed `min-h-screen` to `h-screen`. 
  This locks the window size and forces the left bar to stretch 100% of the screen.
-->
<div class="h-screen flex bg-black overflow-hidden">
  
  <!-- Spans exactly 100% of the screen height -->
  <LeftBar />

  <!-- Main content wrapper spans the remaining width and height -->
  <div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
    
    <!-- Titlebar spans only the content width, sitting adjacent to the sidebar -->
    <Titlebar />
    
    <!-- Viewport rendering page routes. Internal scrolling is enabled here. -->
    <div class="flex-1 overflow-auto bg-black">
      {@render children()}
    </div>
    
  </div>

</div>