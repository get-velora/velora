<!-- src/components/DetailPanel.svelte -->
<script lang="ts">
  import { Lock, ArrowRight } from 'lucide-svelte';
  import type { PathfinderNode } from '../lib/types';
  import { isPossibleToComplete, nodePositionIsBranch } from '../lib/utils';

  interface Props {
    selectedNode: PathfinderNode;
    nodes: PathfinderNode[];
  }

  let { selectedNode, nodes }: Props = $props();
  let possible = $derived(isPossibleToComplete(selectedNode, nodes));
</script>

<!-- Note the addition of overscroll-contain below -->
<div class="w-full md:w-72 lg:w-96 h-auto md:h-full bg-zinc-950/20 p-5 md:p-6 lg:p-8 pr-8 md:pr-10 lg:pr-12 flex flex-col justify-between shrink-0 relative z-10 border-t md:border-t-0 border-white/10 overflow-y-auto overscroll-contain scrollbar-thin select-text min-w-0 break-words">
  <div class="space-y-4 md:space-y-6">
    
    <!-- Node Status Badges -->
    <div class="flex flex-wrap gap-2">
      {#if selectedNode.status === 'completed'}
        <span class="inline-flex items-center gap-1 text-[9px] md:text-[10px] uppercase font-mono tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-900 px-2.5 py-0.5 rounded-full">
          ● Completed
        </span>
      {:else if selectedNode.status === 'current'}
        <span class="inline-flex items-center gap-1 text-[9px] md:text-[10px] uppercase font-mono tracking-wider text-zinc-100 bg-zinc-900 border border-zinc-850 px-2.5 py-0.5 rounded-full animate-pulse">
          ▲ Active Focus
        </span>
      {:else if possible}
        <span class="inline-flex items-center gap-1 text-[9px] md:text-[10px] uppercase font-mono tracking-wider text-amber-400/80 bg-amber-950/20 border border-amber-900/60 px-2.5 py-0.5 rounded-full">
          ⬡ Available
        </span>
      {:else}
        <span class="inline-flex items-center gap-1 text-[9px] md:text-[10px] uppercase font-mono tracking-wider text-zinc-500 bg-zinc-900 border border-zinc-850 px-2.5 py-0.5 rounded-full">
          ■ Locked
        </span>
      {/if}

      {#if nodePositionIsBranch(selectedNode.position)}
        <span class="inline-flex items-center gap-1 text-[9px] md:text-[10px] uppercase font-mono tracking-wider text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded-full">
          Optional
        </span>
      {/if}
    </div>

    <!-- Details Meta Area -->
    <div class="space-y-2 md:space-y-3">
      <h2 class="text-lg md:text-xl font-semibold tracking-tight text-zinc-100">
        {selectedNode.title}
      </h2>
      <p class="text-[11px] md:text-xs text-zinc-400 leading-relaxed">
        {selectedNode.description}
      </p>
    </div>
  </div>

  <!-- Dynamic Actions Footer Block -->
  <div class="pt-4 md:pt-6 lg:pt-8 border-t border-white/10 mt-5 md:mt-0">
    {#if selectedNode.status === 'completed'}
      <div class="text-[11px] md:text-xs text-zinc-500 font-mono">
        ✓ Completed. You can review your roadmap milestones at any time.
      </div>
    {:else if selectedNode.status === 'current' || possible}
      <button class="w-full h-10 bg-white hover:bg-zinc-200 text-black text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-150">
        Begin Module Actions
        <ArrowRight class="w-3.5 h-3.5" />
      </button>
    {:else}
      <div class="text-[11px] md:text-xs text-zinc-600 flex items-center gap-2">
        <Lock class="w-3.5 h-3.5" />
        Complete previous nodes to unlock this block.
      </div>
    {/if}
  </div>
</div>

<style>
  .scrollbar-thin {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
  }
</style>