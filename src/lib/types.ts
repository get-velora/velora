import type { Component, ComponentType } from 'svelte';

export type ResourceType = 'article' | 'video' | 'tool' | 'guide' | 'official' | 'calculator';

export interface NodeResource {
    id: string;
    title: string;
    description: string;
    url: string;
    type: ResourceType;
    completed: boolean;
}

export interface PathfinderNode {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'current' | 'upcoming';
    level: number;
    position: 'center' | 'left' | 'right';
    icon: Component<any> | ComponentType<any> | any;
    track?: 'general' | 'stem' | 'humanities' | 'arts' | 'testing-sat' | 'testing-act' | 'financial';
    resources: NodeResource[];
}