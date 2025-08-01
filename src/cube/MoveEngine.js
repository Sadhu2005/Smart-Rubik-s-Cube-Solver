// src/cube/MoveEngine.js

import { rotateFaceClockwise, rotateFaceCounterClockwise } from './moves';

class MoveEngine {
    static applyMove(cube, move) {
        const faces = cube.faces;
        
        switch (move) {
            case 'U': this.moveU(faces); break;
            case 'U\'': this.moveUPrime(faces); break;
            case 'U2': this.moveU(faces); this.moveU(faces); break;

            case 'D': this.moveD(faces); break;
            case 'D\'': this.moveDPrime(faces); break;
            case 'D2': this.moveD(faces); this.moveD(faces); break;

            case 'R': this.moveR(faces); break;
            case 'R\'': this.moveRPrime(faces); break;
            case 'R2': this.moveR(faces); this.moveR(faces); break;

            case 'L': this.moveL(faces); break;
            case 'L\'': this.moveLPrime(faces); break;
            case 'L2': this.moveL(faces); this.moveL(faces); break;

            case 'F': this.moveF(faces); break;
            case 'F\'': this.moveFPrime(faces); break;
            case 'F2': this.moveF(faces); this.moveF(faces); break;

            case 'B': this.moveB(faces); break;
            case 'B\'': this.moveBPrime(faces); break;
            case 'B2': this.moveB(faces); this.moveB(faces); break;
            
            default: console.warn(`Invalid move: ${move}`); break;
        }
    }

    static moveU(faces) {
        faces['U'].stickers = rotateFaceClockwise(faces['U'].stickers);
        const tempRow = faces['F'].stickers[0];
        faces['F'].stickers[0] = faces['R'].stickers[0];
        faces['R'].stickers[0] = faces['B'].stickers[0];
        faces['B'].stickers[0] = faces['L'].stickers[0];
        faces['L'].stickers[0] = tempRow;
    }
    static moveUPrime(faces) {
        faces['U'].stickers = rotateFaceCounterClockwise(faces['U'].stickers);
        const tempRow = faces['F'].stickers[0];
        faces['F'].stickers[0] = faces['L'].stickers[0];
        faces['L'].stickers[0] = faces['B'].stickers[0];
        faces['B'].stickers[0] = faces['R'].stickers[0];
        faces['R'].stickers[0] = tempRow;
    }

    static moveD(faces) {
        faces['D'].stickers = rotateFaceClockwise(faces['D'].stickers);
        const tempRow = faces['F'].stickers[2];
        faces['F'].stickers[2] = faces['L'].stickers[2];
        faces['L'].stickers[2] = faces['B'].stickers[2];
        faces['B'].stickers[2] = faces['R'].stickers[2];
        faces['R'].stickers[2] = tempRow;
    }
    static moveDPrime(faces) {
        faces['D'].stickers = rotateFaceCounterClockwise(faces['D'].stickers);
        const tempRow = faces['F'].stickers[2];
        faces['F'].stickers[2] = faces['R'].stickers[2];
        faces['R'].stickers[2] = faces['B'].stickers[2];
        faces['B'].stickers[2] = faces['L'].stickers[2];
        faces['L'].stickers[2] = tempRow;
    }

