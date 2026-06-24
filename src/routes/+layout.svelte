<script lang="ts">
  import '../app.css'; // Global Tailwind import
  import Titlebar from '../components/Titlebar.svelte'; // Custom Titlebar import

  // Destructure children so SvelteKit can dynamically load pages
  let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-black overflow-hidden">
  <!-- Place our custom titlebar globally at the top -->
  <Titlebar />

  <!-- Render child routes/pages directly below the titlebar -->
  <div class="flex-1 overflow-auto">
    {@render children()}
  </div>
</div>