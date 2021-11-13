import {IPongRenderGameState} from "../IPongRenderGameState";
import {PADDLE_MAX, PADDLE_MIN} from "../Constants";

const baseGameState: IPongRenderGameState = {
  scoreA: 0,
  scoreB: 0,
  ballX: 0.5,
  ballY: 0.5,
  paddleBPosition: 0.5,
  paddleAPosition: 0.5
}

// interface INetworkUpdate {
//   paddleAPosition?: 0.5,
//   paddleBPosition?: 0.5,
//
//   scoreA?: 0,
//   scoreB?: 0,
//
//   bounceEvent?: IBounceEvent
// }

interface IBounceEvent {
  time: number;
  paddle: "A" | "B";
  ballY: number;
}

export class PongGameController {
  // public game state
  public gameState: IPongRenderGameState = baseGameState;

  // internal game state
  // use this to calculate ball position
  // this will, in future, allow us to replace the last significant historical event
  // and re-compute where the ball *should* be
  // this value gets reset in the constructor
  private lastBounceEvent: IBounceEvent = {
    paddle: "A",
    ballY: 0,
    time: 0
  };

  constructor() {
    // select a random paddle to start from
    const randomPaddle = Math.random() > 0.5 ? "A" : "B";
    this.resetScene(randomPaddle);
  }

  public setPaddleAPosition(position: number): void {
    this.updateGameState({
      // cap position between PADDLE_MIN and PADDLE_MAX
      paddleAPosition: Math.max(PADDLE_MIN, Math.min(PADDLE_MAX, position))
    });
  }

  public setPaddleBPosition(position: number): void {
    this.updateGameState({
      // cap position between PADDLE_MIN and PADDLE_MAX
      paddleBPosition: Math.max(PADDLE_MIN, Math.min(PADDLE_MAX, position))
    });
  }

  public tick(timeDeltaSeconds: number) {

  }

  public resetScene(paddle: "A" | "B") {
    // put the paddles back in the middle
    this.updateGameState({
      paddleAPosition: 0.5,
      paddleBPosition: 0.5,
    });

    // send the ball from one of the paddles
    this.lastBounceEvent = {
      paddle,
      ballY: 0.5,
      time: this.getCurrentGameTime()
    };
  }

  private updateGameState(newState: Partial<IPongRenderGameState>) {
    this.gameState = {
      ...this.gameState,
      ...newState
    };
  }

  private getCurrentGameTime(): number {
    return Date.now();
  }
}
