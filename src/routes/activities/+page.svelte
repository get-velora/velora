<!-- Activities page -->
<script lang="ts">
  import { Plus, Trash2 } from 'lucide-svelte';
  import { saveStore, loadStore } from '$lib/persist';

  interface ActivityItem {
    id: number;
    title: string;
    role: string;
    hours: string;
    desc: string;
  }

  const DEFAULT: ActivityItem[] = [
    {
      id: 1,
      title: 'Family Caretaking',
      role: 'Primary Assistant',
      hours: '12 hrs/week',
      desc: 'Managed scheduling and translated documentation for family members.'
    }
  ];

  // Persist activities to storage
  let activities = $state<ActivityItem[]>(loadStore<ActivityItem[]>('activities', DEFAULT));

  $effect(() => {
    saveStore('activities', activities);
  });

  let newTitle = $state('');
  let newRole = $state('');
  let newHours = $state('');
  let newDesc = $state('');

  function addActivity() {
    if (!newTitle) return;
    activities.push({
      id: Date.now(),
      title: newTitle,
      role: newRole || 'Participant',
      hours: newHours || 'Flexible',
      desc: newDesc
    });
    newTitle = '';
    newRole = '';
    newHours = '';
    newDesc = '';
  }

  function removeActivity(id: number) {
    activities = activities.filter(a => a.id !== id);
  }
</script>

<div class="h-full w-full p-6 md:p-8 overflow-y-auto bg-black text-zinc-100 flex flex-col items-center">
  <div class="w-full max-w-2xl space-y-8">

    <div class="space-y-1">
      <h1 class="text-xl font-bold tracking-tight text-zinc-100">Activities</h1>
      <p class="text-xs text-zinc-400">Log and manage your portfolio of activities, work, and responsibilities.</p>
    </div>

    <div class="space-y-4 bg-zinc-950/40 p-5 rounded-xl border border-white/5">
      <div class="space-y-1">
        <label for="title" class="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Title</label>
        <input
          id="title"
          bind:value={newTitle}
          placeholder="Activity name"
          class="w-full h-9 bg-zinc-900 border border-white/5 rounded-md px-3 text-xs focus:outline-none focus:border-zinc-700 text-zinc-200"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-1">
          <label for="role" class="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Role</label>
          <input
            id="role"
            bind:value={newRole}
            placeholder="Position or role"
            class="w-full h-9 bg-zinc-900 border border-white/5 rounded-md px-3 text-xs focus:outline-none focus:border-zinc-700 text-zinc-200"
          />
        </div>
        <div class="space-y-1">
          <label for="hours" class="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Time Commitment</label>
          <input
            id="hours"
            bind:value={newHours}
            placeholder="e.g., Hours per week"
            class="w-full h-9 bg-zinc-900 border border-white/5 rounded-md px-3 text-xs focus:outline-none focus:border-zinc-700 text-zinc-200"
          />
        </div>
      </div>

      <div class="space-y-1">
        <label for="desc" class="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Description</label>
        <textarea
          id="desc"
          bind:value={newDesc}
          rows="3"
          placeholder="Describe your responsibilities and achievements"
          class="w-full bg-zinc-900 border border-white/5 rounded-md p-3 text-xs focus:outline-none focus:border-zinc-700 text-zinc-200 resize-none"
        ></textarea>
      </div>

      <button
        onclick={addActivity}
        class="w-full h-9 bg-white hover:bg-zinc-200 text-black font-semibold text-xs rounded-md flex items-center justify-center gap-2 transition-colors"
      >
        <Plus class="w-3.5 h-3.5" />
        Add Activity
      </button>
    </div>

    <div class="space-y-4">
      <span class="block text-[10px] font-mono uppercase tracking-wider text-zinc-500">Logged Activities ({activities.length})</span>

      <div class="space-y-3">
        {#each activities as act (act.id)}
          <div class="p-4 bg-zinc-900/40 rounded-lg border border-white/5 flex items-start justify-between gap-4">
            <div class="space-y-1.5 min-w-0">
              <div class="flex items-baseline gap-2 flex-wrap">
                <h3 class="text-sm font-semibold text-zinc-200 truncate">{act.title}</h3>
                <span class="text-[9px] font-mono text-emerald-400 bg-emerald-950/20 px-1.5 py-0.5 rounded border border-emerald-900/50">{act.hours}</span>
              </div>
              <p class="text-[11px] text-zinc-400 font-medium">Role: {act.role}</p>
              <p class="text-[11px] text-zinc-500 leading-relaxed break-words">{act.desc}</p>
            </div>
            <button
              onclick={() => removeActivity(act.id)}
              class="text-zinc-600 hover:text-red-400 transition-colors p-1"
              aria-label="Delete"
            >
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        {/each}

        {#if activities.length === 0}
          <div class="text-xs text-zinc-600 italic py-8 text-center border border-dashed border-white/5 rounded-lg">
            No logged activities.
          </div>
        {/if}
      </div>
    </div>

  </div>
</div>