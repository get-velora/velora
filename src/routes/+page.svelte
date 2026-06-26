<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
  import { fly, fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import BgDarkTiles from '../components/BgDarkTiles.svelte';

  // Replace this with your actual image path (e.g., /dashboard.png)
  let dashboardImage = "/dashboard-preview.png"; 

  // Function to handle image load error
  function handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.style.display = 'none';
  }
</script>

<div class="min-h-screen w-full bg-black text-zinc-100 overflow-x-hidden flex flex-col relative select-none">

  <!-- Static Grid Background -->
  <BgDarkTiles />

  <!-- Vignette Mask -->
  <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.85)_100%)] z-10"></div>

  <!-- Floating Logo -->
  <div
    in:fade={{ duration: 1500, delay: 200 }}
    class="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30 select-none"
  >
    <div class="h-5 w-5 bg-zinc-100 text-black flex items-center justify-center font-bold text-xs rounded-sm shrink-0">
      V
    </div>
    <span class="text-sm font-semibold tracking-tight text-white">Velora</span>
  </div>

  <!-- Main Content Container -->
  <main class="relative z-20 flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl mx-auto px-6 pt-32 pb-16 lg:pt-0 lg:pb-0 lg:min-h-screen gap-12 lg:gap-10">
    
    <!-- Left Column: Text & CTA -->
    <div class="w-full lg:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-8">
      
      <div in:fly={{ y: 30, duration: 1200, delay: 400, easing: cubicOut }}>
        <h1 class="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tighter text-zinc-100 leading-[0.9] lg:leading-[0.85]">
          Academic<br />
          guidance.<br />
          Decentralized.
        </h1>
      </div>

      <div in:fly={{ y: 20, duration: 1200, delay: 600, easing: cubicOut }} class="max-w-md">
        <p class="text-sm sm:text-base text-zinc-400 leading-relaxed select-text">
          Velora is an open-access roadmap system for independent student planning. Establish target benchmarks and track college readiness.
        </p>
      </div>

      <!-- Single Action Button -->
      <div in:fly={{ y: 20, duration: 1200, delay: 800, easing: cubicOut }}>
        <a
          href="/map"
          class="group h-12 px-8 bg-white hover:bg-zinc-200 text-black font-bold text-sm rounded-full flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95"
        >
          Get Started
          <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      <!-- Stats -->
      <div
        in:fly={{ y: 20, duration: 1200, delay: 1000, easing: cubicOut }}
        class="flex items-center gap-8 pt-4 border-t border-white/5"
      >
        <div class="flex flex-col">
          <span class="text-xl font-bold text-zinc-100">43</span>
          <span class="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Milestones</span>
        </div>
        <div class="h-8 w-px bg-zinc-800"></div>
        <div class="flex flex-col">
          <span class="text-xl font-bold text-zinc-100">Free</span>
          <span class="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Forever</span>
        </div>
      </div>
    </div>

    <!-- Right Column: Browser Mockup -->
    <div
      in:fly={{ y: 40, duration: 1600, delay: 500, easing: cubicOut }}
      class="w-full lg:w-[55%] flex items-center justify-center"
    >
      <div
        class="relative w-full aspect-[16/10] bg-zinc-950 border border-zinc-800 rounded-xl shadow-[0_30px_80px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
      >
        <!-- Browser Header (Safari Style) -->
        <div class="h-8 sm:h-10 w-full bg-zinc-900/50 border-b border-white/5 flex items-center justify-between px-4 shrink-0">
          <div class="flex items-center gap-1.5">
            <div class="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-zinc-700"></div>
            <div class="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-zinc-700"></div>
            <div class="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-zinc-700"></div>
          </div>

          <div class="flex items-center justify-center gap-2 bg-black/40 border border-white/5 rounded-md w-1/2 h-5 sm:h-6 px-3 text-[9px] sm:text-[10px] text-zinc-500 font-mono">
            <svg class="w-2.5 h-2.5 text-zinc-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            <span class="truncate uppercase tracking-tighter">velora.app</span>
          </div>

          <div class="w-12"></div>
        </div>

        <!-- Browser Viewport: Image Content -->
        <div class="flex-1 bg-zinc-950 relative overflow-hidden group">
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-20 inner-grid-pattern"></div>
          
          <!-- Image Placeholder / PNG Container -->
          <div class="absolute inset-0 flex items-center justify-center overflow-hidden">
            <img 
              src={dashboardImage} 
              alt="Velora Dashboard" 
              class="w-full h-full object-cover"
              on:error={handleImageError}
            />
            
            <!-- Visual fallback if image doesn't exist yet -->
            <div class="absolute inset-0 flex flex-col items-center justify-center text-zinc-800 pointer-events-none -z-10">
              <div class="w-12 h-12 border-2 border-zinc-900 rounded-lg mb-2 opacity-20"></div>
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] opacity-20">Dashboard Preview</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </main>
</div>

<style>
  :global(html, body) {
    background-color: black;
    margin: 0;
    padding: 0;
  }

  .inner-grid-pattern {
    background-size: 30px 30px;
    background-image:
      linear-gradient(to right, #27272a 1px, transparent 1px),
      linear-gradient(to bottom, #27272a 1px, transparent 1px);
  }
</style>