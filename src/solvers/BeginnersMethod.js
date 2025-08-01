// src/solvers/BeginnersMethod.js

import Cube from '../cube/Cube';
import MoveEngine from '../cube/MoveEngine';
import { FACE_COLORS_MAP, FACE_NAMES } from '../cube/constants';

class BeginnersMethod {
    static solve(cube) {
        console.log("Starting Beginner's Method solver...");
        const solution = [];
        let currentCube = cube.clone();

        // Step 1: Solve the White Cross
        console.log("Step 1: Solving the White Cross...");
        const whiteCrossMoves = this.solveWhiteCross(currentCube);
        solution.push(...whiteCrossMoves);
        whiteCrossMoves.forEach(move => MoveEngine.applyMove(currentCube, move));
        console.log(`White Cross solved in ${whiteCrossMoves.length} moves.`);

        return solution;
    }

    /**
     * Finds the current location of an edge piece.
     * @param {Cube} cube The cube state.
     * @param {string} color1 The first color of the edge piece.
     * @param {string} color2 The second color of the edge piece.
     * @returns {{face: string, neighborFace: string}} or null
     */
    static findEdgePiece(cube, color1, color2) {
        const edgePositions = {
            'U': { 'F': [0, 1], 'R': [1, 2], 'B': [2, 1], 'L': [1, 0] },
            'D': { 'F': [2, 1], 'R': [1, 2], 'B': [0, 1], 'L': [1, 0] },
            'F': { 'U': [0, 1], 'R': [1, 2], 'D': [2, 1], 'L': [1, 0] },
            'R': { 'U': [1, 2], 'F': [1, 2], 'D': [1, 2], 'B': [1, 0] },
            'B': { 'U': [0, 1], 'L': [1, 2], 'D': [2, 1], 'R': [1, 0] },
            'L': { 'U': [1, 0], 'F': [1, 0], 'D': [1, 0], 'B': [1, 2] },
        };

        for (const face of FACE_NAMES) {
            for (const neighborFace in edgePositions[face]) {
                const [r, c] = edgePositions[face][neighborFace];
                const stickerColor = cube.faces[face].stickers[r][c].color;
                
                const [n_r, n_c] = edgePositions[neighborFace][face];
                const neighborColor = cube.faces[neighborFace].stickers[n_r][n_c].color;

                if ((stickerColor === color1 && neighborColor === color2) || 
                    (stickerColor === color2 && neighborColor === color1)) {
                    return { face, neighborFace };
                }
            }
        }
        return null;
    }

    /**
     * Helper to apply a move and add it to the solution moves.
     * @param {Cube} cube
     * @param {string[]} moves
     * @param {string} move
     */
    static applyAndRecordMove(cube, moves, move) {
        MoveEngine.applyMove(cube, move);
        moves.push(move);
    }

    /**
     * Step 1: Solve the white cross.
     * @param {Cube} cube The cube to solve.
     * @returns {string[]} The sequence of moves to solve the white cross.
     */
    static solveWhiteCross(cube) {
        const moves = [];
        let tempCube = cube.clone();

        const whiteColor = FACE_COLORS_MAP['U'];
        const edgeTargets = [
            { mainColor: 'green', targetFace: 'F' },
            { mainColor: 'red', targetFace: 'R' },
            { mainColor: 'blue', targetFace: 'B' },
            { mainColor: 'orange', targetFace: 'L' }
        ];

        for (const edge of edgeTargets) {
            const { mainColor, targetFace } = edge;

            // Loop until the edge is in the correct solved position
            let pieceLocation = this.findEdgePiece(tempCube, whiteColor, mainColor);
            
            while (
                tempCube.faces[targetFace].stickers[0][1].color !== whiteColor ||
                tempCube.faces[targetFace].stickers[1][1].color !== mainColor
            ) {
                pieceLocation = this.findEdgePiece(tempCube, whiteColor, mainColor);
                if (!pieceLocation) {
                    console.error("Error: Edge piece not found.");
                    break;
                }

                if (pieceLocation.face === 'U' && tempCube.faces[targetFace].stickers[0][1].color !== whiteColor) {
                    // Piece is in the top layer, but not on the target face. Rotate U.
                    this.applyAndRecordMove(tempCube, moves, 'U');
                } else if (pieceLocation.face === targetFace && tempCube.faces[targetFace].stickers[0][1].color === mainColor) {
                    // Piece is on the target face, but flipped.
                    this.applyAndRecordMove(tempCube, moves, targetFace);
                    this.applyAndRecordMove(tempCube, moves, 'U');
                    this.applyAndRecordMove(tempCube, moves, targetFace + '\'');
                } else if (pieceLocation.face === 'D') {
                    // Piece is on the bottom face. Align it, then bring it up.
                    while (tempCube.faces[targetFace].stickers[2][1].color !== mainColor) {
                        this.applyAndRecordMove(tempCube, moves, 'D');
                    }
                    this.applyAndRecordMove(tempCube, moves, targetFace + '2');
                } else if (pieceLocation.face !== 'U' && pieceLocation.face !== 'D') {
                    // Piece is in the middle layer. Bring it to the bottom.
                    this.applyAndRecordMove(tempCube, moves, pieceLocation.face);
                    this.applyAndRecordMove(tempCube, moves, 'D');
                    this.applyAndRecordMove(tempCube, moves, pieceLocation.face + '\'');
                }
            }
        }
        return moves;
    }

    static solveWhiteCorners(cube) { return []; }
    static solveMiddleLayer(cube) { return []; }
    static solveYellowCross(cube) { return []; }
    static orientYellowCross(cube) { return []; }
    static positionYellowCorners(cube) { return []; }
    static orientYellowCorners(cube) { return []; }
}

export default BeginnersMethod;
