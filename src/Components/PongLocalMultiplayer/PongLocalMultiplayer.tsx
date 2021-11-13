import React from "react";
import { PongRenderer } from "../PongRenderer";
import { usePongGameController } from "../../hooks/usePongGameController";

export const PongLocalMultiplayer: React.FC = () => {
  const pongController = usePongGameController();

  return <PongRenderer width={1080} gameState={pongController.gameState} />;
};
