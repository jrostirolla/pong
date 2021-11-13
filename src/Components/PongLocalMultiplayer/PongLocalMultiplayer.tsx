import React from "react";
import { PongRenderer } from "../PongRenderer";
import { usePongGameController } from "../../hooks/usePongGameController";
import { useInterval, useKeyPress } from "react-use";

const MOVE_AMOUNT = 0.02;

export const PongLocalMultiplayer: React.FC = () => {
  const pongController = usePongGameController();

  const [paUpPressed] = useKeyPress("w");
  const [paDownPressed] = useKeyPress("s");
  const [pbUpPressed] = useKeyPress("o");
  const [pbDownPressed] = useKeyPress("l");

  console.log(paUpPressed, paDownPressed);

  useInterval(() => {
    if (paUpPressed) {
      pongController.setPaddleAPosition(
        pongController.gameState.paddleAPosition - MOVE_AMOUNT
      );
    }

    if (paDownPressed) {
      pongController.setPaddleAPosition(
        pongController.gameState.paddleAPosition + MOVE_AMOUNT
      );
    }

    if (pbUpPressed) {
      pongController.setPaddleBPosition(
        pongController.gameState.paddleBPosition - MOVE_AMOUNT
      );
    }

    if (pbDownPressed) {
      pongController.setPaddleBPosition(
        pongController.gameState.paddleBPosition + MOVE_AMOUNT
      );
    }
  }, 16);

  return <PongRenderer width={600} gameState={pongController.gameState} />;
};
