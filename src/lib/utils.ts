import type { PathfinderNode } from './types';

export const ROW_HEIGHT = 140;
export const NODE_PADDING = 30;
export const MAP_WIDTH = 520;

export function getCoordinates(level: number, position: string, maxLevel: number) {
    const y = NODE_PADDING + (maxLevel - level) * ROW_HEIGHT;
    const centerX = MAP_WIDTH / 2;
    let x = centerX;
    if (position === 'left') x = centerX - 150;
    if (position === 'right') x = centerX + 150;
    return { x, y };
}

export function isPossibleToComplete(node: PathfinderNode, nodes: PathfinderNode[]) {
    if (node.status === 'completed') return false;
    if (node.status === 'current') return false;

    if (node.position === 'center') {
        if (node.level === 0) return false;
        const prevCenter = nodes.find(n => n.level === node.level - 1 && n.position === 'center');
        return prevCenter?.status === 'completed';
    }

    const sameLevelCenter = nodes.find(n => n.level === node.level && n.position === 'center');
    return sameLevelCenter?.status === 'completed' || sameLevelCenter?.status === 'current';
}

export function nodePositionIsBranch(pos: string) {
    return pos === 'left' || pos === 'right';
}

export function allResourcesCompleted(node: PathfinderNode): boolean {
    if (node.resources.length === 0) return false;
    return node.resources.every(r => r.completed);
}