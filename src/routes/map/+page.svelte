<!-- src/routes/map/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { ChevronDown } from 'lucide-svelte';
  import { nodes as initialNodes } from '$lib/nodesData';
  import { ROW_HEIGHT } from '$lib/utils';
  import type { NodeResource } from '$lib/types';
  import { saveStore, loadStore } from '$lib/persist';
  import type { MapStore } from '$lib/persist';
  import WelcomeBanner from '../../components/WelcomeBanner.svelte';
  import SkillTreeCanvas from '../../components/SkillTreeCanvas.svelte';
  import DetailPanel from '../../components/DetailPanel.svelte';

  // ── Hydrate nodes from localStorage on mount ──────────────
  // Static content (title, description, icon, resources list)
  // always comes from nodesData.ts. We only persist & restore:
  //   • node.status
  //   • which resource IDs are completed
  function hydrateNodes() {
    const saved = loadStore<MapStore>('map', []);
    if (!saved.length) return initialNodes.map(n => ({
      ...n,
      resources: n.resources.map(r => ({ ...r }))
    }));

    return initialNodes.map(n => {
      const savedNode = saved.find(s => s.id === n.id);
      if (!savedNode) return { ...n, resources: n.resources.map(r => ({ ...r })) };
      return {
        ...n,
        status: savedNode.status,
        resources: n.resources.map(r => ({
          ...r,
          completed: savedNode.resourceIds.includes(r.id)
        }))
      };
    });
  }

  function serializeNodes(nodes: typeof initialNodes): MapStore {
    return nodes.map(n => ({
      id: n.id,
      status: n.status,
      resourceIds: n.resources.filter(r => r.completed).map(r => r.id)
    }));
  }

  let nodes = $state(hydrateNodes());
  let showWelcomeBanner = $state(true);
  let selectedNode = $state(nodes.find(n => n.status === 'current') || nodes[0]);

  const maxLevel = $derived(Math.max(...nodes.map(n => n.level)));
  const mapHeight = $derived((maxLevel + 1) * ROW_HEIGHT);
  const currentNode = $derived(nodes.find(n => n.status === 'current') || nodes[0]);
  const completedCount = $derived(nodes.filter(n => n.status === 'completed').length);
  const totalCount = nodes.length;
  const progressPercent = $derived(Math.round((completedCount / totalCount) * 100));
  const nextMilestone = $derived(
    nodes.find(n => n.level === currentNode.level + 1 && n.position === 'center')?.title || 'N/A'
  );
  const selectedNodeSynced = $derived(
    nodes.find(n => n.id === selectedNode.id) || nodes[0]
  );

  // ── Auto-save whenever nodes changes ──────────────────────
  $effect(() => {
    saveStore('map', serializeNodes(nodes));
  });

  function handleNodeUpdate(nodeId: string, updatedResources: NodeResource[]) {
    nodes = nodes.map(n => {
      if (n.id !== nodeId) return n;
      const allDone = updatedResources.every(r => r.completed);
      return {
        ...n,
        resources: updatedResources,
        status: allDone && n.status !== 'completed' ? 'completed' : n.status,
      };
    });
  }
</script>

<div class="h-full w-full flex flex-col md:flex-row relative selection:bg-zinc-800 selection:text-zinc-100 bg-black overflow-hidden">
  <div class="flex-1 h-[60vh] md:h-full relative flex flex-col border-b md:border-b-0 md:border-r border-white/10 shrink-0 md:shrink min-h-0 overflow-hidden">
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
  <DetailPanel
    selectedNode={selectedNodeSynced}
    {nodes}
    onNodeUpdate={handleNodeUpdate}
  />
</div>