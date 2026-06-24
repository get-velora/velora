<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { ChevronDown } from 'lucide-svelte';
  import { nodes } from '$lib/nodesData';
  import { ROW_HEIGHT } from '$lib/utils';
  
  import WelcomeBanner from '../components/WelcomeBanner.svelte';
  import SkillTreeCanvas from '../components/SkillTreeCanvas.svelte';
  import DetailPanel from '../components/DetailPanel.svelte';

  // State
  let showWelcomeBanner = $state(true);
  let selectedNode = $state(nodes.find(n => n.status === 'current') || nodes[0]);

  // Derived Values
  const maxLevel = $derived(Math.max(...nodes.map(n => n.level)));
  const mapHeight = $derived((maxLevel + 1) * ROW_HEIGHT);
  const currentNode = $derived(nodes.find(n => n.status === 'current') || nodes[0]);
  
  const completedCount = $derived(nodes.filter(n => n.status === 'completed').length);
  const totalCount = nodes.length;
  const progressPercent = $derived(Math.round((completedCount / totalCount) * 100));
  
  const nextMilestone = $derived(
    nodes.find(n => n.level === currentNode.level + 1 && n.position === 'center')?.title || 'N/A'
  );
</script>

<!-- Using h-full w-full to perfectly adapt to the layout's remaining vertical viewport slot -->
<div class="h-full w-full flex flex-col md:flex-row relative selection:bg-zinc-800 selection:text-zinc-100 bg-black overflow-hidden">
  
  <!-- Map Progression Area -->
  <div class="flex-1 h-[60vh] md:h-full relative flex flex-col border-b md:border-b-0 md:border-r border-white/10 shrink-0 md:shrink min-h-0 overflow-hidden">
    
    <!-- Floating Header Restorer -->
    {#if !showWelcomeBanner}
      <button 
        onclick={() => showWelcomeBanner = true}
        class="absolute top-4 left-1/2 -translate-x-1/2 z-50 h-8 w-8 rounded-full bg-black/90 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-zinc-100 flex items-center justify-center transition-all shadow-lg shadow-black/40 backdrop-blur-md focus:outline-none"
        aria-label="Expand Overview"
      >
        <ChevronDown class="w-4 h-4" />
      </button>
    {/if}

    <WelcomeBanner 
      bind:show={showWelcomeBanner} 
      {completedCount}
      {totalCount}
      {progressPercent}
      currentNodeTitle={currentNode.title}
      {nextMilestone}
    />

    <SkillTreeCanvas 
      {nodes}
      bind:selectedNode
      {currentNode}
      {maxLevel}
      {mapHeight}
    />
  </div>

  <!-- Detail Action Panel -->
  <DetailPanel 
    {selectedNode} 
    {nodes} 
  />

</div>