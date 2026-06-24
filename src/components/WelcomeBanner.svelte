<script lang="ts">
  import { X } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  interface Props {
    show: boolean;
    completedCount: number;
    totalCount: number;
    progressPercent: number;
    currentNodeTitle: string;
    nextMilestone: string;
  }

  let { 
    show = $bindable(true), 
    completedCount, 
    totalCount, 
    progressPercent, 
    currentNodeTitle, 
    nextMilestone 
  }: Props = $props();

  const currentHour = new Date().getHours();
  const greeting = $derived(
    currentHour < 12 
      ? "Rise and shine, Pathfinder" 
      : "Hey Pathfinder, ready to dive into this?"
  );
</script>

{#if show}
  <div 
    transition:slide={{ duration: 320 }}
    class="w-full h-auto bg-black/90 backdrop-blur-md border-b border-white/10 p-4 md:p-6 flex flex-col justify-between relative z-40 shrink-0 shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
  >
    <!-- Seamless progressive blur projection overlay -->
    <div class="absolute left-0 right-0 top-full h-32 bg-gradient-to-b from-black/80 via-black/20 to-transparent backdrop-blur-[8px] pointer-events-none z-30" style="mask-image: linear-gradient(to bottom, black 0%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);"></div>

    <!-- Dismiss Button -->
    <button 
      onclick={() => show = false}
      class="absolute top-3 right-3 md:top-4 md:right-4 text-zinc-500 hover:text-zinc-200 transition-colors p-1.5 hover:bg-white/5 rounded-md focus:outline-none"
      aria-label="Dismiss panel"
    >
      <X class="w-4 h-4" />
    </button>

    <!-- Message Block -->
    <div class="space-y-1 md:space-y-1.5 max-w-xl pr-6">
      <h1 class="text-sm md:text-base lg:text-lg font-medium tracking-tight text-zinc-100">
        {greeting}
      </h1>
      <p class="text-[11px] md:text-xs text-zinc-400 leading-relaxed">
        Your high school curriculum milestones are calibrated to the <span class="text-zinc-200 font-medium">STEM Focus Track</span>. Review your target milestones below to maintain cumulative safety benchmarks.
      </p>
    </div>

    <!-- Responsive Information Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-3 border-t border-white/5 mt-3">
      <div class="space-y-0.5">
        <span class="block text-[8px] md:text-[9px] uppercase tracking-wider text-zinc-500 font-mono">Current Progress</span>
        <div class="flex items-baseline gap-1.5">
          <span class="text-xs md:text-sm font-semibold text-zinc-200">{progressPercent}%</span>
          <span class="text-[9px] text-zinc-500 font-mono">({completedCount}/{totalCount})</span>
        </div>
      </div>
      <div class="space-y-0.5 border-l-0 sm:border-l border-white/5 pl-0 sm:pl-4">
        <span class="block text-[8px] md:text-[9px] uppercase tracking-wider text-zinc-500 font-mono">Active Target</span>
        <span class="block text-[11px] md:text-xs font-medium text-white truncate max-w-full">
          {currentNodeTitle}
        </span>
      </div>
      <div class="space-y-0.5 border-l-0 sm:border-l border-white/5 pl-0 sm:pl-4">
        <span class="block text-[8px] md:text-[9px] uppercase tracking-wider text-zinc-500 font-mono">Next Up</span>
        <span class="block text-[11px] md:text-xs font-medium text-zinc-300 truncate max-w-full">
          {nextMilestone}
        </span>
      </div>
    </div>
  </div>
{/if}