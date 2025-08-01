// src/App.jsx

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState } from 'react';
import Cube from './cube/Cube';
import Cube3D from './ui/Cube3D';
import BeginnersMethod from './solvers/BeginnersMethod'; // <-- Import the new solver
import { STANDARD_MOVES } from './cube/constants'; // Import standard moves to scramble


function App() {
    const [cube, setCube] = useState(() => new Cube());
    const [solutionMoves, setSolutionMoves] = useState([]);
    const [scrambleMoves, setScrambleMoves] = useState([]);

    const handleMove = (move) => {
        const newCube = cube.clone();
        newCube.applyMove(move);
        setCube(newCube);
    };

    const handleScramble = () => {
        const scramble = [];
        const newCube = cube.clone();
        for (let i = 0; i < 20; i++) {
            const randomMove = STANDARD_MOVES[Math.floor(Math.random() * STANDARD_MOVES.length)];
            scramble.push(randomMove);
            newCube.applyMove(randomMove);
        }
        setScrambleMoves(scramble);
        setCube(newCube);
        setSolutionMoves([]);
        console.log('Scramble sequence:', scramble.join(' '));
    };

    // Corrected handleSolve function
    const handleSolve = () => {
        console.log("Solving...");
        const moves = BeginnersMethod.solve(cube);
        console.log('Solution found:', moves.join(' '));
        
        // This is the new, crucial part.
        // We will apply the moves one by one with a delay to create an animation.
        const newCube = cube.clone();
        let moveIndex = 0;

        const animateSolution = setInterval(() => {
            if (moveIndex < moves.length) {
                newCube.applyMove(moves[moveIndex]);
                setCube(newCube.clone()); // We must clone the cube to force a re-render
                moveIndex++;
            } else {
                clearInterval(animateSolution);
            }
        }, 300); // 300ms delay between each move
    };

    return (
        // ... (rest of the component is the same) ...
        <div style={{ width: '100vw', height: '100vh', background: '#222' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Cube3D cubeState={cube} />
                <OrbitControls />
            </Canvas>
            
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <button onClick={handleScramble}>Scramble</button>
                <button onClick={handleSolve}>Solve</button>
                <button onClick={() => handleMove('U')}>U</button>
                <button onClick={() => handleMove('U\'')}>U'</button>
                <button onClick={() => handleMove('D')}>D</button>
                <button onClick={() => handleMove('D\'')}>D'</button>
                <button onClick={() => handleMove('R')}>R</button>
                <button onClick={() => handleMove('R\'')}>R'</button>
                <button onClick={() => handleMove('L')}>L</button>
                <button onClick={() => handleMove('L\'')}>L'</button>
                <button onClick={() => handleMove('F')}>F</button>
                <button onClick={() => handleMove('F\'')}>F'</button>
                <button onClick={() => handleMove('B')}>B</button>
                <button onClick={() => handleMove('B\'')}>B'</button>
            </div>
        </div>
    );
}

export default App;
