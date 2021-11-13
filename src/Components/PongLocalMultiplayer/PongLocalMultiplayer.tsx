import React from "react";
import { PongRenderer } from "../PongRenderer";
import { usePongGameController } from "../../hooks/usePongGameController";

export const PongLocalMultiplayer: React.FC = () => {
  const pongController = usePongGameController();

  return <PongRenderer width={600} gameState={pongController.gameState} />;
};
