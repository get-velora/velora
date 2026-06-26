<!-- src/routes/calendar/+page.svelte -->
<script lang="ts">
  import { saveStore, loadStore } from '$lib/persist';

  interface CalendarEvent {
    id: string;
    title: string;
    date: string;
  }

  const DEFAULT_EVENTS: CalendarEvent[] = [
    { id: "1", title: "Stanford EA",    date: "2024-11-01" },
    { id: "2", title: "FAFSA Opens",    date: "2024-11-01" },
    { id: "3", title: "UC Application", date: "2024-11-01" },
    { id: "4", title: "Housing Form",   date: "2024-11-01" },
    { id: "5", title: "Scholarship App",date: "2024-11-01" },
  ];

  // ── Persist ───────────────────────────────────────────────
  let events = $state<CalendarEvent[]>(loadStore<CalendarEvent[]>('calendar', DEFAULT_EVENTS));

  $effect(() => {
    saveStore('calendar', events);
  });
  // ─────────────────────────────────────────────────────────

  let today = new Date();
  let viewYear  = $state(2026);
  let viewMonth = $state(5);

  let showModal  = $state(false);
  let formTitle  = $state('');
  let formDate   = $state('');
  let hoveredDate = $state<string | null>(null);

  const START_YEAR  = 2026; const START_MONTH = 5;
  const END_YEAR    = 2040; const END_MONTH   = 5;

  let viewDate = $derived(new Date(viewYear, viewMonth, 1));

  let calendarDays = $derived.by(() => {
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
    const startOffset = firstDayOfMonth.getDay();
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startOffset);

    const days = [];
    const cur = new Date(startDate);
    for (let i = 0; i < 42; i++) {
      const y = cur.getFullYear();
      const m = String(cur.getMonth() + 1).padStart(2, '0');
      const d = String(cur.getDate()).padStart(2, '0');
      days.push({
        dateStr: `${y}-${m}-${d}`,
        dayNum: cur.getDate(),
        isCurrentMonth: cur.getMonth() === viewMonth,
        isToday: cur.toDateString() === today.toDateString()
      });
      cur.setDate(cur.getDate() + 1);
    }
    return days;
  });

  function changeMonth(step: number) {
    let tm = viewMonth + step;
    let ty = viewYear;
    if (tm > 11) { tm = 0; ty++; }
    else if (tm < 0) { tm = 11; ty--; }
    if (ty < START_YEAR || (ty === START_YEAR && tm < START_MONTH)) return;
    if (ty > END_YEAR   || (ty === END_YEAR   && tm > END_MONTH))   return;
    viewMonth = tm; viewYear = ty;
  }

  function jumpToToday() {
    const cy = today.getFullYear();
    const cm = today.getMonth();
    if (cy >= START_YEAR && cy <= END_YEAR) { viewYear = cy; viewMonth = cm; }
  }

  function saveDeadline() {
    const title = formTitle.trim();
    if (!title || !formDate) return;
    events = [...events, { id: crypto.randomUUID(), title, date: formDate }];
    formTitle = ''; formDate = ''; showModal = false;
  }

  function deleteEvent(id: string, e: MouseEvent) {
    e.stopPropagation();
    events = events.filter(ev => ev.id !== id);
  }
</script>

