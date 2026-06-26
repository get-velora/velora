<!-- Data export/import/reset controls -->
<script lang="ts">
  import { Download, Upload, Trash2, AlertTriangle } from 'lucide-svelte';
  import { saveStore, loadStore, clearAll } from '$lib/persist';
  import type { MapStore, CollegesStore, ActivitiesStore, CalendarStore } from '$lib/persist';

  let showConfirm = $state(false);
  let importError = $state('');
  let importSuccess = $state(false);

  interface VeloraExport {
    version: number;
    exportedAt: string;
    map: MapStore;
    colleges: CollegesStore;
    activities: ActivitiesStore;
    calendar: CalendarStore;
  }

  function exportData() {
    const payload: VeloraExport = {
      version: 1,
      exportedAt: new Date().toISOString(),
      map: loadStore<MapStore>('map', []),
      colleges: loadStore<CollegesStore>('colleges', []),
      activities: loadStore<ActivitiesStore>('activities', []),
      calendar: loadStore<CalendarStore>('calendar', []),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `velora-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importData(e: Event) {
    importError = '';
    importSuccess = false;
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed: VeloraExport = JSON.parse(ev.target?.result as string);
        if (parsed.version !== 1) throw new Error('Unsupported backup version.');
        if (parsed.map)        saveStore('map', parsed.map);
        if (parsed.colleges)   saveStore('colleges', parsed.colleges);
        if (parsed.activities) saveStore('activities', parsed.activities);
        if (parsed.calendar)   saveStore('calendar', parsed.calendar);
        importSuccess = true;
        // Reload to apply imported data
        setTimeout(() => window.location.reload(), 800);
      } catch (err: any) {
        importError = err.message || 'Invalid backup file.';
      }
    };
    reader.readAsText(file);
  }

  function resetAll() {
    clearAll();
    showConfirm = false;
    window.location.reload();
  }
</script>

<div class="space-y-3 p-4 bg-zinc-950 border border-white/10 rounded-xl text-xs">
  <p class="text-[10px] uppercase tracking-widest font-mono text-zinc-500">Your Data</p>

  <!-- Export -->
  <button
    onclick={exportData}
    class="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors border border-white/5"
  >
    <Download class="w-3.5 h-3.5 shrink-0" />
    Export backup (.json)
  </button>

  <!-- Import -->
  <label class="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors border border-white/5 cursor-pointer">
    <Upload class="w-3.5 h-3.5 shrink-0" />
    Import backup
    <input type="file" accept=".json" class="hidden" onchange={importData} />
  </label>

  {#if importError}
    <p class="text-[10px] text-red-400 font-mono">{importError}</p>
  {/if}
  {#if importSuccess}
    <p class="text-[10px] text-emerald-400 font-mono">✓ Imported — reloading…</p>
  {/if}

  <!-- Reset -->
  {#if !showConfirm}
    <button
      onclick={() => showConfirm = true}
      class="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-red-950 text-zinc-500 hover:text-red-400 transition-colors border border-white/5"
    >
      <Trash2 class="w-3.5 h-3.5 shrink-0" />
      Reset all progress
    </button>
  {:else}
    <div class="flex items-start gap-2 p-3 rounded-lg bg-red-950/30 border border-red-900/60">
      <AlertTriangle class="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
      <div class="space-y-2">
        <p class="text-red-300 text-[10px] leading-relaxed">This will erase all saved progress across all pillars. Export a backup first.</p>
        <div class="flex gap-2">
          <button
            onclick={resetAll}
            class="px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-[10px] font-semibold transition-colors"
          >
            Yes, reset
          </button>
          <button
            onclick={() => showConfirm = false}
            class="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  {/if}

  <p class="text-[9px] text-zinc-600 font-mono leading-relaxed">
    Progress is stored in your browser. Export a backup before clearing site data or switching devices.
  </p>
</div>