<script lang="ts">
    import { getCurrentWindow } from "@tauri-apps/api/window"; // Tauri v2 API

    const appWindow = getCurrentWindow();

    // Core window manipulation functions
    const minimize = () => appWindow.minimize();
    const toggleMaximize = () => appWindow.toggleMaximize();
    const close = () => appWindow.close();
</script>

<!-- 
  We changed `bg-zinc-950` to `bg-black` and removed `border-b border-zinc-900`.
-->
<div
    data-tauri-drag-region
    class="h-10 bg-black flex items-center justify-between px-4 select-none cursor-default shrink-0 relative z-50"
>
    <!-- Left Side: Title & Small Logo representation -->
    <div
        data-tauri-drag-region
        class="flex items-center gap-2 text-xs font-semibold tracking-tight text-white"
    >
        <div
            class="h-4.5 w-4.5 bg-zinc-100 text-black flex items-center justify-center font-bold text-[10px] rounded-sm"
        >
            V
        </div>
        <span>Velora</span>
    </div>

    <!-- Right Side: Standard Frameless Window Actions -->
    <div class="flex items-center gap-1">
        <!-- Minimize -->
        <button
            onclick={minimize}
            class="h-7 w-7 rounded-md flex items-center justify-center text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100 transition-colors"
            aria-label="Minimize"
        >
            <svg
                class="w-3 h-3"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 12h-15"
                />
            </svg>
        </button>

        <!-- Maximize -->
        <button
            onclick={toggleMaximize}
            class="h-7 w-7 rounded-md flex items-center justify-center text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100 transition-colors"
            aria-label="Maximize"
        >
            <svg
                class="w-3 h-3"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
            >
                <rect
                    width="14"
                    height="14"
                    x="5"
                    y="5"
                    rx="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </button>

        <!-- Close -->
        <button
            onclick={close}
            class="h-7 w-7 rounded-md flex items-center justify-center text-zinc-500 hover:bg-red-950/40 hover:text-red-400 transition-colors"
            aria-label="Close Window"
        >
            <svg
                class="w-3 h-3"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
    </div>
</div>
