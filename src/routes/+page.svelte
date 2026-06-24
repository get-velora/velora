<script lang="ts">
  import { 
    Check, 
    Lock, 
    Compass, 
    GraduationCap, 
    Sparkles, 
    Flag, 
    User, 
    ArrowRight,
    Search,
    BookOpen,
    X,
    ChevronDown
  } from 'lucide-svelte';
  import { onDestroy } from 'svelte';
  import { slide } from 'svelte/transition';

  // =================================================================
  // 1. SCALABLE DATA STRUCTURE
  // =================================================================
  const nodes = [
    // --- LEVEL 10 (Top - Incomplete) ---
    { 
      id: "node-10", 
      title: "The Pathfinder Match", 
      description: "Query regional databases for summer cohorts, merit tuition scholarships, and research grants.",
      status: "upcoming",
      level: 10,
      position: "center", 
      icon: Flag
    },
    // --- LEVEL 9 (Incomplete) ---
    { 
      id: "node-9", 
      title: "Merit Scholarship Query", 
      description: "Identify institutional and private merit scholarships that align with your target GPA and standardized test scores.",
      status: "upcoming",
      level: 9,
      position: "center", 
      icon: Search
    },
    // --- LEVEL 8 (Incomplete) ---
    { 
      id: "node-8", 
      title: "Summer Cohort Filter", 
      description: "Review and short-list competitive pre-college summer academic programs, laboratory internships, and research fellowships.",
      status: "upcoming",
      level: 8,
      position: "center", 
      icon: Compass
    },
    // --- LEVEL 7 (Incomplete) ---
    { 
      id: "node-7", 
      title: "PSAT Prep Baseline", 
      description: "Take a raw, diagnostic PSAT or SAT baseline test on Khan Academy to measure your quantitative and verbal range.",
      status: "upcoming",
      level: 7,
      position: "center", 
      icon: Search
    },
    // --- LEVEL 6 (Incomplete) ---
    { 
      id: "node-6", 
      title: "EC Baseline Audit", 
      description: "Audit your extracurriculars to shift from passive membership to active, measurable leadership roles.",
      status: "upcoming",
      level: 6,
      position: "center", 
      icon: Compass
    },
    { 
      id: "node-6-opt-l", 
      title: "Community Log", 
      description: "Optional: Start recording volunteer hours at a local charity to satisfy state service grants.",
      status: "upcoming",
      level: 6,
      position: "left", 
      icon: BookOpen
    },
    { 
      id: "node-6-opt-r", 
      title: "Club Officer Prep", 
      description: "Optional: Draft a proposal to run for a leadership role in your high school's active clubs.",
      status: "upcoming",
      level: 6,
      position: "right", 
      icon: Sparkles
    },
    // --- LEVEL 5 (Current / Active Focus Node) ---
    { 
      id: "node-5", 
      title: "Fall Semester Map", 
      description: "Map out your fall semester course load. Selective universities expect STEM majors to show calculus readiness.",
      status: "current", // Active Node
      level: 5,
      position: "center", 
      icon: Sparkles
    },
    { 
      id: "node-5-opt-r", 
      title: "Honors Selection", 
      description: "Optional: Verify if you can double-enroll in honors science tracks for an advanced course load.",
      status: "upcoming",
      level: 5,
      position: "right", 
      icon: GraduationCap
    },
    // --- LEVEL 4 (Completed) ---
    { 
      id: "node-4", 
      title: "Honor Rigor Audit", 
      description: "Analyzed freshman coursework and mapped Honors weights to verify GPA safety benchmarks.",
      status: "completed",
      level: 4,
      position: "center", 
      icon: GraduationCap
    },
    { 
      id: "node-4-opt-l", 
      title: "Catalog Review", 
      description: "Optional: Walk through your high school's complete course catalog to map pre-requisites early.",
      status: "completed",
      level: 4,
      position: "left", 
      icon: Search
    },
    // --- LEVEL 3 (Completed) ---
    { 
      id: "node-3", 
      title: "Local Profile Built", 
      description: "You successfully completed onboarding, set your target track (STEM Focus), and declared in-state parameters.",
      status: "completed",
      level: 3,
      position: "center", 
      icon: User
    },
    // --- LEVEL 2 (Completed) ---
    { 
      id: "node-2", 
      title: "Academic Baseline", 
      description: "Synced past standard coursework and confirmed weighted average calculations against school-specific scales.",
      status: "completed",
      level: 2,
      position: "center", 
      icon: Check
    },
    // --- LEVEL 1 (Completed) ---
    { 
      id: "node-1", 
      title: "GPA Target Set", 
      description: "Calculated stretch and safety targets for cumulative GPA benchmarks required by preferred universities.",
      status: "completed",
      level: 1,
      position: "center", 
      icon: Check
    },
    // --- LEVEL 0 (Bottom - Completed) ---
    { 
      id: "node-0", 
      title: "Onboarding Init", 
      description: "Account created and validated. Welcome to your personalized high school curriculum pathfinder.",
      status: "completed",
      level: 0,
      position: "center", 
      icon: User
    }
  ];

  // =================================================================
  // 2. MATHEMATICAL GRID ALGORITHM & CONFIG
  // =================================================================
  const rowHeight = 140; // Spacing distance between rows
  const nodePadding = 30; // Top margin padding
  const mapWidth = 520; // Expanded base width to allow wider branches

  // Automatically find the highest level in the data layer
  const maxLevel = $derived(Math.max(...nodes.map(n => n.level)));
  
  // Dynamically calculate total canvas height based on the dataset
  const mapHeight = $derived((maxLevel + 1) * rowHeight);

  // Active Focus/Current node helper
  const currentNode = $derived(nodes.find(n => n.status === 'current') || nodes[0]);

  // Derived concrete array of numeric levels for robust compiler rendering loops
  const levels = $derived(Array.from({ length: maxLevel }, (_, i) => i));

  // Welcome panel state & calculations
  let showWelcomeBanner = $state(true);
  const currentHour = new Date().getHours();
  const greeting = $derived(
    currentHour < 12 
      ? "Rise and shine, Pathfinder" 
      : "Hey Pathfinder, ready to dive into this?"
  );

  const completedCount = $derived(nodes.filter(n => n.status === 'completed').length);
  const totalCount = nodes.length;
  const progressPercent = $derived(Math.round((completedCount / totalCount) * 100));
  const nextMilestone = $derived(
    nodes.find(n => n.level === currentNode.level + 1 && n.position === 'center')?.title || 'N/A'
  );

  // Maps a node's level & position to exact X/Y coordinates
  function getCoordinates(level: number, position: string) {
    const y = nodePadding + (maxLevel - level) * rowHeight;
    const centerX = mapWidth / 2;
    
    let x = centerX;
    if (position === 'left') x = centerX - 150;  // Spaced out wider
    if (position === 'right') x = centerX + 150; // Spaced out wider
    
    return { x, y };
  }

  // Determines if a locked node is unlocked and available to be started (either trunk or branch)
  function isPossibleToComplete(node: typeof nodes[0]) {
    if (node.status === 'completed') return false;
    if (node.status === 'current') return false;

    // A center node is available if the previous level's center node is completed
    if (node.position === 'center') {
      if (node.level === 0) return false;
      const prevCenter = nodes.find(n => n.level === node.level - 1 && n.position === 'center');
      return prevCenter?.status === 'completed';
    }

    // A branch node is available if its corresponding same-level center node is completed OR active (current)
    const sameLevelCenter = nodes.find(n => n.level === node.level && n.position === 'center');
    return sameLevelCenter?.status === 'completed' || sameLevelCenter?.status === 'current';
  }

  // Active state node tracker - Default is the active ("current") node
  let selectedNode = $state(nodes.find(n => n.status === 'current') || nodes[0]);

  // =================================================================
  // 3. CAMERA MOTION & INTERACTION TIMERS (Svelte 5 Runes)
  // =================================================================
  let viewportContainer = $state<HTMLDivElement | null>(null);
  let isPanningEnabled = $state(false); // Controlled by ResizeObserver
  
  // Camera coordinate States
  let targetX = $state(0);
  let targetY = $state(0);
  let panX = $state(0);
  let panY = $state(0);

  // Custom Scrollbar States
  let scrollTop = $state(0);
  let scrollHeight = $state(0);
  let clientHeight = $state(0);
  let isDragging = $state(false);
  let isScrollActive = $state(false);
  let isHoveringScrollbar = $state(false);
  
  let revertTimeout: ReturnType<typeof setTimeout>;
  let fadeTimeout: ReturnType<typeof setTimeout>;
  let animationFrameId: number;

  // Linear Interpolation (LERP) loop for rendering physics-based transitions
  function updateCameraPhysics() {
    const easeFactor = 0.07;
    
    panX += (targetX - panX) * easeFactor;
    panY += (targetY - panY) * easeFactor;

    // Prevent endless floating-point micro-renders when camera is virtually at rest
    if (Math.abs(targetX - panX) < 0.05) panX = targetX;
    if (Math.abs(targetY - panY) < 0.05) panY = targetY;

    animationFrameId = requestAnimationFrame(updateCameraPhysics);
  }

  // Monitor size of the parent container to toggle panning automatically
  $effect(() => {
    if (!viewportContainer) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const widthBuffer = 40;
        isPanningEnabled = entry.contentRect.width < (mapWidth + widthBuffer);

        if (!isPanningEnabled) {
          targetX = 0;
          targetY = 0;
        }

        // Safely updates scroll metrics from observed target to avoid TS checks
        const target = entry.target as HTMLDivElement;
        scrollTop = target.scrollTop;
        scrollHeight = target.scrollHeight;
        clientHeight = target.clientHeight;
      }
    });

    observer.observe(viewportContainer);
    return () => {
      observer.disconnect();
    };
  });

  // Track the timestamp of any user-selected programmatic scrolling
  let lastProgrammaticScrollTime = 0;

  // Automatically scroll the viewport to center the selected/current node on load or changes
  $effect(() => {
    if (!viewportContainer) return;

    const coords = getCoordinates(selectedNode.level, selectedNode.position);

    const scrollTimer = setTimeout(() => {
      if (!viewportContainer) return;
      const viewportHeight = viewportContainer.clientHeight;
      const targetScrollTop = coords.y - (viewportHeight / 2);

      lastProgrammaticScrollTime = Date.now(); // Ignore programmatic scroll events from starting the 4s snapback

      viewportContainer.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }, 150); // Margin delay to ensure complete browser rendering cycle

    return () => {
      clearTimeout(scrollTimer);
    };
  });

  // Register the physics loop to mount/unmount natively with the DOM lifecycle
  $effect(() => {
    animationFrameId = requestAnimationFrame(updateCameraPhysics);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  });

  function handleMouseMove(event: MouseEvent) {
    if (!viewportContainer || !isPanningEnabled) return;
    
    // Clear any active revert delay while the mouse is in active motion
    clearTimeout(revertTimeout);

    const rect = viewportContainer.getBoundingClientRect();
    const mouseXFromCenter = event.clientX - (rect.left + rect.width / 2);
    const mouseYFromCenter = event.clientY - (rect.top + rect.height / 2);

    // 100px Dead Zone: Cursor must move past this boundary to trigger panning
    const deadZone = 100; 

    if (Math.abs(mouseXFromCenter) > deadZone) {
      const sign = Math.sign(mouseXFromCenter);
      const activeAmount = Math.abs(mouseXFromCenter) - deadZone;
      
      // Calculate smooth destination offset
      targetX = -sign * activeAmount * 0.75;
      targetY = -mouseYFromCenter * 0.15; // Kept subtle to prevent jarring vertical jumps
    } else {
      // Return to horizontal baseline if within the dead zone
      targetX = 0;
      targetY = 0;
    }

    // Set a 1.2-second (1200ms) timer. If mouse stays idle, camera smoothly centers.
    revertTimeout = setTimeout(resetCameraTarget, 1200);
  }

  function handleMouseLeave() {
    if (!isPanningEnabled) return;
    clearTimeout(revertTimeout);
    // Begin 1.2-second delay to center the tree when pointer leaves the region
    revertTimeout = setTimeout(resetCameraTarget, 1200);
  }

  function resetCameraTarget() {
    targetX = 0;
    targetY = 0;
  }

  // =================================================================
  // 4. SCROLLBAR & SNAP-BACK TIMERS
  // =================================================================
  let scrollResetTimeout: ReturnType<typeof setTimeout>;

  // Smoothly centers back onto the active Focus (yellow) node
  function scrollToCurrentNode() {
    if (!viewportContainer) return;
    const coords = getCoordinates(currentNode.level, currentNode.position);
    const viewportHeight = viewportContainer.clientHeight;
    const targetScrollTop = coords.y - (viewportHeight / 2);

    const diff = Math.abs(viewportContainer.scrollTop - targetScrollTop);
    if (diff < 3) return; // Already centered

    viewportContainer.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    });
  }

  function handleScroll() {
    if (!viewportContainer) return;

    // Track scroll values
    scrollTop = viewportContainer.scrollTop;
    scrollHeight = viewportContainer.scrollHeight;
    clientHeight = viewportContainer.clientHeight;

    // Fast-fade logic triggers when scrolling starts
    isScrollActive = true;
    clearTimeout(fadeTimeout);
    fadeTimeout = setTimeout(() => {
      isScrollActive = false;
    }, 800);

    clearTimeout(scrollResetTimeout);

    // Only configure auto-center if the user did not trigger programmatic selections
    // and they aren't actively clicking or dragging the custom scrollbar.
    if (Date.now() - lastProgrammaticScrollTime < 1000 || isDragging) {
      return;
    }

    scrollResetTimeout = setTimeout(() => {
      scrollToCurrentNode();
    }, 4000);
  }

  // Derived Scrollbar Metrics (Min-height reduced to 19, and scaled down by 1.4)
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

  // Drag Scrollbar Logic
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

    // Trigger timer safety lock when user finishes drag interaction
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

