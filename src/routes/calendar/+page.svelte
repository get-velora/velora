<!-- Calendar page -->
<script lang="ts">
  import { saveStore, loadStore } from '$lib/persist';

  interface CalendarEvent {
    id: string;
    title: string;
    date: string;
  }

  const DEFAULT_EVENTS: CalendarEvent[] = [
    { id: "1", title: "Stanford EA",    date: "2026-11-01" },
    { id: "2", title: "FAFSA Opens",    date: "2026-11-01" },
  ];

  // State
  let events = $state<CalendarEvent[]>(loadStore<CalendarEvent[]>('calendar', DEFAULT_EVENTS));
  
  $effect(() => {
    saveStore('calendar', events);
  });

  let today = new Date();
  let viewYear  = $state(2026);
  let viewMonth = $state(5); 

  let showModal   = $state(false);
  let formTitle   = $state('');
  let formDate    = $state('');
  let hoveredDate = $state<string | null>(null);

  const START_YEAR  = 2024;
  const END_YEAR    = 2030;

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

  // Actions
  function changeMonth(step: number) {
    let tm = viewMonth + step;
    let ty = viewYear;
    if (tm > 11) { tm = 0; ty++; }
    else if (tm < 0) { tm = 11; ty--; }
    if (ty < START_YEAR || ty > END_YEAR) return;
    viewMonth = tm; 
    viewYear = ty;
  }

  function jumpToToday() {
    viewYear = today.getFullYear();
    viewMonth = today.getMonth();
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
    <div class="month-year-group">
      <h1>{viewDate.toLocaleString('default', { month: 'long' })}</h1>
      <span class="year-label">{viewDate.getFullYear()}</span>
    </div>

    <!-- Minimal Capsule -->
    <div class="capsule-nav">
      <button class="nav-icon-btn" onclick={() => changeMonth(-1)}>
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <div class="divider"></div>
      <button class="nav-today-btn" onclick={jumpToToday}>Today</button>
      <div class="divider"></div>
      <button class="nav-icon-btn" onclick={() => changeMonth(1)}>
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M9 18l6-6-6-6" /></svg>
      </button>
    </div>

    <button class="add-deadline-btn" onclick={() => { formDate = ''; showModal = true; }}>
      + Add Deadline
    </button>
  </header>

  <div class="calendar-wrapper">
    <div class="weekday-header">
      {#each ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] as day}
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
                    <button onclick={(e) => deleteEvent(event.id, e)} class="delete-event-btn">✕</button>
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
        <input type="text" bind:value={formTitle} placeholder="Deadline title..." autofocus />
        <input type="date" bind:value={formDate} />
      </div>
      <div class="modal-actions">
        <button class="cancel-btn" onclick={() => showModal = false}>Discard</button>
        <button class="save-btn" onclick={saveDeadline}>Add</button>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(html, body) {
    margin: 0; padding: 0; height: 100%;
    background-color: #000; color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    overflow: hidden;
  }

  .app-container { 
    display: flex; flex-direction: column; height: 100vh; 
    padding: 20px 40px; box-sizing: border-box; 
  }

  /* Header */
  .controls { 
    display: flex; justify-content: space-between; align-items: center; 
    padding: 20px 0 30px 0; flex-shrink: 0; 
  }

  .month-year-group { min-width: 220px; }
  .month-year-group h1 { 
    margin: 0; font-size: 32px; font-weight: normal; letter-spacing: -1px; 
  }
  .year-label { color: #555; font-size: 16px; margin-top: 2px; display: block; }

  /* Minimal capsule */
  .capsule-nav {
    display: flex; align-items: center; background: #111; 
    border: 1px solid #222; border-radius: 50px; padding: 2px; height: 36px;
  }

  .nav-icon-btn, .nav-today-btn {
    background: transparent; border: none; color: #888; 
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 0.15s ease; font-family: Arial, sans-serif;
  }

  .nav-icon-btn { width: 36px; height: 32px; border-radius: 50px; }
  .nav-today-btn { font-size: 13px; padding: 0 16px; height: 32px; border-radius: 50px; }

  .nav-icon-btn:hover, .nav-today-btn:hover { color: #fff; background: #222; }
  .nav-icon-btn:active { transform: scale(0.9); }

  .divider { width: 1px; height: 14px; background: #222; margin: 0 2px; }

  .add-deadline-btn { 
    background: #fff; color: #000; border: none; padding: 10px 20px; 
    border-radius: 50px; font-size: 13px; cursor: pointer; 
    transition: opacity 0.2s; font-family: Arial, sans-serif;
  }
  .add-deadline-btn:hover { opacity: 0.85; }

  /* Calendar grid */
  .calendar-wrapper { 
    flex: 1; display: flex; flex-direction: column; 
    border: 1px solid #1a1a1a; border-radius: 12px; overflow: hidden; 
  }

  .weekday-header { 
    display: grid; grid-template-columns: repeat(7, 1fr); 
    background: #080808; border-bottom: 1px solid #1a1a1a; 
  }
  .weekday { 
    padding: 12px; text-align: center; font-size: 11px; 
    color: #444; font-weight: normal; 
  }

  .grid { 
    flex: 1; display: grid; grid-template-columns: repeat(7, 1fr); 
    grid-template-rows: repeat(6, 1fr); gap: 1px; background: #1a1a1a; 
  }

  .cell { background: #000; padding: 12px; position: relative; cursor: pointer; }
  .cell:hover { background: #050505; }
  .not-current { background: #020202; }
  .not-current .day-num { color: #222; }

  .day-num { font-size: 13px; color: #666; display: inline-block; }

  /* White Highlight for Today */
  .is-today { 
    background: #fff; color: #000 !important; 
    padding: 3px 7px; border-radius: 4px; font-weight: normal; 
  }

  .event-preview-stack { margin-top: 8px; display: flex; flex-direction: column; gap: 3px; }
  .mini-event { 
    background: #111; border: 1px solid #1a1a1a; padding: 3px 6px; 
    border-radius: 4px; font-size: 11px; color: #ccc;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; 
  }
  .more-tag { font-size: 10px; color: #333; margin-top: 2px; }

  /* Details tooltip */
  .floating-details { 
    position: absolute; top: -5px; left: 50%; 
    transform: translateX(-50%); width: 200px; z-index: 50; pointer-events: none; 
  }
  .details-inner { 
    background: #0a0a0a; border: 1px solid #222; border-radius: 8px; 
    padding: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); pointer-events: auto; 
  }
  .details-date { margin: 0 0 8px 0; font-size: 10px; color: #555; text-transform: uppercase; }
  .full-event-item { display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid #111; font-size: 12px; }
  .bullet { width: 5px; height: 5px; background: #fff; border-radius: 50%; }
  .delete-event-btn { background: none; border: none; color: #444; cursor: pointer; font-size: 10px; }
  .delete-event-btn:hover { color: #fff; }

  /* Modal */
  .modal-overlay { 
    position: fixed; inset: 0; background: rgba(0,0,0,0.85); 
    display: flex; align-items: center; justify-content: center; z-index: 1000; 
  }
  .modal { 
    background: #000; border: 1px solid #222; padding: 40px; border-radius: 12px; 
    width: 320px; display: flex; flex-direction: column; gap: 20px; 
  }
  .modal h2 { margin: 0; font-size: 20px; font-weight: normal; }
  .input-stack input[type="text"] { 
    background: transparent; border: none; border-bottom: 1px solid #222; 
    color: #fff; font-size: 16px; padding: 8px 0; outline: none; width: 100%;
    font-family: Arial, sans-serif;
  }
  .input-stack input[type="date"] { 
    background: #111; border: 1px solid #222; color: #fff; 
    padding: 8px; border-radius: 4px; margin-top: 10px; width: 100%;
    font-family: Arial, sans-serif;
  }
  .modal-actions { display: flex; justify-content: flex-end; gap: 15px; }
  .cancel-btn { background: transparent; border: none; color: #555; cursor: pointer; font-size: 13px; }
  .save-btn { background: #fff; color: #000; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }

  .flex-1 { flex: 1; }
</style>