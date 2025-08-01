// src/cube/Cube.js

import Face from './Face';
import MoveEngine from './MoveEngine';
import Sticker from './Sticker';

class Cube {
    constructor() {
        this.faces = {};
        this.initializeCube();
    }

    initializeCube() {
        const faceColors = {
            'U': 'white', 'D': 'yellow', 'F': 'green',
            'B': 'blue', 'L': 'orange', 'R': 'red'
        };

        for (const [name, color] of Object.entries(faceColors)) {
            this.faces[name] = new Face(color, name);
        }
    }

    applyMove(move) {
        MoveEngine.applyMove(this, move);
    }

    isSolved() {
        for (const faceName in this.faces) {
            const face = this.faces[faceName];
            const centerColor = face.stickers[1][1].color;
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    if (face.stickers[r][c].color !== centerColor) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    // This is the missing method that caused the error.
    clone() {
        const newCube = new Cube();
        for (const faceName in this.faces) {
            newCube.faces[faceName] = new Face(this.faces[faceName].color, this.faces[faceName].name);
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    const originalSticker = this.faces[faceName].stickers[r][c];
                    newCube.faces[faceName].stickers[r][c] = new Sticker(
                        originalSticker.color,
                        originalSticker.initialFace,
                        originalSticker.initialRow,
                        originalSticker.initialCol
                    );
                }
            }
        }
        return newCube;
    }
}

export default Cube;