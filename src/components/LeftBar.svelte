<script lang="ts">
  import { LayoutDashboard, User, Bell, Settings } from 'lucide-svelte';
</script>

<!-- 
  - We changed `py-4` to `pt-3 pb-2` to maximize the vertical stretch and drop Settings to the absolute bottom.
-->
<aside 
  class="h-full w-10 hover:w-56 bg-black border-r border-white/10 flex flex-col items-center justify-between pt-3 pb-2 transition-all duration-300 ease-in-out overflow-hidden shrink-0 group relative z-40"
>
  
  <!-- Top Section: Navigation Links -->
  <div class="w-full flex flex-col gap-2 px-1">
    
    <!-- Dashboard Link -->
    <a 
      href="#dashboard" 
      class="flex items-center gap-3.5 h-8 w-full rounded-md hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-100 transition-colors px-2"
    >
      <LayoutDashboard class="w-4 h-4 shrink-0" strokeWidth={1.5} />
      <span class="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 whitespace-nowrap">
        Dashboard
      </span>
    </a>

    <!-- Profile Link -->
    <a 
      href="#profile" 
      class="flex items-center gap-3.5 h-8 w-full rounded-md hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-100 transition-colors px-2"
    >
      <User class="w-4 h-4 shrink-0" strokeWidth={1.5} />
      <span class="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 whitespace-nowrap">
        Student Profile
      </span>
    </a>

    <!-- Notifications Link -->
    <a 
      href="#notifications" 
      class="flex items-center gap-3.5 h-8 w-full rounded-md hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-100 transition-colors px-2"
    >
      <Bell class="w-4 h-4 shrink-0" strokeWidth={1.5} />
      <span class="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 whitespace-nowrap">
        Milestone Alerts
      </span>
    </a>

  </div>

  <!-- Bottom Section: Settings Link -->
  <div class="w-full px-1">
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