<div class="app-container">
  <header class="controls">
    <div class="month-display">
      <h1>{viewDate.toLocaleString('default', { month: 'long' })}</h1>
      <span>{viewDate.getFullYear()}</span>
    </div>
    <div class="nav-group">
      <button class="nav-btn" onclick={() => changeMonth(-1)}>←</button>
      <button class="nav-btn today-btn" onclick={jumpToToday}>Today</button>
      <button class="nav-btn" onclick={() => changeMonth(1)}>→</button>
    </div>
    <button class="add-deadline-btn" onclick={() => { formDate = ''; showModal = true; }}>
      + Add Deadline
    </button>
  </header>

  <div class="calendar-wrapper">
    <div class="weekday-header">
      {#each ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] as day}
        <div class="weekday">{day}</div>
      {/each}
    </div>

    <div class="grid">
      {#each calendarDays as cell}
        {@const dayEvents = events.filter(e => e.date === cell.dateStr)}
        <div
          class="cell"
          class:not-current={!cell.isCurrentMonth}
          onmouseenter={() => hoveredDate = cell.dateStr}
          onmouseleave={() => hoveredDate = null}
          onclick={() => { formDate = cell.dateStr; showModal = true; }}
          role="presentation"
        >
          <div class="cell-header">
            <span class="day-num" class:is-today={cell.isToday}>{cell.dayNum}</span>
          </div>

          <div class="event-preview-stack">
            {#each dayEvents.slice(0, 3) as event}
              <div class="mini-event">{event.title}</div>
            {/each}
            {#if dayEvents.length > 3}
              <div class="more-tag">+{dayEvents.length - 3} more</div>
            {/if}
          </div>

          {#if hoveredDate === cell.dateStr && dayEvents.length > 0}
            <div class="floating-details">
              <div class="details-inner">
                <p class="details-date">
                  {new Date(cell.dateStr).toLocaleString('default', { month: 'short', day: 'numeric' })}
                </p>
                {#each dayEvents as event}
                  <div class="full-event-item">
                    <span class="bullet"></span>
                    <span class="flex-1">{event.title}</span>
                    <button
                      onclick={(e) => deleteEvent(event.id, e)}
                      class="delete-event-btn"
                      aria-label="Delete event"
                    >✕</button>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

{#if showModal}
  <div class="modal-overlay" onclick={() => showModal = false} role="presentation">
    <div class="modal" onclick={(e) => e.stopPropagation()} role="presentation">
      <h2>New Deadline</h2>
      <div class="input-stack">
        <input type="text" bind:value={formTitle} placeholder="What's the deadline?" autofocus />
        <input type="date" bind:value={formDate} />
      </div>
      <div class="modal-actions">
        <button class="cancel-btn" onclick={() => showModal = false}>Discard</button>
        <button class="save-btn" onclick={saveDeadline}>Add to Calendar</button>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(html, body) {
    margin: 0; padding: 0; height: 100%;
    background-color: #000; color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    overflow: hidden;
  }
  .app-container { display: flex; flex-direction: column; height: 100vh; padding: 20px; box-sizing: border-box; }
  .controls { display: flex; justify-content: space-between; align-items: center; padding: 10px 0 20px 0; flex-shrink: 0; }
  .month-display { display: flex; align-items: baseline; gap: 10px; }
  .month-display h1 { margin: 0; font-size: 32px; font-weight: 600; }
  .month-display span { color: #444; font-size: 24px; }
  .nav-group { display: flex; background: #111; border-radius: 12px; padding: 4px; gap: 4px; }
  .nav-btn { background: transparent; border: none; color: #888; padding: 8px 16px; cursor: pointer; border-radius: 8px; font-weight: 500; }
  .nav-btn:hover { color: #fff; background: #222; }
  .today-btn { color: #fff; background: #222; }
  .add-deadline-btn { background: #fff; color: #000; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 600; cursor: pointer; }
  .calendar-wrapper { flex: 1; min-height: 0; display: flex; flex-direction: column; border: 1px solid #222; border-radius: 20px; overflow: visible; background: #222; }
  .weekday-header { display: grid; grid-template-columns: repeat(7, 1fr); background: #000; border-top-left-radius: 20px; border-top-right-radius: 20px; border-bottom: 1px solid #222; flex-shrink: 0; }
  .weekday { padding: 15px; text-align: center; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #444; font-weight: 700; }
  .grid { flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(7, 1fr); grid-template-rows: repeat(6, minmax(0, 1fr)); gap: 1px; background: #222; }
  .cell { background: #000; padding: 12px; position: relative; cursor: pointer; transition: background 0.2s; min-height: 0; }
  .cell:hover { background: #050505; }
  .not-current { background: #020202; }
  .not-current .day-num { color: #222; }
  .cell-header { flex-shrink: 0; }
  .day-num { font-size: 14px; color: #555; }
  .is-today { background: #fff; color: #000 !important; padding: 2px 8px; border-radius: 6px; font-weight: bold; }
  .event-preview-stack { margin-top: 10px; display: flex; flex-direction: column; gap: 4px; max-height: 72px; overflow: hidden; }
  .mini-event { background: #111; border: 1px solid #222; padding: 4px 8px; border-radius: 6px; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex-shrink: 0; }
  .more-tag { font-size: 10px; color: #444; font-weight: 600; padding-left: 4px; flex-shrink: 0; }
  .floating-details { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 220px; z-index: 1000; pointer-events: none; }
  .details-inner { background: #111; border: 1px solid #333; border-radius: 16px; padding: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.8); animation: fadeIn 0.15s ease-out; pointer-events: auto; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
  .details-date { margin: 0 0 12px 0; font-size: 12px; color: #555; font-weight: bold; text-transform: uppercase; }
  .full-event-item { display: flex; align-items: center; gap: 8px; padding: 8px 0; border-bottom: 1px solid #222; font-size: 13px; color: #eee; }
  .bullet { width: 6px; height: 6px; background: #fff; border-radius: 50%; flex-shrink: 0; }
  .delete-event-btn { background: none; border: none; color: #555; cursor: pointer; font-size: 11px; padding: 2px 4px; border-radius: 4px; line-height: 1; }
  .delete-event-btn:hover { color: #ef4444; background: rgba(239,68,68,0.1); }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 2000; }
  .modal { background: #111; border: 1px solid #222; padding: 40px; border-radius: 24px; width: 400px; display: flex; flex-direction: column; gap: 24px; }
  .modal h2 { margin: 0; font-size: 24px; font-weight: 500; }
  .input-stack { display: flex; flex-direction: column; gap: 12px; }
  .input-stack input[type="text"] { background: transparent; border: none; border-bottom: 1px solid #333; color: #fff; font-size: 20px; padding: 10px 0; outline: none; }
  .input-stack input[type="text"]:focus { border-bottom-color: #fff; }
  .input-stack input[type="date"] { background: #1a1a1a; border: 1px solid #333; color: #fff; padding: 12px; border-radius: 12px; font-size: 14px; }
  .modal-actions { display: flex; justify-content: flex-end; gap: 16px; margin-top: 10px; }
  .cancel-btn { background: transparent; border: none; color: #555; cursor: pointer; font-size: 14px; }
  .save-btn { background: #fff; color: #000; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 600; cursor: pointer; }
  :global(.calendar-wrapper *) { box-sizing: border-box; }
</style>