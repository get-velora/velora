<script lang="ts">
  import { X } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  interface Props {
    show: boolean;
    completedCount: number;
    totalCount: number;
    progressPercent: number;
    currentNodeTitle?: string;
    nextMilestone?: string;
  }

  let { 
    show = $bindable(true), 
    completedCount, 
    totalCount, 
    progressPercent 
  }: Props = $props();

  const messages = [
    { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "Great things are done by a series of small things brought together.", author: "Vincent Van Gogh" },
    { quote: "I am not afraid of storms, for I am learning how to sail my ship.", author: "Louisa May Alcott" },
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
    { quote: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
    { quote: "The best way to predict your future is to create it.", author: "Abraham Lincoln" },
    { quote: "Our greatest weakness lies in giving up.", author: "Thomas Edison" }
  ];

  const selected = messages[Math.floor(Math.random() * messages.length)];
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet">
</svelte:head>

{#if show}
  <div 
    transition:slide={{ duration: 320 }}
    class="w-full h-auto bg-black/90 backdrop-blur-md border-b border-white/10 p-5 md:p-7 flex flex-col justify-between relative z-40 shrink-0 shadow-[0_12px_40px_rgba(0,0,0,0.85)] font-roboto"
  >
    <!-- Blur overlay -->
    <div class="absolute left-0 right-0 top-full h-32 bg-gradient-to-b from-black/80 via-black/20 to-transparent backdrop-blur-[8px] pointer-events-none z-30" style="mask-image: linear-gradient(to bottom, black 0%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);"></div>

    <!-- Dismiss button -->
    <button 
      onclick={() => show = false}
      class="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-md focus:outline-none z-50"
      aria-label="Dismiss panel"
    >
      <X class="w-4 h-4" />
    </button>

    <!-- Main content (pr-12 clears close button) -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pr-12">
      
      <!-- Quote -->
      <div class="space-y-2 max-w-2xl">
        <h1 class="text-base md:text-xl lg:text-2xl font-medium tracking-tight text-white leading-tight">
          "{selected.quote}"
        </h1>
        <p class="text-[11px] md:text-sm text-white/60 font-medium tracking-wide">
          — {selected.author}
        </p>
      </div>

      <!-- Progress -->
      <div class="flex flex-col items-start md:items-end gap-2 shrink-0 min-w-[160px]">
        <span class="text-[9px] md:text-[10px] tracking-[0.15em] text-white/40 font-bold">
          Current Progress
        </span>
        <div class="flex items-baseline gap-2">
          <span class="text-2xl md:text-4xl font-black text-white tracking-tighter">
            {progressPercent}%
          </span>
          <span class="text-xs text-white/40 font-medium">
            ({completedCount}/{totalCount})
          </span>
        </div>
        <!-- Progress bar -->
        <div class="w-32 md:w-44 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
          <div 
            class="bg-white h-full transition-all duration-1000 ease-out" 
            style="width: {progressPercent}%"
          ></div>
        </div>
      </div>

    </div>
  </div>
{/if}

<style>
  :global(.font-arial) {
    font-family: 'Arial', sans-serif !important;
  }
</style>