    static moveR(faces) {
        faces['R'].stickers = rotateFaceClockwise(faces['R'].stickers);
        const tempCol = [faces['F'].stickers[0][2], faces['F'].stickers[1][2], faces['F'].stickers[2][2]];
        
        faces['F'].stickers[0][2] = faces['D'].stickers[0][2];
        faces['F'].stickers[1][2] = faces['D'].stickers[1][2];
        faces['F'].stickers[2][2] = faces['D'].stickers[2][2];

        faces['D'].stickers[0][2] = faces['B'].stickers[2][0];
        faces['D'].stickers[1][2] = faces['B'].stickers[1][0];
        faces['D'].stickers[2][2] = faces['B'].stickers[0][0];

        faces['B'].stickers[2][0] = faces['U'].stickers[0][2];
        faces['B'].stickers[1][0] = faces['U'].stickers[1][2];
        faces['B'].stickers[0][0] = faces['U'].stickers[2][2];

        faces['U'].stickers[0][2] = tempCol[0];
        faces['U'].stickers[1][2] = tempCol[1];
        faces['U'].stickers[2][2] = tempCol[2];
    }
    static moveRPrime(faces) {
        faces['R'].stickers = rotateFaceCounterClockwise(faces['R'].stickers);
        const tempCol = [faces['F'].stickers[0][2], faces['F'].stickers[1][2], faces['F'].stickers[2][2]];

        faces['F'].stickers[0][2] = faces['U'].stickers[0][2];
        faces['F'].stickers[1][2] = faces['U'].stickers[1][2];
        faces['F'].stickers[2][2] = faces['U'].stickers[2][2];

        faces['U'].stickers[0][2] = faces['B'].stickers[2][0];
        faces['U'].stickers[1][2] = faces['B'].stickers[1][0];
        faces['U'].stickers[2][2] = faces['B'].stickers[0][0];

        faces['B'].stickers[2][0] = faces['D'].stickers[0][2];
        faces['B'].stickers[1][0] = faces['D'].stickers[1][2];
        faces['B'].stickers[0][0] = faces['D'].stickers[2][2];

        faces['D'].stickers[0][2] = tempCol[0];
        faces['D'].stickers[1][2] = tempCol[1];
        faces['D'].stickers[2][2] = tempCol[2];
    }
    
    static moveL(faces) {
        faces['L'].stickers = rotateFaceClockwise(faces['L'].stickers);
        const tempCol = [faces['F'].stickers[0][0], faces['F'].stickers[1][0], faces['F'].stickers[2][0]];
        
        faces['F'].stickers[0][0] = faces['U'].stickers[0][0];
        faces['F'].stickers[1][0] = faces['U'].stickers[1][0];
        faces['F'].stickers[2][0] = faces['U'].stickers[2][0];
        
        faces['U'].stickers[0][0] = faces['B'].stickers[2][2];
        faces['U'].stickers[1][0] = faces['B'].stickers[1][2];
        faces['U'].stickers[2][0] = faces['B'].stickers[0][2];

        faces['B'].stickers[2][2] = faces['D'].stickers[0][0];
        faces['B'].stickers[1][2] = faces['D'].stickers[1][0];
        faces['B'].stickers[0][2] = faces['D'].stickers[2][0];

        faces['D'].stickers[0][0] = tempCol[0];
        faces['D'].stickers[1][0] = tempCol[1];
        faces['D'].stickers[2][0] = tempCol[2];
    }
    static moveLPrime(faces) {
        faces['L'].stickers = rotateFaceCounterClockwise(faces['L'].stickers);
        const tempCol = [faces['F'].stickers[0][0], faces['F'].stickers[1][0], faces['F'].stickers[2][0]];
        
        faces['F'].stickers[0][0] = faces['D'].stickers[0][0];
        faces['F'].stickers[1][0] = faces['D'].stickers[1][0];
        faces['F'].stickers[2][0] = faces['D'].stickers[2][0];

        faces['D'].stickers[0][0] = faces['B'].stickers[2][2];
        faces['D'].stickers[1][0] = faces['B'].stickers[1][2];
        faces['D'].stickers[2][0] = faces['B'].stickers[0][2];
        
        faces['B'].stickers[2][2] = faces['U'].stickers[0][0];
        faces['B'].stickers[1][2] = faces['U'].stickers[1][0];
        faces['B'].stickers[0][2] = faces['U'].stickers[2][0];

        faces['U'].stickers[0][0] = tempCol[0];
        faces['U'].stickers[1][0] = tempCol[1];
        faces['U'].stickers[2][0] = tempCol[2];
    }

