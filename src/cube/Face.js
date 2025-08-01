// src/cube/Face.js

import Sticker from './Sticker';

class Face {
    constructor(color, name) { // e.g., 'white', 'U' for Up face
        this.color = color;
        this.name = name;
        this.stickers = []; // A 3x3 array of Sticker objects

        // Initialize with default stickers for this face
        for (let r = 0; r < 3; r++) {
            this.stickers[r] = [];
            for (let c = 0; c < 3; c++) {
                this.stickers[r][c] = new Sticker(color, name, r, c);
            }
        }
    }

    // Method to get a sticker by row/col
    getSticker(row, col) {
        return this.stickers[row][col];
    }

    // Method to set a sticker at row/col
    setSticker(row, col, sticker) {
        this.stickers[row][col] = sticker;
    }
}

export default Face;