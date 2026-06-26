// Persistence utilities for localStorage with versioned keys
const STORE_VERSION = 1;

// Added 'documents' to the valid keys
type StoreKey = 'map' | 'colleges' | 'activities' | 'calendar' | 'documents';

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
        // Ensure we are in a browser environment
        if (typeof window === 'undefined') return fallback;

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
    (['map', 'colleges', 'activities', 'calendar', 'documents'] as StoreKey[]).forEach(clearStore);
}

// Per-pillar data shapes

// MAP
export interface SavedNodeState {
    id: string;
    status: 'completed' | 'current' | 'upcoming';
    resourceIds: string[];
}
export type MapStore = SavedNodeState[];

// COLLEGES
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

// ACTIVITIES
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

// CALENDAR
export interface SavedCalendarEvent {
    id: number;
    title: string;
    date: string;
    type: string;
    notes?: string;
    completed?: boolean;
}
export type CalendarStore = SavedCalendarEvent[];

// DOCUMENTS: writing-area persistence
export interface SavedDocument {
    id: string;
    title: string;
    content: string;
}
export type DocumentsStore = SavedDocument[];