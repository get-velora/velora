<script lang="ts">
  import { Map, Activity, Settings, GraduationCap, Calendar, FileText } from 'lucide-svelte';

  // Receive current path from layout
  let { currentPath = '' } = $props();

  const navItems = [
    { href: '/map', icon: Map, label: 'Map' },
    { href: '/colleges', icon: GraduationCap, label: 'Colleges' },
    { href: '/activities', icon: Activity, label: 'Activities' },
    { href: '/documents', icon: FileText, label: 'Documents' },
    { href: '/calendar', icon: Calendar, label: 'Calendar' }
  ];
</script>

<div class="w-10 shrink-0 relative z-50 group" style="height: 100vh;">
  <aside class="absolute left-0 top-0 h-full w-10 group-hover:w-48 bg-black border-r border-white/10 flex flex-col justify-between pt-3 pb-4 select-none overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]">

    <!-- Top logo -->
    <div class="relative z-10 w-full px-1.5 shrink-0">
      <div class="flex items-center h-10 w-full px-1">
        <div class="w-7 flex justify-start items-center shrink-0">
          <!-- Your logo from static/logo.png -->
          <img src="/logo.png" alt="Logo" class="h-5 w-5 object-contain" />
        </div>
        <span class="text-sm font-semibold tracking-tight text-white transition-opacity duration-200 opacity-0 group-hover:opacity-100 whitespace-nowrap ml-2.5">velora</span>
      </div>
    </div>

    <!-- Navigation -->
    <div class="relative z-10 w-full flex flex-col gap-0.5 px-1.5 my-auto">
      {#each navItems as item}
        <a 
          href={item.href} 
          class="group/item relative flex items-center h-9 w-full transition-colors duration-75 px-1 
          {currentPath.startsWith(item.href) ? 'text-white' : 'text-zinc-500 hover:text-white'}"
        >
          <!-- Active indicator -->
          <div class="absolute left-0 w-[1.5px] h-4 bg-white transition-transform duration-75 origin-center 
            {currentPath.startsWith(item.href) ? 'scale-y-100' : 'scale-y-0 group-hover/item:scale-y-100'}">
          </div>
          
          <div class="w-7 flex justify-start items-center shrink-0">
            <svelte:component this={item.icon} class="w-[17px] h-[17px]" strokeWidth={1.5} />
          </div>
          <span class="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap ml-2.5">{item.label}</span>
        </a>
      {/each}
    </div>

    <!-- Bottom Settings -->
    <div class="relative z-10 w-full px-1.5 shrink-0">
      <a 
        href="/settings" 
        class="group/item relative flex items-center h-9 w-full transition-colors duration-75 px-1
        {currentPath.startsWith('/settings') ? 'text-white' : 'text-zinc-500 hover:text-white'}"
      >
        <div class="absolute left-0 w-[1.5px] h-4 bg-white transition-transform duration-75 origin-center 
          {currentPath.startsWith('/settings') ? 'scale-y-100' : 'scale-y-0 group-hover/item:scale-y-100'}">
        </div>
        <div class="w-7 flex justify-start items-center shrink-0">
          <Settings class="w-[17px] h-[17px]" strokeWidth={1.5} />
        </div>
        <span class="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap ml-2.5">Settings</span>
      </a>
    </div>
  </aside>
</div>