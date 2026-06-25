<!-- src/components/DetailPanel.svelte -->
<script lang="ts">
  import { Lock, ArrowRight, ExternalLink, CheckCircle2, Circle, BookOpen, Video, Wrench, FileText, Calculator, ScrollText, ChevronDown, ChevronUp } from 'lucide-svelte';
  import type { PathfinderNode, NodeResource, ResourceType } from '../lib/types';
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

  // Track which resource section is expanded
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

  function getResourceIcon(type: ResourceType) {
    switch (type) {
      case 'video': return Video;
      case 'tool': return Wrench;
      case 'guide': return ScrollText;
      case 'official': return FileText;
      case 'calculator': return Calculator;
      default: return BookOpen;
    }
  }

  function getResourceTypeLabel(type: ResourceType): string {
    switch (type) {
      case 'video': return 'Video';
      case 'tool': return 'Tool';
      case 'guide': return 'Guide';
      case 'official': return 'Official';
      case 'calculator': return 'Calculator';
      default: return 'Article';
    }
  }

  function getResourceTypeBadgeClass(type: ResourceType): string {
    switch (type) {
      case 'video': return 'text-purple-400 bg-purple-950/40 border-purple-900/60';
      case 'tool': return 'text-blue-400 bg-blue-950/40 border-blue-900/60';
      case 'guide': return 'text-amber-400 bg-amber-950/40 border-amber-900/60';
      case 'official': return 'text-emerald-400 bg-emerald-950/40 border-emerald-900/60';
      case 'calculator': return 'text-pink-400 bg-pink-950/40 border-pink-900/60';
      default: return 'text-zinc-400 bg-zinc-900 border-zinc-800';
    }
  }
</script>

