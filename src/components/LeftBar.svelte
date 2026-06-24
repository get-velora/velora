<!-- src/components/LeftBar.svelte -->
<script lang="ts">
  import { Map, Activity, Settings } from 'lucide-svelte';
</script>

<!-- 
  Layout Anchor: Stays exactly 40px (w-10) wide to prevent layout shifts.
  Acts as the hover trigger for the visual child container.
-->
<div 
  class="w-10 shrink-0 relative z-50 group" 
  style="height: 100vh;"
>
  
  <!-- 
    Visual Sidebar: Positions absolutely. When the anchor is hovered, 
    this panel stretches horizontally, casting a shadow and blurring the background.
  -->
  <aside 
    class="absolute left-0 top-0 h-full w-10 group-hover:w-56 bg-black/90 group-hover:bg-zinc-950/80 group-hover:backdrop-blur-xlbg-zinc-950/80 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between pt-3 pb-2 transition-all duration-300 ease-in-out overflow-hidden select-none
           shadow-[0_0_0_rgba(0,0,0,0)] group-hover:shadow-[30px_0_60px_-15px_rgba(0,0,0,0.95)]"
  >
    
    <!-- 1. TOP SECTION: Branding Logo & Name -->
    <div class="w-full px-1" style="flex-shrink: 0;">
      <div class="flex items-center gap-3.5 h-10 w-full px-2 shrink-0 select-none">
        <div class="h-5 w-5 bg-zinc-100 text-black flex items-center justify-center font-bold text-xs rounded-sm shrink-0">
          V
        </div>
        <span class="text-sm font-semibold tracking-tight text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 whitespace-nowrap">
          Velora
        </span>
      </div>
    </div>

    <!-- 2. MIDDLE SECTION: Navigation Links -->
    <div class="w-full flex flex-col gap-2 px-1 my-auto">
      
      <!-- Map Link -->
      <a 
        href="/" 
        class="flex items-center gap-3.5 h-8 w-full rounded-md hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-100 transition-colors px-2"
      >
        <Map class="w-4 h-4 shrink-0" strokeWidth={1.5} />
        <span class="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 whitespace-nowrap">
          Map
        </span>
      </a>

      <!-- Activities Link -->
      <a 
        href="/activities" 
        class="flex items-center gap-3.5 h-8 w-full rounded-md hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-100 transition-colors px-2"
      >
        <Activity class="w-4 h-4 shrink-0" strokeWidth={1.5} />
        <span class="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 whitespace-nowrap">
          Activities
        </span>
      </a>

    </div>

    <!-- 3. BOTTOM SECTION: Settings Link -->
    <div class="w-full px-1" style="flex-shrink: 0;">
      <a 
        href="#settings" 
        class="flex items-center gap-3.5 h-8 w-full rounded-md hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-100 transition-colors px-2"
      >
        <Settings class="w-4 h-4 shrink-0" strokeWidth={1.5} />
        <span class="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 whitespace-nowrap">
          Settings
        </span>
      </a>
    </div>

  </aside>
</div>