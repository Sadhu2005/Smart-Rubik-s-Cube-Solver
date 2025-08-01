// src/cube/moves.js

export function rotateFaceClockwise(faceStickers) {
    const newStickers = faceStickers.map(row => [...row]);
    newStickers[0][0] = faceStickers[2][0];
    newStickers[0][1] = faceStickers[1][0];
    newStickers[0][2] = faceStickers[0][0];
    newStickers[1][0] = faceStickers[2][1];
    newStickers[1][2] = faceStickers[0][1];
    newStickers[2][0] = faceStickers[2][2];
    newStickers[2][1] = faceStickers[1][2];
    newStickers[2][2] = faceStickers[0][2];
    return newStickers;
}

export function rotateFaceCounterClockwise(faceStickers) {
    const newStickers = faceStickers.map(row => [...row]);
    newStickers[0][0] = faceStickers[0][2];
    newStickers[0][1] = faceStickers[1][2];
    newStickers[0][2] = faceStickers[2][2];
    newStickers[1][0] = faceStickers[0][1];
    newStickers[1][2] = faceStickers[2][1];
    newStickers[2][0] = faceStickers[0][0];
    newStickers[2][1] = faceStickers[1][0];
    newStickers[2][2] = faceStickers[2][0];
    return newStickers;
}