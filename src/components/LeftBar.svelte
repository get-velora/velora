<!-- src/components/LeftBar.svelte -->
<script lang="ts">
  // Added Calendar to the imports
  import { Map, Activity, Settings, GraduationCap, Calendar } from 'lucide-svelte';
</script>

<div 
  class="w-10 shrink-0 relative z-50 group" 
  style="height: 100vh;"
>
  <!-- 
    SIDEBAR 
    - Clean expansion from w-10 to w-48.
    - No external shadows or blurs.
    - Border-r provides the only separation.
  -->
  <aside 
    class="absolute left-0 top-0 h-full w-10 group-hover:w-48 
           bg-black border-r border-white/10 
           flex flex-col justify-between pt-3 pb-4 select-none overflow-hidden
           transition-[width] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
  >
    <!-- INTERNAL BLUR -->
    <div class="absolute inset-0 bg-zinc-950/60 backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

    <!-- 1. TOP SECTION: Logo -->
    <div class="relative z-10 w-full px-1.5 shrink-0">
      <div class="flex items-center h-10 w-full px-1">
        <div class="w-7 flex justify-start items-center shrink-0">
          <div class="h-5 w-5 bg-white text-black flex items-center justify-center font-bold text-[10px] rounded-sm">
            V
          </div>
        </div>
        <span class="text-sm font-semibold tracking-tight text-white transition-opacity duration-200 opacity-0 group-hover:opacity-100 whitespace-nowrap ml-2.5">
          Velora
        </span>
      </div>
    </div>

    <!-- 2. MIDDLE SECTION: Navigation -->
    <div class="relative z-10 w-full flex flex-col gap-0.5 px-1.5 my-auto">
      
      {#each [
        { href: '/map', icon: Map, label: 'Map' },
        { href: '/colleges', icon: GraduationCap, label: 'Colleges' },
        { href: '/activities', icon: Activity, label: 'Activities' },
        { href: '/calendar', icon: Calendar, label: 'Calendar' }
      ] as item}
        <a 
          href={item.href} 
          class="group/item relative flex items-center h-9 w-full text-zinc-500 hover:text-white transition-colors duration-75 px-1"
        >
          <!-- QUICK INDICATOR: 75ms snap -->
          <div class="absolute left-0 w-[1.5px] h-4 bg-white scale-y-0 group-hover/item:scale-y-100 transition-transform duration-75 origin-center"></div>
          
          <div class="w-7 flex justify-start items-center shrink-0">
            <svelte:component this={item.icon} class="w-[17px] h-[17px]" strokeWidth={1.5} />
          </div>
          <span class="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap ml-2.5">
            {item.label}
          </span>
        </a>
      {/each}

    </div>

    <!-- 3. BOTTOM SECTION: Settings -->
    <div class="relative z-10 w-full px-1.5 shrink-0">
      <a 
        href="#settings" 
        class="group/item relative flex items-center h-9 w-full text-zinc-500 hover:text-white transition-colors duration-75 px-1"
      >
        <div class="absolute left-0 w-[1.5px] h-4 bg-white scale-y-0 group-hover/item:scale-y-100 transition-transform duration-75 origin-center"></div>
        <div class="w-7 flex justify-start items-center shrink-0">
          <Settings class="w-[17px] h-[17px]" strokeWidth={1.5} />
        </div>
        <span class="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap ml-2.5">
          Settings
        </span>
      </a>
    </div>

  </aside>
</div>