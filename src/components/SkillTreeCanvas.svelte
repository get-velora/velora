<script lang="ts">
  import { onDestroy } from 'svelte';
  import { Check, Lock } from 'lucide-svelte';
  import type { PathfinderNode } from '../lib/types';
  import { MAP_WIDTH, getCoordinates, isPossibleToComplete } from '../lib/utils';

  interface Props {
    nodes: PathfinderNode[];
    selectedNode: PathfinderNode;
    currentNode: PathfinderNode;
    maxLevel: number;
    mapHeight: number;
  }

  let { 
    nodes, 
    selectedNode = $bindable(), 
    currentNode, 
    maxLevel, 
    mapHeight 
  }: Props = $props();

  const levels = $derived(Array.from({ length: maxLevel }, (_, i) => i));

  let viewportContainer = $state<HTMLDivElement | null>(null);
  let isPanningEnabled = $state(false); 
  let containerWidth = $state(520); // Track physical width of viewport
  
  let targetX = $state(0);
  let targetY = $state(0);
  let panX = $state(0);
  let panY = $state(0);

  let scrollTop = $state(0);
  let scrollHeight = $state(0);
  let clientHeight = $state(0);
  let isDragging = $state(false);
  let isScrollActive = $state(false);
  let isHoveringScrollbar = $state(false);
  
  let revertTimeout: ReturnType<typeof setTimeout>;
  let fadeTimeout: ReturnType<typeof setTimeout>;
  let animationFrameId: number;
  let scrollResetTimeout: ReturnType<typeof setTimeout>;
  let lastProgrammaticScrollTime = 0;

  // Responsive scale factor: scales canvas down if the container is narrower than MAP_WIDTH (520px)
  const scale = $derived(containerWidth < MAP_WIDTH ? Math.max(0.65, containerWidth / MAP_WIDTH) : 1);

  function updateCameraPhysics() {
    const easeFactor = 0.07;
    panX += (targetX - panX) * easeFactor;
    panY += (targetY - panY) * easeFactor;

    if (Math.abs(targetX - panX) < 0.05) panX = targetX;
    if (Math.abs(targetY - panY) < 0.05) panY = targetY;

    animationFrameId = requestAnimationFrame(updateCameraPhysics);
  }

  $effect(() => {
    if (!viewportContainer) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        containerWidth = entry.contentRect.width;
        
        const widthBuffer = 40;
        // Panning is only enabled if the container is narrower than the scaled canvas width
        isPanningEnabled = containerWidth < ((MAP_WIDTH * scale) + widthBuffer);

        if (!isPanningEnabled) {
          targetX = 0;
          targetY = 0;
        }

        const target = entry.target as HTMLDivElement;
        scrollTop = target.scrollTop;
        scrollHeight = target.scrollHeight;
        clientHeight = target.clientHeight;
      }
    });

    observer.observe(viewportContainer);
    return () => observer.disconnect();
  });

  $effect(() => {
    if (!viewportContainer) return;
    const coords = getCoordinates(selectedNode.level, selectedNode.position, maxLevel);

    const scrollTimer = setTimeout(() => {
      if (!viewportContainer) return;
      const viewportHeight = viewportContainer.clientHeight;
      // Offset center coordinate factoring in visual scale scale
      const targetScrollTop = (coords.y * scale) - (viewportHeight / 2);

      lastProgrammaticScrollTime = Date.now();
      viewportContainer.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }, 150);

    return () => clearTimeout(scrollTimer);
  });

  $effect(() => {
    animationFrameId = requestAnimationFrame(updateCameraPhysics);
    return () => cancelAnimationFrame(animationFrameId);
  });

  function handleMouseMove(event: MouseEvent) {
    if (!viewportContainer || !isPanningEnabled) return;
    clearTimeout(revertTimeout);

    const rect = viewportContainer.getBoundingClientRect();
    const mouseXFromCenter = event.clientX - (rect.left + rect.width / 2);
    const mouseYFromCenter = event.clientY - (rect.top + rect.height / 2);
    const deadZone = 100; 

    if (Math.abs(mouseXFromCenter) > deadZone) {
      const sign = Math.sign(mouseXFromCenter);
      const activeAmount = Math.abs(mouseXFromCenter) - deadZone;
      targetX = -sign * activeAmount * 0.75;
      targetY = -mouseYFromCenter * 0.15; 
    } else {
      targetX = 0;
      targetY = 0;
    }
    revertTimeout = setTimeout(resetCameraTarget, 1200);
  }

  function handleMouseLeave() {
    if (!isPanningEnabled) return;
    clearTimeout(revertTimeout);
    revertTimeout = setTimeout(resetCameraTarget, 1200);
  }

  function resetCameraTarget() {
    targetX = 0;
    targetY = 0;
  }

  function scrollToCurrentNode() {
    if (!viewportContainer) return;
    const coords = getCoordinates(currentNode.level, currentNode.position, maxLevel);
    const viewportHeight = viewportContainer.clientHeight;
    const targetScrollTop = (coords.y * scale) - (viewportHeight / 2);

    if (Math.abs(viewportContainer.scrollTop - targetScrollTop) < 3) return;

    viewportContainer.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    });
  }

  function handleScroll() {
    if (!viewportContainer) return;
    scrollTop = viewportContainer.scrollTop;
    scrollHeight = viewportContainer.scrollHeight;
    clientHeight = viewportContainer.clientHeight;

    isScrollActive = true;
    clearTimeout(fadeTimeout);
    fadeTimeout = setTimeout(() => {
      isScrollActive = false;
    }, 800);

    clearTimeout(scrollResetTimeout);

    if (Date.now() - lastProgrammaticScrollTime < 1000 || isDragging) return;

    scrollResetTimeout = setTimeout(() => {
      scrollToCurrentNode();
    }, 4000);
  }

  const thumbHeight = $derived.by(() => {
    if (scrollHeight <= clientHeight) return 0;
    const ratio = clientHeight / scrollHeight;
    return Math.max(ratio * clientHeight, 24) / 1.8; 
  });

  const thumbTop = $derived.by(() => {
    const maxScrollTop = scrollHeight - clientHeight;
    if (maxScrollTop <= 0) return 0;
    const scrollableTrackHeight = clientHeight - thumbHeight;
    return (scrollTop / maxScrollTop) * scrollableTrackHeight;
  });

  const showScrollbar = $derived(isScrollActive || isDragging || isHoveringScrollbar);

  let startY = 0;
  let startScrollTop = 0;

  function handleThumbMouseDown(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    isDragging = true;
    startY = e.clientY;
    startScrollTop = scrollTop;
    window.addEventListener('mousemove', handleThumbMouseMove);
    window.addEventListener('mouseup', handleThumbMouseUp);
  }

  function handleThumbMouseMove(e: MouseEvent) {
    if (!isDragging || !viewportContainer) return;
    const deltaY = e.clientY - startY;
    const scrollableTrackHeight = clientHeight - thumbHeight;
    const maxScrollTop = scrollHeight - clientHeight;
    if (scrollableTrackHeight <= 0) return;

    const ratio = maxScrollTop / scrollableTrackHeight;
    viewportContainer.scrollTop = startScrollTop + deltaY * ratio;
  }

  function handleThumbMouseUp() {
    isDragging = false;
    window.removeEventListener('mousemove', handleThumbMouseMove);
    window.removeEventListener('mouseup', handleThumbMouseUp);

    clearTimeout(scrollResetTimeout);
    scrollResetTimeout = setTimeout(() => {
      scrollToCurrentNode();
    }, 4000);
  }

  function handleTrackClick(e: MouseEvent) {
    if (!viewportContainer) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const clickPercent = clickY / clientHeight;
    const targetScroll = clickPercent * scrollHeight - clientHeight / 2;
    viewportContainer.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }

  onDestroy(() => {
    clearTimeout(scrollResetTimeout);
    clearTimeout(revertTimeout);
    clearTimeout(fadeTimeout);
  });
