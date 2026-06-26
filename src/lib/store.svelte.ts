// Svelte stores with automatic localStorage persistence

import { saveStore, loadStore } from "./persist";
import type {
  CollegesStore,
  ActivitiesStore,
  CalendarStore,
  SavedCollege,
  SavedActivity,
  SavedCalendarEvent,
} from "./persist";

// Default seed data

const DEFAULT_COLLEGES: CollegesStore = [
  {
    id: 1,
    name: "Stanford University",
    status: "Reach",
    cost: "$82,412",
    avgGpa: "3.96",
    avgTest: "1540",
    testOptional: true,
    url: "https://stanford.edu",
  },
];

const DEFAULT_ACTIVITIES: ActivitiesStore = [];

const DEFAULT_CALENDAR: CalendarStore = [];

// Store factory: reactive data with auto-save

function createCollegesStore() {
  let data = $state<CollegesStore>(
    loadStore<CollegesStore>("colleges", DEFAULT_COLLEGES),
  );

  $effect(() => {
    saveStore("colleges", data);
  });

  return {
    get data() {
      return data;
    },
    set data(v: CollegesStore) {
      data = v;
    },
  };
}

function createActivitiesStore() {
  let data = $state<ActivitiesStore>(
    loadStore<ActivitiesStore>("activities", DEFAULT_ACTIVITIES),
  );

  $effect(() => {
    saveStore("activities", data);
  });

  return {
    get data() {
      return data;
    },
    set data(v: ActivitiesStore) {
      data = v;
    },
  };
}

function createCalendarStore() {
  let data = $state<CalendarStore>(
    loadStore<CalendarStore>("calendar", DEFAULT_CALENDAR),
  );

  $effect(() => {
    saveStore("calendar", data);
  });

  return {
    get data() {
      return data;
    },
    set data(v: CalendarStore) {
      data = v;
    },
  };
}

// Export singleton stores
export const collegesStore = createCollegesStore();
export const activitiesStore = createActivitiesStore();
export const calendarStore = createCalendarStore();
