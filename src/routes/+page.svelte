<script>
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let dashboardImage = "/image.jpg"; 
  
  function handleImageError(e) {
    e.target.style.display = 'none';
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
</svelte:head>

<style>
  .font-roboto {
    font-family: 'Roboto', sans-serif;
  }

  .text-dimmed {
    color: rgba(255, 255, 255, 0.6);
  }
</style>

<!-- Main Container: flex items-center and min-h-screen ensures vertical centering on big screens -->
<div class="min-h-screen flex items-center justify-center bg-zinc-950 px-6 py-20">
  <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 max-w-[1600px] mx-auto w-full">
    
    <!-- Left Column: Text & CTA -->
    <div class="w-full lg:w-[40%] xl:w-[35%] flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
      
      <div in:fly={{ y: 30, duration: 1200, delay: 400, easing: cubicOut }}>
        <h1 class="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tighter text-zinc-100 leading-[0.9] lg:leading-[0.85]">
          College Applications, Made Easy.<br />
        </h1>
      </div>

      <div in:fly={{ y: 20, duration: 1200, delay: 600, easing: cubicOut }} class="max-w-md">
        <p class="font-roboto text-sm sm:text-base text-dimmed leading-relaxed select-text">
          Velora is application management software built by a student who’s tired of having to switch between 10 tabs to manage college apps. 
          Highly opinionated, 100% free, telemetry-free, and ad-free forever. If you don't like something 
          or find a bug, 
          <a href="https://github.com/get-velora/velora/issues" class="text-zinc-300 underline decoration-zinc-800 underline-offset-4 hover:text-white transition-colors">open an issue</a> 
          or fix it yourself.
        </p>
      </div>

      <!-- Action Buttons -->
      <div in:fly={{ y: 20, duration: 1200, delay: 800, easing: cubicOut }} class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <a
          href="/map"
          class="group h-12 px-8 bg-white hover:bg-zinc-200 text-black font-bold text-sm rounded-full flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95"
        >
          Get Started
          <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </a>

        <a
          href="https://github.com/get-velora/velora"
          target="_blank"
          class="group h-12 px-8 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-100 font-bold text-sm rounded-full flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
        >
          <img src="https://cdn.simpleicons.org/github/white" alt="GitHub Logo" class="w-5 h-5" />
          Star on GitHub
        </a>
      </div>

      <!-- Stats Section -->
      <div
        in:fly={{ y: 20, duration: 1200, delay: 1000, easing: cubicOut }}
        class="flex items-center gap-8 pt-6 border-t border-white/5 w-full justify-center lg:justify-start"
      >
        <div class="flex flex-col">
          <span class="text-lg font-bold text-zinc-100">Complete Privacy</span>
          <span class="font-roboto text-[10px] uppercase tracking-widest text-dimmed font-medium">Stored Locally</span>
        </div>
        <div class="h-8 w-px bg-zinc-800"></div>
        <div class="flex flex-col">
          <span class="text-lg font-bold text-zinc-100">Free and Open Source</span>
          <span class="font-roboto text-[10px] uppercase tracking-widest text-dimmed font-medium">Built by a Student, For Students</span>
        </div>
      </div>
    </div>

    <!-- Right Column: Browser Mockup -->
    <div
      in:fly={{ y: 40, duration: 1600, delay: 500, easing: cubicOut }}
      class="w-full lg:w-[60%] xl:w-[65%] flex items-center justify-center"
    >
      <div
        class="relative w-full aspect-[16/10] bg-zinc-950 border border-zinc-800 rounded-xl shadow-[0_30px_80px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
      >
        <!-- Browser Header -->
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

        <!-- Browser Viewport -->
        <div class="flex-1 bg-zinc-950 relative overflow-hidden group">
          <div class="absolute inset-0 opacity-20 inner-grid-pattern"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <!-- object-contain ensures the image is never cropped while the container maintains aspect ratio -->
            <img 
              src={dashboardImage} 
              alt="Velora Dashboard" 
              class="w-full h-full object-contain"
              on:error={handleImageError}
            />
            <div class="absolute inset-0 flex flex-col items-center justify-center text-zinc-800 pointer-events-none -z-10">
              <div class="w-12 h-12 border-2 border-zinc-900 rounded-lg mb-2 opacity-20"></div>
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] opacity-20">Dashboard Preview</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>