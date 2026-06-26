// src/lib/persist.ts
// ─────────────────────────────────────────────────────────────
// Velora — accountless localStorage persistence layer
// One versioned key per pillar. Bump STORE_VERSION if you ever
// change the shape of a store so old data is cleanly discarded.
// ─────────────────────────────────────────────────────────────

const STORE_VERSION = 1;

type StoreKey = 'map' | 'colleges' | 'activities' | 'calendar';

function key(pillar: StoreKey): string {
    return `velora_v${STORE_VERSION}_${pillar}`;
}

export function saveStore<T>(pillar: StoreKey, data: T): void {
    try {
        localStorage.setItem(key(pillar), JSON.stringify(data));
    } catch (e) {
        // Storage quota exceeded or private browsing — fail silently
        console.warn(`[velora] Could not save ${pillar}:`, e);
    }
}

export function loadStore<T>(pillar: StoreKey, fallback: T): T {
    try {
        const raw = localStorage.getItem(key(pillar));
        if (!raw) return fallback;
        return JSON.parse(raw) as T;
    } catch (e) {
        console.warn(`[velora] Could not load ${pillar}:`, e);
        return fallback;
    }
}

export function clearStore(pillar: StoreKey): void {
    localStorage.removeItem(key(pillar));
}

export function clearAll(): void {
    (['map', 'colleges', 'activities', 'calendar'] as StoreKey[]).forEach(clearStore);
}

// ─────────────────────────────────────────────────────────────
// Per-pillar shape definitions — what actually gets saved
// ─────────────────────────────────────────────────────────────

// MAP — only save the mutable parts (status + resource completions)
// The full node definition (title, description, icon, etc.) always
// comes from nodesData.ts — we never persist static content.
export interface SavedNodeState {
    id: string;
    status: 'completed' | 'current' | 'upcoming';
    resourceIds: string[]; // IDs of completed resources only
}

export type MapStore = SavedNodeState[];

// COLLEGES — the entire user-built college list
export interface SavedCollege {
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

export type CollegesStore = SavedCollege[];

// ACTIVITIES — each extracurricular entry
export interface SavedActivity {
    id: number;
    name: string;
    role: string;
    hours: number;
    weeks: number;
    description: string;
    category: string;
    yearsActive: string[];
}

export type ActivitiesStore = SavedActivity[];

// CALENDAR — events / deadlines
export interface SavedCalendarEvent {
    id: number;
    title: string;
    date: string; // ISO string
    type: string;
    notes?: string;
    completed?: boolean;
}

export type CalendarStore = SavedCalendarEvent[];