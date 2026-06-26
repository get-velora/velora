<!-- src/routes/colleges/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Plus, Trash2, ExternalLink, ChevronDown, Check, ChevronUp } from 'lucide-svelte';
  import { Switch } from 'bits-ui';
  import { saveStore, loadStore } from '$lib/persist';

  interface College {
    id: number;
    name: string;
    status: 'Reach' | 'Target' | 'Safety';
    cost: string;
    avgGpa: string;
    avgTest: string;
    testOptional: boolean;
    url: string;
    isManual?: boolean;
  }

  const userGpa  = 3.7;
  const userTest = 1300;

  const DEFAULT_COLLEGES: College[] = [
    { id: 1, name: 'Stanford University', status: 'Reach', cost: '$82,412', avgGpa: '3.96', avgTest: '1540', testOptional: true, url: 'https://stanford.edu' }
  ];

  // ── Persist ───────────────────────────────────────────────
  let colleges = $state<College[]>(loadStore<College[]>('colleges', DEFAULT_COLLEGES));

  $effect(() => {
    saveStore('colleges', colleges);
  });
  // ─────────────────────────────────────────────────────────

  let universityDb      = $state<any[]>([]);
  let activeSuggestions = $state<any[]>([]);
  let activeRowId       = $state<number | null>(null);
  let openDropdownId    = $state<number | null>(null);

  onMount(async () => {
    try {
      const res = await fetch('/uniList.json');
      if (!res.ok) throw new Error('File not found');
      universityDb = await res.json();
    } catch (e) {
      console.error('Failed to load university database.', e);
    }
  });

  function handleSearch(id: number, query: string) {
    if (!query || query.trim().length < 1) {
      activeSuggestions = []; activeRowId = null; return;
    }
    activeRowId = id;
    activeSuggestions = universityDb
      .filter(u => u.n?.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8);
  }

  function selectUniversity(rowId: number, uni: any) {
    const index = colleges.findIndex(c => c.id === rowId);
    if (index !== -1) {
      colleges[index].name         = uni.n   || '';
      colleges[index].url          = uni.u   || '';
      colleges[index].avgGpa       = uni.g   || '';
      colleges[index].avgTest      = uni.t   || '';
      colleges[index].cost         = uni.c   || '';
      colleges[index].testOptional = uni.o === true || uni.o === 'true';
      colleges[index].isManual     = false;
    }
    activeSuggestions = []; activeRowId = null;
  }

  $effect(() => {
    colleges.forEach(college => {
      if (college.isManual || !college.name) return;
      const uniGpa  = parseFloat(college.avgGpa)  || 0;
      const uniTest = parseFloat(college.avgTest) || 0;
      if (!uniGpa || !uniTest) return;
      if (userGpa >= uniGpa + 0.1 && userTest >= uniTest + 50) college.status = 'Safety';
      else if (userGpa < uniGpa || userTest < uniTest)         college.status = 'Reach';
      else                                                      college.status = 'Target';
    });
  });

  function addRow() {
    colleges.push({ id: Date.now(), name: '', status: 'Target', cost: '', avgGpa: '', avgTest: '', testOptional: true, url: '' });
  }

  function removeRow(id: number) {
    colleges = colleges.filter(c => c.id !== id);
  }

  const statusOptions = [
    { value: 'Reach',  label: 'Reach',  color: 'text-cyan-400',   bg: 'hover:bg-cyan-400/20'  },
    { value: 'Target', label: 'Target', color: 'text-yellow-400', bg: 'hover:bg-yellow-400/20'},
    { value: 'Safety', label: 'Safety', color: 'text-green-500',  bg: 'hover:bg-green-500/20' },
  ] as const;

  if (typeof window !== 'undefined') {
    window.onclick = () => { openDropdownId = null; activeRowId = null; };
  }
</script>

