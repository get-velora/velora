<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
  import { fly, fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import BgDarkTiles from '../components/BgDarkTiles.svelte';
</script>

<div class="h-full w-full bg-black text-zinc-100 overflow-y-auto overflow-x-hidden flex flex-col relative select-none">

  <!-- Static Grid Background -->
  <BgDarkTiles />

  <!-- Vignette Mask -->
  <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.85)_100%)] z-10"></div>

  <!-- Floating Logo -->
  <div
    in:fade={{ duration: 1500, delay: 200 }}
    class="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20 select-none"
  >
    <div class="h-5 w-5 bg-zinc-100 text-black flex items-center justify-center font-bold text-xs rounded-sm shrink-0">
      V
    </div>
    <span class="text-sm font-semibold tracking-tight text-white">Velora</span>
  </div>

  <!-- Main Content -->
  <main class="flex-1 flex flex-col items-center justify-center relative z-20 px-5 sm:px-8 pt-20 pb-10 gap-10 md:gap-0 md:flex-row md:items-center md:justify-between md:px-12 lg:px-16 min-h-0 w-full">

    <!-- Left Column -->
    <div class="w-full md:w-[40%] max-w-sm md:max-w-none space-y-6 shrink-0 text-center md:text-left">

      <div in:fly={{ y: 30, duration: 1200, delay: 400, easing: cubicOut }}>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-zinc-100 leading-[0.95] select-none">
          Academic<br />
          guidance.<br />
          Decentralized.
        </h1>
      </div>

      <div in:fly={{ y: 20, duration: 1200, delay: 600, easing: cubicOut }}>
        <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed select-text max-w-xs mx-auto md:mx-0">
          Velora is an open-access roadmap system for independent student planning. Establish target benchmarks, structure extracurricular activities, and track college readiness on a completely free, local-first platform.
        </p>
      </div>

      <div
        in:fly={{ y: 20, duration: 1200, delay: 800, easing: cubicOut }}
        class="flex gap-3 justify-center md:justify-start select-none flex-wrap"
      >
        <a
          href="/onboarding"
          class="h-10 px-6 bg-white hover:bg-zinc-200 text-black font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg"
        >
          Sign up
          <ArrowRight class="w-3.5 h-3.5" />
        </a>
        <a
          href="/map"
          class="h-10 px-6 bg-zinc-950 hover:bg-zinc-900 border border-white/5 text-zinc-300 font-semibold text-xs rounded-lg flex items-center justify-center transition-all"
        >
          Login
        </a>
      </div>

      <!-- Mobile-only stat strip -->
      <div
        in:fly={{ y: 20, duration: 1200, delay: 1000, easing: cubicOut }}
        class="flex items-center justify-center gap-6 pt-2 md:hidden"
      >
        <div class="text-center">
          <p class="text-lg font-bold text-zinc-100">43</p>
          <p class="text-[9px] uppercase tracking-wider text-zinc-600 font-mono">Milestones</p>
        </div>
        <div class="h-6 w-px bg-zinc-800"></div>
        <div class="text-center">
          <p class="text-lg font-bold text-zinc-100">9</p>
          <p class="text-[9px] uppercase tracking-wider text-zinc-600 font-mono">Phases</p>
        </div>
        <div class="h-6 w-px bg-zinc-800"></div>
        <div class="text-center">
          <p class="text-lg font-bold text-zinc-100">Free</p>
          <p class="text-[9px] uppercase tracking-wider text-zinc-600 font-mono">Always</p>
        </div>
      </div>
    </div>

    <!-- Right Column: Browser Mockup — hidden on mobile -->
    <div
      in:fly={{ y: 40, duration: 1600, delay: 500, easing: cubicOut }}
      class="hidden md:flex md:w-[58%] lg:w-[60%] h-full items-center justify-center relative py-8"
    >
      <div
        class="relative w-full max-w-3xl lg:max-w-4xl aspect-[16/10] bg-zinc-950 border-2 border-zinc-800 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col select-none"
      >
        <!-- Browser Chrome -->
        <div class="h-9 w-full bg-zinc-900 border-b border-white/5 flex items-center justify-between px-3 shrink-0">
          <div class="flex items-center gap-1.5">
            <div class="h-2.5 w-2.5 rounded-full bg-[#ff5f56]"></div>
            <div class="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]"></div>
            <div class="h-2.5 w-2.5 rounded-full bg-[#27c93f]"></div>
          </div>

          <div class="flex items-center justify-center gap-1.5 bg-zinc-950 border border-white/5 rounded-md w-40 lg:w-52 h-5 px-2 text-[9px] text-zinc-500 font-mono">
            <svg class="w-2 h-2 text-zinc-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            <span class="truncate">velora.com/map</span>
          </div>

          <div class="w-16"></div>
        </div>

        <!-- Browser Viewport -->
        <div class="flex-1 bg-black relative overflow-hidden">
          <div class="absolute inset-0 opacity-20 inner-grid-pattern"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>

          <!-- Simulated app nodes for visual interest -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="flex flex-col items-center gap-6 opacity-40">
              <!-- Node row simulation -->
              {#each [
                { label: 'Decision Day', done: false, active: false },
                { label: 'FAFSA & Aid',  done: false, active: false },
                { label: 'Submit Apps',  done: false, active: false },
                { label: 'Essay Draft',  done: false, active: true  },
                { label: 'EC Audit',     done: true,  active: false },
                { label: 'College List', done: true,  active: false },
              ] as node}
                <div class="flex items-center gap-3">
                  <div class="h-8 w-8 rounded-full border flex items-center justify-center text-[8px]
                    {node.active ? 'bg-amber-400/20 border-amber-400 text-amber-400' : ''}
                    {node.done   ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : ''}
                    {!node.active && !node.done ? 'bg-zinc-900 border-zinc-700 text-zinc-600' : ''}
                  ">
                    {node.done ? '✓' : '·'}
                  </div>
                  <span class="text-[9px] font-mono uppercase tracking-wider
                    {node.active ? 'text-amber-400' : ''}
                    {node.done ? 'text-emerald-500/70' : ''}
                    {!node.active && !node.done ? 'text-zinc-700' : ''}
                  ">{node.label}</span>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  .inner-grid-pattern {
    background-size: 30px 30px;
    background-image:
      linear-gradient(to right, #18181b 1px, transparent 1px),
      linear-gradient(to bottom, #18181b 1px, transparent 1px);
  }
</style>


