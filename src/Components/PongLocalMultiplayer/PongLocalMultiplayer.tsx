import React from "react";
import { PongRenderer } from "../PongRenderer";
import { usePongGameController } from "../../hooks/usePongGameController";
import { useInterval, useKeyPress } from "react-use";

const MOVE_AMOUNT = 0.1;

export const PongLocalMultiplayer: React.FC = () => {
  const pongController = usePongGameController();

  // const [p1UpPressed, setP1UpPressed] = useState(false);
  // const [p1DownPressed, setP1DownPressed] = useState(false);
  // const [p2UpPressed, setP2UpPressed] = useState(false);
  // const [p2DownPressed, setP2DownPressed] = useState(false);
  //

  //
  // useKeyPressEvent(
  //   "w",
  //   () => setP1UpPressed(true),
  //   () => setP1UpPressed(true)
  // );

  const paUpPressed = useKeyPress("w");
  const paDownPressed = useKeyPress("s");
  const pbUpPressed = useKeyPress("w");
  const pbDownPressed = useKeyPress("s");

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
