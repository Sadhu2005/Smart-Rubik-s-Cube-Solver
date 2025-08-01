// src/ui/Cube3D.jsx

import React from 'react';
import { FACE_COLORS_MAP } from '../cube/constants';

const Sticker = ({ color, position }) => {
    return (
        <mesh position={position}>
            <boxGeometry args={[0.9, 0.9, 0.1]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
};

const Face = ({ name, stickers }) => {
    const stickerMeshes = [];

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const stickerColor = stickers[r][c].color;

            // Calculate the position of each sticker relative to the face's center
            const x = (c - 1);
            const y = (1 - r);
            const z = 0.05;

            stickerMeshes.push(
                <Sticker 
                    key={`${name}-${r}-${c}`}
                    color={stickerColor}
                    position={[x, y, z]} 
                />
            );
        }
    }

    return <group>{stickerMeshes}</group>;
};

const Cube3D = ({ cubeState }) => {
    const faces = [
        // Up face (White) - Rotated 90 degrees around X-axis
        { name: 'U', rotation: [Math.PI / 2, 0, 0], position: [0, 1.5, 0] },
        // Down face (Yellow) - Rotated -90 degrees around X-axis
        { name: 'D', rotation: [-Math.PI / 2, 0, 0], position: [0, -1.5, 0] },
        // Front face (Green) - No rotation needed
        { name: 'F', rotation: [0, 0, 0], position: [0, 0, 1.5] },
        // Back face (Blue) - Rotated 180 degrees around Y-axis
        { name: 'B', rotation: [0, Math.PI, 0], position: [0, 0, -1.5] },
        // Left face (Orange) - Rotated -90 degrees around Y-axis
        { name: 'L', rotation: [0, -Math.PI / 2, 0], position: [-1.5, 0, 0] },
        // Right face (Red) - Rotated 90 degrees around Y-axis
        { name: 'R', rotation: [0, Math.PI / 2, 0], position: [1.5, 0, 0] },
    ];

    return (
        <group>
            {faces.map(face => (
                <group key={face.name} rotation={face.rotation} position={face.position}>
                    <Face name={face.name} stickers={cubeState.faces[face.name].stickers} />
                </group>
            ))}
        </group>
    );
};

export default Cube3D;