    static moveF(faces) {
        faces['F'].stickers = rotateFaceClockwise(faces['F'].stickers);
        const tempRow = [faces['U'].stickers[2][0], faces['U'].stickers[2][1], faces['U'].stickers[2][2]];
        
        faces['U'].stickers[2][0] = faces['L'].stickers[2][2];
        faces['U'].stickers[2][1] = faces['L'].stickers[1][2];
        faces['U'].stickers[2][2] = faces['L'].stickers[0][2];

        faces['L'].stickers[2][2] = faces['D'].stickers[0][2];
        faces['L'].stickers[1][2] = faces['D'].stickers[0][1];
        faces['L'].stickers[0][2] = faces['D'].stickers[0][0];

        faces['D'].stickers[0][2] = faces['R'].stickers[0][0];
        faces['D'].stickers[0][1] = faces['R'].stickers[1][0];
        faces['D'].stickers[0][0] = faces['R'].stickers[2][0];

        faces['R'].stickers[0][0] = tempRow[0];
        faces['R'].stickers[1][0] = tempRow[1];
        faces['R'].stickers[2][0] = tempRow[2];
    }
    static moveFPrime(faces) {
        faces['F'].stickers = rotateFaceCounterClockwise(faces['F'].stickers);
        const tempRow = [faces['U'].stickers[2][0], faces['U'].stickers[2][1], faces['U'].stickers[2][2]];

        faces['U'].stickers[2][0] = faces['R'].stickers[0][0];
        faces['U'].stickers[2][1] = faces['R'].stickers[1][0];
        faces['U'].stickers[2][2] = faces['R'].stickers[2][0];

        faces['R'].stickers[0][0] = faces['D'].stickers[0][2];
        faces['R'].stickers[1][0] = faces['D'].stickers[0][1];
        faces['R'].stickers[2][0] = faces['D'].stickers[0][0];

        faces['D'].stickers[0][2] = faces['L'].stickers[2][2];
        faces['D'].stickers[0][1] = faces['L'].stickers[1][2];
        faces['D'].stickers[0][0] = faces['L'].stickers[0][2];
        
        faces['L'].stickers[2][2] = tempRow[0];
        faces['L'].stickers[1][2] = tempRow[1];
        faces['L'].stickers[0][2] = tempRow[2];
    }

    static moveB(faces) {
        faces['B'].stickers = rotateFaceClockwise(faces['B'].stickers);
        const tempRow = [faces['U'].stickers[0][0], faces['U'].stickers[0][1], faces['U'].stickers[0][2]];

        faces['U'].stickers[0][0] = faces['R'].stickers[0][2];
        faces['U'].stickers[0][1] = faces['R'].stickers[1][2];
        faces['U'].stickers[0][2] = faces['R'].stickers[2][2];
        
        faces['R'].stickers[0][2] = faces['D'].stickers[2][2];
        faces['R'].stickers[1][2] = faces['D'].stickers[2][1];
        faces['R'].stickers[2][2] = faces['D'].stickers[2][0];

        faces['D'].stickers[2][2] = faces['L'].stickers[2][0];
        faces['D'].stickers[2][1] = faces['L'].stickers[1][0];
        faces['D'].stickers[2][0] = faces['L'].stickers[0][0];

        faces['L'].stickers[2][0] = tempRow[0];
        faces['L'].stickers[1][0] = tempRow[1];
        faces['L'].stickers[0][0] = tempRow[2];
    }
    static moveBPrime(faces) {
        faces['B'].stickers = rotateFaceCounterClockwise(faces['B'].stickers);
        const tempRow = [faces['U'].stickers[0][0], faces['U'].stickers[0][1], faces['U'].stickers[0][2]];
        
        faces['U'].stickers[0][0] = faces['L'].stickers[2][0];
        faces['U'].stickers[0][1] = faces['L'].stickers[1][0];
        faces['U'].stickers[0][2] = faces['L'].stickers[0][0];

        faces['L'].stickers[2][0] = faces['D'].stickers[2][2];
        faces['L'].stickers[1][0] = faces['D'].stickers[2][1];
        faces['L'].stickers[0][0] = faces['D'].stickers[2][0];
        
        faces['D'].stickers[2][2] = faces['R'].stickers[0][2];
        faces['D'].stickers[2][1] = faces['R'].stickers[1][2];
        faces['D'].stickers[2][0] = faces['R'].stickers[2][2];

        faces['R'].stickers[0][2] = tempRow[0];
        faces['R'].stickers[1][2] = tempRow[1];
        faces['R'].stickers[2][2] = tempRow[2];
    }
}

export default MoveEngine;
