<!-- Background tiled grid -->
<script lang="ts">
  const tiles = Array.from({ length: 600 });
</script>

<div class="absolute inset-0 z-0 grid grid-cols-[repeat(auto-fill,minmax(48px,1fr))] grid-rows-[repeat(auto-fill,minmax(48px,1fr))] overflow-hidden border-b-2 border-l-2 border-zinc-800/60">
  {#each tiles as _}
    <div class="tile border-t-2 border-r-2 border-zinc-800/40 bg-transparent"></div>
  {/each}
</div>