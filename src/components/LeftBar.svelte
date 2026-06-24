<!-- src/components/LeftBar.svelte -->
<script lang="ts">
  import { LayoutDashboard, User, Bell, Settings } from 'lucide-svelte';
</script>

<!-- 
  We use inline styles to guarantee the display, flex direction, 
  and full viewport height render directly in the browser.
-->
<aside 
  class="w-10 hover:w-56 bg-black border-r border-white/10 transition-all duration-300 ease-in-out overflow-hidden shrink-0 group relative z-40"
  style="height: 100vh; display: flex; flex-direction: column; justify-content: space-between; padding-top: 12px; padding-bottom: 8px;"
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

  <!-- 2. MIDDLE SECTION: Navigation Links 
       This section stays grouped together vertically in the center
  -->
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