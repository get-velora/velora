import type { PathfinderNode } from './types';
import {
    Check,
    Lock,
    Compass,
    GraduationCap,
    Sparkles,
    Flag,
    User,
    Search,
    BookOpen
} from 'lucide-svelte';

export const nodes: PathfinderNode[] = [
    // --- LEVEL 10 (Top - Incomplete) ---
    {
        id: "node-10",
        title: "The Pathfinder Match",
        description: "Query regional databases for summer cohorts, merit tuition scholarships, and research grants.",
        status: "upcoming",
        level: 10,
        position: "center",
        icon: Flag
    },
    // --- LEVEL 9 (Incomplete) ---
    {
        id: "node-9",
        title: "Merit Scholarship Query",
        description: "Identify institutional and private merit scholarships that align with your target GPA and standardized test scores.",
        status: "upcoming",
        level: 9,
        position: "center",
        icon: Search
    },
    // --- LEVEL 8 (Incomplete) ---
    {
        id: "node-8",
        title: "Summer Cohort Filter",
        description: "Review and short-list competitive pre-college summer academic programs, laboratory internships, and research fellowships.",
        status: "upcoming",
        level: 8,
        position: "center",
        icon: Compass
    },
    // --- LEVEL 7 (Incomplete) ---
    {
        id: "node-7",
        title: "PSAT Prep Baseline",
        description: "Take a raw, diagnostic PSAT or SAT baseline test on Khan Academy to measure your quantitative and verbal range.",
        status: "upcoming",
        level: 7,
        position: "center",
        icon: Search
    },
    // --- LEVEL 6 (Incomplete) ---
    {
        id: "node-6",
        title: "EC Baseline Audit",
        description: "Audit your extracurriculars to shift from passive membership to active, measurable leadership roles.",
        status: "upcoming",
        level: 6,
        position: "center",
        icon: Compass
    },
    {
        id: "node-6-opt-l",
        title: "Community Log",
        description: "Optional: Start recording volunteer hours at a local charity to satisfy state service grants.",
        status: "upcoming",
        level: 6,
        position: "left",
        icon: BookOpen
    },
    {
        id: "node-6-opt-r",
        title: "Club Officer Prep",
        description: "Optional: Draft a proposal to run for a leadership role in your high school's active clubs.",
        status: "upcoming",
        level: 6,
        position: "right",
        icon: Sparkles
    },
    // --- LEVEL 5 (Current / Active Focus Node) ---
    {
        id: "node-5",
        title: "Fall Semester Map",
        description: "Map out your fall semester course load. Selective universities expect STEM majors to show calculus readiness.",
        status: "current",
        level: 5,
        position: "center",
        icon: Sparkles
    },
    {
        id: "node-5-opt-r",
        title: "Honors Selection",
        description: "Optional: Verify if you can double-enroll in honors science tracks for an advanced course load.",
        status: "upcoming",
        level: 5,
        position: "right",
        icon: GraduationCap
    },
    // --- LEVEL 4 (Completed) ---
    {
        id: "node-4",
        title: "Honor Rigor Audit",
        description: "Analyzed freshman coursework and mapped Honors weights to verify GPA safety benchmarks.",
        status: "completed",
        level: 4,
        position: "center",
        icon: GraduationCap
    },
    {
        id: "node-4-opt-l",
        title: "Catalog Review",
        description: "Optional: Walk through your high school's complete course catalog to map pre-requisites early.",
        status: "completed",
        level: 4,
        position: "left",
        icon: Search
    },
    // --- LEVEL 3 (Completed) ---
    {
        id: "node-3",
        title: "Local Profile Built",
        description: "You successfully completed onboarding, set your target track (STEM Focus), and declared in-state parameters.",
        status: "completed",
        level: 3,
        position: "center",
        icon: User
    },
    // --- LEVEL 2 (Completed) ---
    {
        id: "node-2",
        title: "Academic Baseline",
        description: "Synced past standard coursework and confirmed weighted average calculations against school-specific scales.",
        status: "completed",
        level: 2,
        position: "center",
        icon: Check
    },
    // --- LEVEL 1 (Completed) ---
    {
        id: "node-1",
        title: "GPA Target Set",
        description: "Calculated stretch and safety targets for cumulative GPA benchmarks required by preferred universities.",
        status: "completed",
        level: 1,
        position: "center",
        icon: Check
    },
    // --- LEVEL 0 (Bottom - Completed) ---
    {
        id: "node-0",
        title: "Onboarding Init",
        description: "Account created and validated. Welcome to your personalized high school curriculum pathfinder.",
        status: "completed",
        level: 0,
        position: "center",
        icon: User
    }
];