// src/cube/constants.js

export const FACE_NAMES = ['U', 'D', 'F', 'B', 'L', 'R'];

export const FACE_COLORS_MAP = {
    'U': 'white',
    'D': 'yellow',
    'F': 'green',
    'B': 'blue',
    'L': 'orange',
    'R': 'red'
};

// Define standard moves (U, U', D, D', etc.)
// These will be used by the MoveEngine.
export const STANDARD_MOVES = [
    'U', 'U\'', 'U2',
    'D', 'D\'', 'D2',
    'R', 'R\'', 'R2',
    'L', 'L\'', 'L2',
    'F', 'F\'', 'F2',
    'B', 'B\'', 'B2'
];