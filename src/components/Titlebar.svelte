<script lang="ts">
    import { getCurrentWindow } from "@tauri-apps/api/window"; // use Tauri window API

    const appWindow = getCurrentWindow();

    const minimize = () => appWindow.minimize();
    const toggleMaximize = () => appWindow.toggleMaximize();
    const close = () => appWindow.close();

    let currentView = "Pathfinder"; 
    let status = "Local Sync Active";
</script>

<!-- Title bar with window controls -->
<div
    data-tauri-drag-region
    class="h-10 bg-black flex items-center justify-between px-4 select-none cursor-default shrink-0 relative z-50 border-b border-zinc-800"
>
    <!-- Left: branding and breadcrumbs -->
    <div
        data-tauri-drag-region
        class="flex items-center gap-3 h-full"
    >
        <div class="flex items-center gap-2">
            <div class="h-4.5 w-4.5 bg-white text-black flex items-center justify-center font-bold text-[10px] rounded-sm shrink-0">
                V
            </div>
            <span class="text-xs font-bold tracking-tight text-white">Velora</span>
        </div>

        <!-- Divider -->
        <div class="h-5 w-px bg-zinc-800 mx-1"></div>

            <!-- View status -->
        <div class="flex items-center gap-3">
            <div class="flex flex-col">
                <span class="text-[9px] uppercase tracking-widest text-zinc-500 leading-none mb-0.5">Location</span>
                <span class="text-[11px] font-medium text-zinc-200 leading-none">{currentView}</span>
            </div>
            
            <!-- Divider -->
            <div class="h-4 w-px bg-zinc-800/60"></div>

            <div class="flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span class="text-[10px] text-zinc-400 font-medium">{status}</span>
            </div>
        </div>
    </div>

    <!-- Right: window actions -->
    <div class="flex items-center h-full">
        
        <!-- Divider before actions -->
        <div class="h-5 w-px bg-zinc-800 mr-3"></div>

        <div class="flex items-center gap-0.5">
            <!-- Minimize -->
            <button
                onclick={minimize}
                class="h-7 w-8 rounded-md flex items-center justify-center text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
                aria-label="Minimize"
            >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                </svg>
            </button>

            <!-- Maximize -->
            <button
                onclick={toggleMaximize}
                class="h-7 w-8 rounded-md flex items-center justify-center text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
                aria-label="Maximize"
            >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <rect width="12" height="12" x="6" y="6" rx="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>

            <!-- Close -->
            <button
                onclick={close}
                class="h-7 w-8 rounded-md flex items-center justify-center text-zinc-400 hover:bg-red-500 hover:text-white transition-colors"
                aria-label="Close Window"
            >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
</div>