<div class="h-screen w-full flex flex-col bg-black text-zinc-300 selection:bg-zinc-800 arial-only">

  <div class="px-8 py-8 flex justify-between items-end bg-black">
    <div class="flex gap-16">
      <div class="flex flex-col gap-1">
        <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Current GPA</p>
        <p class="text-3xl font-normal text-white leading-none">{userGpa.toFixed(2)}</p>
      </div>
      <div class="flex flex-col gap-1">
        <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Current Test</p>
        <p class="text-3xl font-normal text-white leading-none">{userTest}</p>
      </div>
    </div>
    <button onclick={addRow} class="h-10 px-6 bg-zinc-100 hover:bg-white text-black text-[11px] font-bold uppercase tracking-[0.1em] rounded-md flex items-center gap-2 transition-all active:scale-95">
      <Plus class="w-4 h-4" strokeWidth={3} /> Add University
    </button>
  </div>

  <div class="flex-1 overflow-auto border-t border-zinc-900">
    <table class="w-full border-separate border-spacing-0 table-fixed min-w-[1000px]">
      <thead>
        <tr class="bg-black">
          <th class="w-[30%] sticky top-0 z-30 py-4 px-8 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-600 border-b border-r border-zinc-900 bg-black">Institution</th>
          <th class="w-[14%] sticky top-0 z-30 py-4 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-600 border-b border-r border-zinc-900 bg-black">Status</th>
          <th class="w-[12%] sticky top-0 z-30 py-4 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-600 border-b border-r border-zinc-900 bg-black">Est. Cost</th>
          <th class="w-[10%] sticky top-0 z-30 py-4 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-600 border-b border-r border-zinc-900 bg-black">Avg GPA</th>
          <th class="w-[10%] sticky top-0 z-30 py-4 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-600 border-b border-r border-zinc-900 bg-black">Avg Test</th>
          <th class="w-[10%] sticky top-0 z-30 py-4 px-4 text-center text-[11px] font-bold uppercase tracking-wider text-zinc-600 border-b border-r border-zinc-900 bg-black">Test Opt</th>
          <th class="w-[14%] sticky top-0 z-30 py-4 px-8 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-600 border-b border-zinc-900 bg-black">Reference</th>
        </tr>
      </thead>
      <tbody>
        {#each colleges as college (college.id)}
          <tr class="group hover:bg-zinc-900/40 transition-colors">
            <td class="p-0 border-b border-r border-zinc-900 relative overflow-visible">
              <input
                bind:value={college.name}
                oninput={(e) => handleSearch(college.id, e.currentTarget.value)}
                onclick={(e) => e.stopPropagation()}
                class="w-full h-14 bg-transparent px-8 text-[14px] outline-none text-white placeholder:text-zinc-800"
                placeholder="Find institution..."
              />
              {#if activeRowId === college.id && activeSuggestions.length > 0}
                <div class="absolute -left-px top-full w-[calc(100%+1px)] bg-zinc-950 border border-zinc-800 z-[100] shadow-2xl">
                  {#each activeSuggestions as uni}
                    <button
                      onclick={() => selectUniversity(college.id, uni)}
                      class="w-full text-left px-8 py-3 text-[13px] hover:bg-white/10 text-zinc-300 hover:text-white transition-colors border-b border-zinc-900 last:border-0"
                    >{uni.n}</button>
                  {/each}
                </div>
              {/if}
            </td>

            <td class="p-0 border-b border-r border-zinc-900 relative">
              <button
                onclick={(e) => { e.stopPropagation(); openDropdownId = openDropdownId === college.id ? null : college.id; }}
                class="w-full h-14 flex items-center justify-between px-4 outline-none"
              >
                <span class="text-[12px] font-bold uppercase {statusOptions.find(o => o.value === college.status)?.color}">
                  {college.status}
                </span>
                <ChevronDown class="w-4 h-4 text-zinc-700 {openDropdownId === college.id ? 'rotate-180' : ''}" />
              </button>
              {#if openDropdownId === college.id}
                <div class="absolute left-0 top-full w-full z-50 bg-zinc-950 border border-zinc-800 p-1 shadow-2xl" onclick={(e) => e.stopPropagation()}>
                  {#each statusOptions as opt}
                    <button onclick={() => { college.status = opt.value; college.isManual = true; openDropdownId = null; }} class="w-full flex items-center justify-between px-3 py-3 text-[11px] font-bold uppercase rounded-sm {opt.bg} transition-colors">
                      <span class={opt.color}>{opt.label}</span>
                      {#if college.status === opt.value}<Check class="w-4 h-4 text-white" />{/if}
                    </button>
                  {/each}
                </div>
              {/if}
            </td>

            <td class="p-0 border-b border-r border-zinc-900">
              <input bind:value={college.cost} class="w-full h-14 bg-transparent px-4 text-[13px] text-zinc-400 outline-none" placeholder="—" />
            </td>

            <td class="p-0 border-b border-r border-zinc-900">
              <div class="flex items-center h-14 px-4 gap-2 justify-between">
                <input bind:value={college.avgGpa} class="w-12 bg-transparent text-[13px] text-zinc-200 outline-none" placeholder="0.0" />
                {#if parseFloat(college.avgGpa)}
                  {@const diff = userGpa - parseFloat(college.avgGpa)}
                  <span class={diff >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {#if diff >= 0}<ChevronUp class="w-4 h-4" />{:else}<ChevronDown class="w-4 h-4" />{/if}
                  </span>
                {/if}
              </div>
            </td>

            <td class="p-0 border-b border-r border-zinc-900">
              <div class="flex items-center h-14 px-4 gap-2 justify-between">
                <input bind:value={college.avgTest} class="w-16 bg-transparent text-[13px] text-zinc-200 outline-none" placeholder="0000" />
                {#if parseInt(college.avgTest)}
                  <span class={userTest >= parseInt(college.avgTest) ? 'text-green-500' : 'text-red-500'}>
                    {#if userTest >= parseInt(college.avgTest)}<ChevronUp class="w-4 h-4" />{:else}<ChevronDown class="w-4 h-4" />{/if}
                  </span>
                {/if}
              </div>
            </td>

            <td class="p-0 border-b border-r border-zinc-900">
              <div class="w-full h-14 flex items-center justify-center">
                <Switch.Root bind:checked={college.testOptional} class="h-4 w-8 rounded-full border border-zinc-700 data-[state=checked]:bg-green-500 bg-zinc-800 transition-colors">
                  <Switch.Thumb class="block h-3 w-3 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[16px] data-[state=unchecked]:translate-x-[2px]" />
                </Switch.Root>
              </div>
            </td>

            <td class="p-0 border-b border-zinc-900 relative">
              <div class="flex items-center w-full h-14 px-8 group/cell">
                <input bind:value={college.url} class="flex-1 bg-transparent text-[11px] text-zinc-500 outline-none truncate mr-12" placeholder="LINK_PENDING" />
                <div class="absolute right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {#if college.url}
                    <a href={college.url.startsWith('http') ? college.url : `https://${college.url}`} target="_blank" class="p-2 hover:bg-zinc-800 rounded text-zinc-400">
                      <ExternalLink class="w-4 h-4" />
                    </a>
                  {/if}
                  <button onclick={() => removeRow(college.id)} class="p-2 hover:bg-red-500/20 rounded text-zinc-700 hover:text-red-500">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  :global(.arial-only),
  :global(.arial-only *) { font-family: Arial, Helvetica, sans-serif !important; }
  input::-webkit-inner-spin-button { display: none; }
  .flex-1::-webkit-scrollbar { width: 6px; }
  .flex-1::-webkit-scrollbar-thumb { background: #27272a; border-radius: 0px; }
</style>