<!-- The outer layout uses adaptive flex: col on mobile, row on desktop -->
<div class="h-full flex flex-col md:flex-row relative selection:bg-zinc-800 selection:text-zinc-100 bg-black overflow-hidden">

  <!-- ================= LEFT COLUMN: THE SKILL TREE PROGRESSION ================= -->
  <!-- Relative container acts as wrapper for viewport scroll container and scrollbar -->
  <div class="flex-1 h-[55vh] md:h-full relative flex flex-col border-b md:border-b-0 md:border-r border-white/10 shrink-0 md:shrink">
    
    <!-- Floating Expand Button (Sensible floating trigger when closed, avoiding full row waste) -->
    {#if !showWelcomeBanner}
      <button 
        onclick={() => showWelcomeBanner = true}
        class="absolute top-4 left-1/2 -translate-x-1/2 z-50 h-8 w-8 rounded-full bg-black/90 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-zinc-100 flex items-center justify-center transition-all shadow-lg shadow-black/40 backdrop-blur-md focus:outline-none"
        aria-label="Expand Overview"
      >
        <ChevronDown class="w-4 h-4" />
      </button>
    {/if}

    <!-- Dashboard Welcome Banner (Glass container with masked progressive shadow/blur projection) -->
    {#if showWelcomeBanner}
      <div 
        transition:slide={{ duration: 320 }}
        class="w-full h-auto md:h-[30%] min-h-[195px] bg-black/90 backdrop-blur-md border-b border-white/10 p-6 flex flex-col justify-between relative z-40 shrink-0 shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
      >
        <!-- Seamless progressive blur projection overlay -->
        <div class="absolute left-0 right-0 top-full h-32 bg-gradient-to-b from-black/80 via-black/20 to-transparent backdrop-blur-[8px] pointer-events-none z-30" style="mask-image: linear-gradient(to bottom, black 0%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);"></div>

        <!-- Dismiss Button -->
        <button 
          onclick={() => showWelcomeBanner = false}
          class="absolute top-4 right-4 text-zinc-500 hover:text-zinc-200 transition-colors p-1.5 hover:bg-white/5 rounded-md focus:outline-none"
          aria-label="Dismiss panel"
        >
          <X class="w-4 h-4" />
        </button>

        <!-- Message Block -->
        <div class="space-y-1.5 max-w-xl pr-6">
          <h1 class="text-base md:text-lg font-medium tracking-tight text-zinc-100">
            {greeting}
          </h1>
          <p class="text-xs text-zinc-400 leading-relaxed">
            Your high school curriculum milestones are calibrated to the <span class="text-zinc-200 font-medium">STEM Focus Track</span>. Review your target milestones below to maintain cumulative safety benchmarks.
          </p>
        </div>

        <!-- Integrated Secondary Information Grid -->
        <div class="grid grid-cols-3 gap-4 pt-4 border-t border-white/5 mt-3">
          <div class="space-y-1">
            <span class="block text-[9px] uppercase tracking-wider text-zinc-500 font-mono">Current Progress</span>
            <div class="flex items-baseline gap-1.5">
              <span class="text-sm font-semibold text-zinc-200">{progressPercent}%</span>
              <span class="text-[9px] text-zinc-500 font-mono">({completedCount}/{totalCount})</span>
            </div>
          </div>
          <div class="space-y-1 border-l border-white/5 pl-4">
            <span class="block text-[9px] uppercase tracking-wider text-zinc-500 font-mono">Active Target</span>
            <span class="block text-xs font-medium text-white truncate max-w-full">
              {currentNode.title}
            </span>
          </div>
          <div class="space-y-1 border-l border-white/5 pl-4">
            <span class="block text-[9px] uppercase tracking-wider text-zinc-500 font-mono">Next Up</span>
            <span class="block text-xs font-medium text-zinc-300 truncate max-w-full">
              {nextMilestone}
            </span>
          </div>
        </div>
      </div>
    {/if}

    <!-- 
      Isolated Scroll Viewport Wrapper:
      Ensures the custom scrollbar track matches the exact physical bounds of the scrollable container.
    -->
    <div class="flex-1 min-h-0 relative w-full flex flex-col z-10">
      
      <div 
        bind:this={viewportContainer}
        onscroll={handleScroll}
        onmousemove={handleMouseMove}
        onmouseleave={handleMouseLeave}
        class="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center py-12 select-none scroll-smooth hide-scrollbar"
      >
        
        <!-- The Map Canvas Box -->
        <div 
          class="relative z-10 will-change-transform" 
          style="
            width: {mapWidth}px; 
            height: {mapHeight}px;
            transform: translate3d({panX}px, {panY}px, 0);
          "
        >
          
          <!-- Standard, Solid, Perpendicular Connecting Lines -->
          <svg 
            class="absolute inset-0 pointer-events-none z-0" 
            width={mapWidth} 
            height={mapHeight} 
            viewBox="0 0 {mapWidth} {mapHeight}"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {#each levels as level}
              {@const coordsStart = getCoordinates(level, 'center')}
              {@const coordsEnd = getCoordinates(level + 1, 'center')}
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
                {@const coords = getCoordinates(node.level, node.position)}
                <line 
                  x1={mapWidth / 2} 
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

          <!-- Algorithmic Node Renderer -->
          {#each nodes as node}
            {@const coords = getCoordinates(node.level, node.position)}
            {@const possible = isPossibleToComplete(node)}

            <div 
              class="absolute flex flex-col items-center w-28 -translate-x-14"
              style="left: {coords.x}px; top: {coords.y - 28}px;"
            >
              <!-- Circular Node Button -->
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

              <!-- Under-node title labeling -->
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

      <!-- Custom Scrollbar Track & Capsule Thumb integrated within the isolated viewport container boundaries -->
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

  </div>

  <!-- ================= RIGHT COLUMN: CONTEXTUAL SIDE PANEL ================= -->
  <div class="w-full md:w-[380px] h-auto md:h-full bg-zinc-950/20 p-6 md:p-8 flex flex-col justify-between shrink-0 relative z-10">
    <div class="space-y-6">
      
      <!-- Node Status Badge -->
      <div class="flex gap-2">
        {#if selectedNode.status === 'completed'}
          <span class="inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-900 px-2.5 py-0.5 rounded-full">
            ● Completed
          </span>
        {:else if selectedNode.status === 'current'}
          <span class="inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider text-zinc-100 bg-zinc-900 border border-zinc-850 px-2.5 py-0.5 rounded-full animate-pulse">
            ▲ Active Focus
          </span>
        {:else if isPossibleToComplete(selectedNode)}
          <span class="inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider text-amber-400/80 bg-amber-950/20 border border-amber-900/60 px-2.5 py-0.5 rounded-full">
            ⬡ Available
          </span>
        {:else}
          <span class="inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider text-zinc-500 bg-zinc-900 border border-zinc-850 px-2.5 py-0.5 rounded-full">
            ■ Locked
          </span>
        {/if}

        {#if nodePositionIsBranch(selectedNode.position)}
          <span class="inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded-full">
            Optional
          </span>
        {/if}
      </div>

      <!-- Detail Card Information -->
      <div class="space-y-3">
        <h2 class="text-xl font-semibold tracking-tight text-zinc-100">
          {selectedNode.title}
        </h2>
        <p class="text-xs text-zinc-400 leading-relaxed">
          {selectedNode.description}
        </p>
      </div>

    </div>

    <!-- Action Block -->
    <div class="pt-6 md:pt-8 border-t border-white/10 mt-6 md:mt-0">
      {#if selectedNode.status === 'completed'}
        <div class="text-xs text-zinc-500 font-mono">
          ✓ Completed. You can review your roadmap milestones at any time.
        </div>
      {:else if selectedNode.status === 'current' || isPossibleToComplete(selectedNode)}
        <button class="w-full h-10 bg-white hover:bg-zinc-200 text-black text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-150">
          Begin Module Actions
          <ArrowRight class="w-3.5 h-3.5" />
        </button>
      {:else}
        <div class="text-xs text-zinc-600 flex items-center gap-2">
          <Lock class="w-3.5 h-3.5" />
          Complete previous nodes to unlock this block.
        </div>
      {/if}
    </div>

  </div>

</div>

<!-- Helper script module -->
<script lang="ts" context="module">
  function nodePositionIsBranch(pos: string) {
    return pos === 'left' || pos === 'right';
  }
</script>

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

  /* Hide default scrollbars cross-browser */
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }
</style>