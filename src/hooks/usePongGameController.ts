import { useState } from "react";
import { PongGameController } from "../controller/PongGameController";
import { useRafLoop, useUpdate } from "react-use";

export const usePongGameController = (): PongGameController => {
  const [gameController] = useState<PongGameController>(
    () => new PongGameController()
  );

  const update = useUpdate();

  useRafLoop(() => {
    gameController.recomputeBallPosition();
    update();
  }, true);

  return gameController;
};
