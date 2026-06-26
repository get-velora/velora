<!-- Detail panel -->
<script lang="ts">
  import { Lock, ArrowRight, ExternalLink, CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-svelte';
  import type { PathfinderNode, NodeResource } from '../lib/types';
  import { isPossibleToComplete, nodePositionIsBranch } from '../lib/utils';

  interface Props {
    selectedNode: PathfinderNode;
    nodes: PathfinderNode[];
    onNodeUpdate: (nodeId: string, resources: NodeResource[]) => void;
  }

  let { selectedNode, nodes, onNodeUpdate }: Props = $props();

  let possible = $derived(isPossibleToComplete(selectedNode, nodes));
  let isUnlocked = $derived(
    selectedNode.status === 'completed' ||
    selectedNode.status === 'current' ||
    possible
  );

  let resourcesExpanded = $state(true);

  // Derived resource progress
  let completedResources = $derived(selectedNode.resources.filter(r => r.completed).length);
  let totalResources = $derived(selectedNode.resources.length);
  let resourcePercent = $derived(totalResources > 0 ? Math.round((completedResources / totalResources) * 100) : 0);
  let allResourcesDone = $derived(completedResources === totalResources && totalResources > 0);

  function toggleResource(resourceId: string) {
    if (!isUnlocked) return;
    const updated = selectedNode.resources.map(r =>
      r.id === resourceId ? { ...r, completed: !r.completed } : r
    );
    onNodeUpdate(selectedNode.id, updated);
  }
</script>

<div class="w-full md:w-80 lg:w-[400px] h-auto md:h-full bg-zinc-950/20 flex flex-col shrink-0 relative z-10 border-t md:border-t-0 border-white/10 overflow-y-auto overscroll-contain scrollbar-thin select-text min-w-0 break-words">

  <div class="p-6 md:p-8 lg:p-10 pb-6 border-b border-white/5 space-y-6">
    <!-- Status badges -->
    <div class="flex flex-wrap gap-2.5">
      {#if selectedNode.status === 'completed'}
        <span class="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-emerald-400 bg-emerald-950/30 border border-emerald-900/50 px-3 py-1 rounded-full">
          ● Completed
        </span>
      {:else if selectedNode.status === 'current'}
        <span class="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-zinc-100 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full animate-pulse">
          ▲ Active
        </span>
      {:else if possible}
        <span class="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-amber-400/80 bg-amber-950/20 border border-amber-900/40 px-3 py-1 rounded-full">
          ⬡ Available
        </span>
      {:else}
        <span class="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-zinc-500 bg-zinc-900 border border-zinc-850 px-3 py-1 rounded-full">
          ■ Locked
        </span>
      {/if}

      {#if nodePositionIsBranch(selectedNode.position)}
        <span class="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
          Optional
        </span>
      {/if}
    </div>

    <!-- Title and description -->
    <div class="space-y-3">
      <h2 class="text-xl md:text-2xl font-semibold tracking-tight text-zinc-100 leading-tight">
        {selectedNode.title}
      </h2>
      <p class="text-xs md:text-sm text-zinc-500 leading-relaxed max-w-[90%]">
        {selectedNode.description}
      </p>
    </div>
  </div>

  <!-- Resource progress -->
  {#if totalResources > 0}
    <div class="px-6 md:px-8 lg:px-10 py-5 border-b border-white/5">
      <div class="flex items-center justify-between mb-2.5">
        <span class="text-[10px] uppercase tracking-[0.2em] font-mono text-zinc-500">Progress</span>
        <span class="text-[10px] font-mono text-zinc-400">{completedResources} of {totalResources}</span>
      </div>
      <div class="h-[3px] w-full bg-zinc-900 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-700 ease-out bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
          style="width: {resourcePercent}%"
        ></div>
      </div>
    </div>
  {/if}

  <!-- Resources list -->
  <div class="flex-1 min-h-0">
    {#if totalResources > 0}
      <button
        onclick={() => resourcesExpanded = !resourcesExpanded}
        class="w-full flex items-center justify-between px-6 md:px-8 lg:px-10 py-4 text-left hover:bg-white/[0.02] transition-colors group"
      >
        <span class="text-[10px] uppercase tracking-[0.2em] font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
          Resources
        </span>
        {#if resourcesExpanded}
          <ChevronUp class="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
        {:else}
          <ChevronDown class="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
        {/if}
      </button>
    {/if}

    {#if resourcesExpanded && totalResources > 0}
      <ul class="px-4 md:px-6 lg:px-8 pb-8 space-y-2">
        {#each selectedNode.resources as resource (resource.id)}
          <li class="group/item">
            <div class="flex items-start gap-4 p-3.5 rounded-xl transition-all duration-200
              {isUnlocked ? 'hover:bg-white/[0.04]' : 'opacity-30 cursor-not-allowed'}
              {resource.completed ? 'opacity-60' : ''}"
            >
              <!-- Checkbox -->
              <button
                onclick={() => toggleResource(resource.id)}
                disabled={!isUnlocked}
                class="mt-0.5 shrink-0 transition-transform active:scale-90 focus:outline-none
                  {resource.completed ? 'text-emerald-500' : 'text-zinc-700 hover:text-zinc-500'}
                  {!isUnlocked ? 'pointer-events-none' : ''}"
              >
                {#if resource.completed}
                  <CheckCircle2 class="w-5 h-5" />
                {:else}
                  <Circle class="w-5 h-5" />
                {/if}
              </button>

              <div class="flex-1 min-w-0 pt-0.5">
                <div class="flex items-start justify-between gap-4">
                    <span class="text-xs md:text-[13px] font-medium leading-normal
                    {resource.completed ? 'text-zinc-500 line-through' : 'text-zinc-200'}">
                    {resource.title}
                    </span>

                    {#if isUnlocked}
                    <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="shrink-0 p-1 -m-1 text-white opacity-40 group-hover/item:opacity-100 transition-all hover:scale-110"
                        title="Open Resource"
                    >
                        <ExternalLink class="w-4 h-4" strokeWidth={2.5} />
                    </a>
                    {/if}
                </div>

                {#if resource.description && 
                     resource.description.trim() !== '' && 
                     !resource.description.toLowerCase().includes('resource description')}
                  <p class="text-[11px] text-zinc-500 leading-relaxed mt-2 pr-4">
                    {resource.description}
                  </p>
                {/if}
              </div>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <!-- Footer actions -->
  <div class="mt-auto shrink-0">
    {#if !isUnlocked}
      <div class="p-6 md:p-8 lg:px-10 border-t border-white/5 bg-black/20">
        <div class="text-xs text-zinc-600 flex items-center gap-3 italic">
          <Lock class="w-4 h-4" />
          Reach this milestone to unlock resources.
        </div>
      </div>
    {:else if allResourcesDone && selectedNode.status !== 'completed'}
      <div class="p-6 md:p-8 lg:px-10 border-t border-white/5 bg-black/20">
        <div class="space-y-4">
          <div class="text-[10px] text-emerald-400 font-mono tracking-widest uppercase text-center">
            Ready to progress
          </div>
          <button class="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all active:scale-[0.98]">
            Mark Complete
            <ArrowRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .scrollbar-thin {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.05) transparent;
  }
</style>