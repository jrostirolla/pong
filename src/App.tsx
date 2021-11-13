import './App.css';
import React from "react";
import { PongRenderer } from './Components/PongRenderer';
import { IPongRenderGameState } from './IPongRenderGameState';

const testState: IPongRenderGameState = {
    ballX: 0.5,
    ballY: 0.5,
    paddleAPosition: 500,
    paddleBPosition: 500,
    scoreA: 0,
    scoreB: 0,
}

const App = () => <PongRenderer width={1080} gameState={testState}  />;

export default App;