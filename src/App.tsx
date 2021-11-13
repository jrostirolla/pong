import './App.css';
import React from "react";
import { PongRenderer } from './Components/PongRenderer';
import { IPongRenderGameState } from './IPongRenderGameState';

const testState: IPongRenderGameState = {
    ballX: 0.01,
    ballY: 0.01,
    paddleAPosition: 0,
    paddleBPosition: 0,
    scoreA: 0,
    scoreB: 0,
}

const App = () => <PongRenderer width={1080} gameState={testState}  />;

export default App;