</script>

<div class="flex-1 min-h-0 relative w-full flex flex-col z-10">
  <div 
    bind:this={viewportContainer}
    onscroll={handleScroll}
    onmousemove={handleMouseMove}
    onmouseleave={handleMouseLeave}
    class="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center py-12 select-none scroll-smooth hide-scrollbar"
  >
    <!-- Applied adaptive scale factor & scale origins -->
    <div 
      class="relative z-10 will-change-transform origin-top" 
      style="
        width: {MAP_WIDTH}px; 
        height: {mapHeight * scale}px;
        transform: translate3d({panX}px, {panY}px, 0) scale({scale});
      "
    >
      <!-- Vertical Paths Connector SVG -->
      <svg 
        class="absolute inset-0 pointer-events-none z-0" 
        width={MAP_WIDTH} 
        height={mapHeight} 
        viewBox="0 0 {MAP_WIDTH} {mapHeight}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {#each levels as level}
          {@const coordsStart = getCoordinates(level, 'center', maxLevel)}
          {@const coordsEnd = getCoordinates(level + 1, 'center', maxLevel)}
          <line 
            x1={coordsStart.x} 
            y1={coordsStart.y} 
            x2={coordsEnd.x} 
            y2={coordsEnd.y} 
            stroke="rgba(255, 255, 255, 0.12)" 
            stroke-width="2" 
            stroke-linecap="round"
          />
        {/each}

        {#each nodes as node}
          {#if node.position !== 'center'}
            {@const coords = getCoordinates(node.level, node.position, maxLevel)}
            <line 
              x1={MAP_WIDTH / 2} 
              y1={coords.y} 
              x2={coords.x} 
              y2={coords.y} 
              stroke="rgba(255, 255, 255, 0.12)" 
              stroke-width="2" 
              stroke-linecap="round"
            />
          {/if}
        {/each}
      </svg>

      <!-- Node Rendering Map -->
      {#each nodes as node}
        {@const coords = getCoordinates(node.level, node.position, maxLevel)}
        {@const possible = isPossibleToComplete(node, nodes)}

        <div 
          class="absolute flex flex-col items-center w-28 -translate-x-14"
          style="left: {coords.x}px; top: {coords.y - 28}px;"
        >
          <button
            onclick={() => selectedNode = node}
            class="relative h-14 w-14 rounded-full flex items-center justify-center border transition-all duration-300 focus:outline-none z-20 shadow-lg
              {node.id === selectedNode.id ? 'scale-110' : 'hover:scale-105'}
              {node.status === 'completed' ? 'bg-emerald-500 border-emerald-400 text-white shadow-emerald-950/40' : ''}
              {node.status === 'current' ? 'bg-amber-400 text-black border-amber-300 shadow-amber-400/25 shadow-xl' : ''}
              {possible ? 'bg-zinc-950 border-amber-400 text-amber-400 hover:bg-[#181611] hover:border-amber-300 shadow-amber-400/5 shadow-md' : ''}
              {node.status === 'upcoming' && !possible ? 'bg-zinc-950 border-zinc-850 text-zinc-600 hover:border-zinc-700' : ''}"
            aria-label="View node: {node.title}"
          >
            {#if node.status === 'current'}
              <span class="absolute inset-0 rounded-full bg-amber-400/25 animate-gentle-pulse pointer-events-none"></span>
            {/if}

            {#if node.status === 'completed'}
              <Check class="w-5 h-5 stroke-[2.5]" />
            {:else if possible || node.status === 'current'}
              <svelte:component this={node.icon} class="w-5 h-5 stroke-[2.5]" />
            {:else}
              <Lock class="w-4 h-4 stroke-[2]" />
            {/if}
          </button>

          <span class="mt-2 text-[8px] font-semibold tracking-tight uppercase select-none text-center leading-tight max-w-[100px]
            {node.status === 'completed' ? 'text-emerald-500/80' : ''}
            {node.status === 'current' ? 'text-zinc-100 font-bold' : ''}
            {possible ? 'text-amber-400/80 font-medium' : ''}
            {node.status === 'upcoming' && !possible ? 'text-zinc-600' : ''}">
            {node.title}
          </span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Custom Scrollbar Elements -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div 
    class="absolute right-0 top-1 bottom-1 w-[2px] z-30 pointer-events-auto cursor-pointer"
    onclick={handleTrackClick}
    onmouseenter={() => isHoveringScrollbar = true}
    onmouseleave={() => isHoveringScrollbar = false}
    role="presentation"
  >
    {#if thumbHeight > 0}
      <div 
        role="scrollbar"
        aria-controls="viewport-container"
        aria-valuenow={scrollTop}
        class="absolute right-[0.5px] bg-white rounded-full hover:bg-zinc-200 active:bg-zinc-300 transition-opacity duration-300"
        style="top: {thumbTop}px; height: {thumbHeight}px; width: 1.4px; opacity: {showScrollbar ? 1 : 0}; pointer-events: {showScrollbar ? 'auto' : 'none'};"
        onmousedown={handleThumbMouseDown}
      ></div>
    {/if}
  </div>
</div>

<style>
  @keyframes gentle-pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.15);
      opacity: 0.15;
    }
  }

  .animate-gentle-pulse {
    animation: gentle-pulse 2.5s infinite ease-in-out;
  }

  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>