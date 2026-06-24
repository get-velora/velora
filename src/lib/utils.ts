import type { PathfinderNode } from './types';

export const ROW_HEIGHT = 140; // Spacing distance between rows
export const NODE_PADDING = 30; // Top margin padding
export const MAP_WIDTH = 520; // Expanded base width to allow wider branches

// Maps a node's level & position to exact X/Y coordinates
export function getCoordinates(level: number, position: string, maxLevel: number) {
    const y = NODE_PADDING + (maxLevel - level) * ROW_HEIGHT;
    const centerX = MAP_WIDTH / 2;

    let x = centerX;
    if (position === 'left') x = centerX - 150;  // Spaced out wider
    if (position === 'right') x = centerX + 150; // Spaced out wider

    return { x, y };
}

// Determines if a locked node is unlocked and available to be started (either trunk or branch)
export function isPossibleToComplete(node: PathfinderNode, nodes: PathfinderNode[]) {
    if (node.status === 'completed') return false;
    if (node.status === 'current') return false;

    // A center node is available if the previous level's center node is completed
    if (node.position === 'center') {
        if (node.level === 0) return false;
        const prevCenter = nodes.find(n => n.level === node.level - 1 && n.position === 'center');
        return prevCenter?.status === 'completed';
    }

    // A branch node is available if its corresponding same-level center node is completed OR active (current)
    const sameLevelCenter = nodes.find(n => n.level === node.level && n.position === 'center');
    return sameLevelCenter?.status === 'completed' || sameLevelCenter?.status === 'current';
}

export function nodePositionIsBranch(pos: string) {
    return pos === 'left' || pos === 'right';
}