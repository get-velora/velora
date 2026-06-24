import type { Component, ComponentType } from 'svelte';

export interface PathfinderNode {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'current' | 'upcoming';
    level: number;
    position: 'center' | 'left' | 'right';
    icon: Component<any> | ComponentType<any> | any;
}