<div class="w-full md:w-72 lg:w-96 h-auto md:h-full bg-zinc-950/20 flex flex-col shrink-0 relative z-10 border-t md:border-t-0 border-white/10 overflow-y-auto overscroll-contain scrollbar-thin select-text min-w-0 break-words">

  <!-- Header Section -->
  <div class="p-5 md:p-6 lg:p-8 pb-4 border-b border-white/5 space-y-4">

    <!-- Status Badges -->
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

      {#if selectedNode.track}
        <span class="inline-flex items-center gap-1 text-[9px] md:text-[10px] uppercase font-mono tracking-wider text-sky-400 bg-sky-950/30 border border-sky-900/60 px-2.5 py-0.5 rounded-full">
          {selectedNode.track}
        </span>
      {/if}
    </div>

    <!-- Title & Description -->
    <div class="space-y-2">
      <h2 class="text-lg md:text-xl font-semibold tracking-tight text-zinc-100">
        {selectedNode.title}
      </h2>
      <p class="text-[11px] md:text-xs text-zinc-400 leading-relaxed">
        {selectedNode.description}
      </p>
    </div>
  </div>

  <!-- Resource Progress Bar -->
  {#if totalResources > 0}
    <div class="px-5 md:px-6 lg:px-8 py-3 border-b border-white/5">
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-[9px] uppercase tracking-wider font-mono text-zinc-500">Resources</span>
        <span class="text-[10px] font-mono text-zinc-400">{completedResources}/{totalResources}</span>
      </div>
      <div class="h-[2px] w-full bg-zinc-900 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-500
            {allResourcesDone ? 'bg-emerald-500' : 'bg-amber-400'}"
          style="width: {resourcePercent}%"
        ></div>
      </div>
    </div>
  {/if}

  <!-- Resources List -->
  <div class="flex-1 min-h-0">

    <!-- Resources Toggle Header -->
    {#if totalResources > 0}
      <button
        onclick={() => resourcesExpanded = !resourcesExpanded}
        class="w-full flex items-center justify-between px-5 md:px-6 lg:px-8 py-3 text-left hover:bg-white/[0.02] transition-colors group"
      >
        <span class="text-[10px] uppercase tracking-widest font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors">
          Learning Resources
        </span>
        {#if resourcesExpanded}
          <ChevronUp class="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
        {:else}
          <ChevronDown class="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
        {/if}
      </button>
    {/if}

    {#if resourcesExpanded && totalResources > 0}
      <ul class="px-3 md:px-4 lg:px-5 pb-4 space-y-1">
        {#each selectedNode.resources as resource (resource.id)}
          <li class="group relative">
            <div class="flex items-start gap-3 p-2.5 rounded-lg transition-colors
              {isUnlocked ? 'hover:bg-white/[0.03] cursor-default' : 'opacity-40 cursor-not-allowed'}
              {resource.completed ? 'opacity-70' : ''}"
            >
              <!-- Checkbox -->
              <button
                onclick={() => toggleResource(resource.id)}
                disabled={!isUnlocked}
                class="mt-0.5 shrink-0 text-zinc-600 hover:text-zinc-300 transition-colors focus:outline-none
                  {resource.completed ? 'text-emerald-500 hover:text-emerald-400' : ''}
                  {!isUnlocked ? 'pointer-events-none' : ''}"
                aria-label="Toggle resource: {resource.title}"
              >
                {#if resource.completed}
                  <CheckCircle2 class="w-4 h-4" />
                {:else}
                  <Circle class="w-4 h-4" />
                {/if}
              </button>

              <!-- Content -->
              <div class="flex-1 min-w-0 space-y-1">
                <div class="flex items-start gap-2">
                  <span class="text-[11px] md:text-xs font-medium leading-snug
                    {resource.completed ? 'text-zinc-500 line-through' : 'text-zinc-200'}">
                    {resource.title}
                  </span>
                </div>

                <div class="flex items-center gap-2">
                  <!-- Type Badge -->
                  <span class="inline-flex items-center gap-1 text-[8px] uppercase tracking-wider font-mono border px-1.5 py-0.5 rounded
                    {getResourceTypeBadgeClass(resource.type)}">
                    <svelte:component this={getResourceIcon(resource.type)} class="w-2.5 h-2.5" />
                    {getResourceTypeLabel(resource.type)}
                  </span>

                  <!-- External Link -->
                  {#if isUnlocked}
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onclick={(e) => e.stopPropagation()}
                      class="inline-flex items-center gap-1 text-[9px] text-zinc-600 hover:text-zinc-300 transition-colors font-mono"
                      aria-label="Open {resource.title}"
                    >
                      <ExternalLink class="w-2.5 h-2.5" />
                      Open
                    </a>
                  {/if}
                </div>

                {#if resource.description && resource.description !== 'Resource description placeholder — replace with real content.'}
                  <p class="text-[10px] text-zinc-500 leading-relaxed">
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

  <!-- Footer Action -->
  <div class="p-5 md:p-6 lg:px-8 border-t border-white/5 mt-auto shrink-0">
    {#if selectedNode.status === 'completed'}
      <div class="text-[11px] md:text-xs text-zinc-500 font-mono">
        ✓ Completed. Review resources above anytime.
      </div>
    {:else if selectedNode.status === 'current' || possible}
      {#if allResourcesDone}
        <div class="space-y-2">
          <div class="text-[10px] text-emerald-400 font-mono mb-2">
            ✓ All resources reviewed
          </div>
          <button class="w-full h-10 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-150">
            Mark as Complete
            <ArrowRight class="w-3.5 h-3.5" />
          </button>
        </div>
      {:else}
        <button class="w-full h-10 bg-white hover:bg-zinc-200 text-black text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-150">
          Begin Module
          <ArrowRight class="w-3.5 h-3.5" />
        </button>
        {#if totalResources > 0}
          <p class="text-[9px] text-zinc-600 font-mono mt-2 text-center">
            Check off resources above as you complete them
          </p>
        {/if}
      {/if}
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
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  }
</style>