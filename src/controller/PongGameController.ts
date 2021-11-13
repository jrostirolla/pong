import { IPongRenderGameState } from "../IPongRenderGameState";
import {
  BALL_HEIGHT,
  BALL_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_MAX,
  PADDLE_MIN,
  PADDLE_WIDTH,
  WALL_TO_BALL_WHEN_TOUCHING_PADDLE,
} from "../Constants";

// only do collision detection every ~4 frames
const TICK_RESOLUTION_MS = 16 * 4;

const baseGameState: IPongRenderGameState = {
  scoreA: 0,
  scoreB: 0,
  ballX: 0.5,
  ballY: 0.5,
  paddleBPosition: 0.5,
  paddleAPosition: 0.5,
};

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
  paddlePosition: number;
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
    paddlePosition: 0.5,
    time: 0,
  };

  constructor() {
    // select a random paddle to start from
    const randomPaddle = Math.random() > 0.5 ? "A" : "B";
    this.resetScene(randomPaddle);
  }

  public setPaddleAPosition(position: number): void {
    this.updateGameState({
      // cap position between PADDLE_MIN and PADDLE_MAX
      paddleAPosition: Math.max(PADDLE_MIN, Math.min(PADDLE_MAX, position)),
    });
  }

  public setPaddleBPosition(position: number): void {
    this.updateGameState({
      // cap position between PADDLE_MIN and PADDLE_MAX
      paddleBPosition: Math.max(PADDLE_MIN, Math.min(PADDLE_MAX, position)),
    });
  }

  public recomputeBallPosition() {
    // compute ballX/ballY from scratch using last bounce event
    const currentGameTime = this.getCurrentGameTime();

    let ballPositionX =
      this.lastBounceEvent.paddle === "A"
        ? WALL_TO_BALL_WHEN_TOUCHING_PADDLE
        : 1 - WALL_TO_BALL_WHEN_TOUCHING_PADDLE;
    let ballPositionY = this.lastBounceEvent.ballY;

    // for now, assume the ball will always bounce perpendicular to the paddle
    let ballVelocityX = this.lastBounceEvent.paddle === "A" ? 0.5 : -0.5;
    let ballVelocityY = 2;

    const tickPosition = (time: number, timeDelta: number): boolean => {
      // tick position
      ballPositionX += (ballVelocityX * timeDelta) / 1000;
      ballPositionY += (ballVelocityY * timeDelta) / 1000;

      // check for top wall bounces
      if (ballPositionY - BALL_HEIGHT / 2 < 0) {
        // bounced off top wall
        // invert y velocity
        ballVelocityY = -ballVelocityY;
        ballPositionY = BALL_HEIGHT / 2;
      }

      // check for bottom wall bounces
      if (ballPositionY + BALL_HEIGHT / 2 > 1) {
        // bounced off bottom wall
        // invert y velocity
        ballVelocityY = -ballVelocityY;
        ballPositionY = 1 - BALL_HEIGHT / 2;
      }

      // check if we have hit paddle A
      if (
        ballPositionX < WALL_TO_BALL_WHEN_TOUCHING_PADDLE &&
        ballPositionX + PADDLE_WIDTH > WALL_TO_BALL_WHEN_TOUCHING_PADDLE &&
        ballPositionY >= this.gameState.paddleAPosition - PADDLE_HEIGHT / 2 &&
        ballPositionY <= this.gameState.paddleAPosition + PADDLE_HEIGHT / 2
      ) {
        // ball has just hit paddle A, bounce!
        // TODO: bounce with angle
        ballVelocityX = 0.5;
        ballVelocityY = 0;

        ballPositionX = WALL_TO_BALL_WHEN_TOUCHING_PADDLE;

        this.lastBounceEvent = {
          paddle: "A",
          ballY: ballPositionY,
          paddlePosition: this.gameState.paddleAPosition,
          time,
        };

        return false;
      }

      // check if we have hit paddle B
      if (
        ballPositionX > 1 - WALL_TO_BALL_WHEN_TOUCHING_PADDLE &&
        ballPositionX - PADDLE_WIDTH < 1 - WALL_TO_BALL_WHEN_TOUCHING_PADDLE &&
        ballPositionY >= this.gameState.paddleBPosition - PADDLE_HEIGHT / 2 &&
        ballPositionY <= this.gameState.paddleBPosition + PADDLE_HEIGHT / 2
      ) {
        // ball has just hit paddle B, bounce!
        // TODO: bounce with angle
        ballVelocityX = -0.5;
        ballVelocityY = 0;

        ballPositionX = 1 - WALL_TO_BALL_WHEN_TOUCHING_PADDLE;

        this.lastBounceEvent = {
          paddle: "B",
          ballY: ballPositionY,
          paddlePosition: this.gameState.paddleBPosition,
          time,
        };
        return false;
      }

      // check if we have hit goal on A side
      if (ballPositionX - BALL_WIDTH / 2 <= 0) {
        this.updateGameState({
          scoreB: this.gameState.scoreB + 1,
        });
        this.resetScene("A");

        return false;
      }

      // check if we have hit goal on B side
      if (ballPositionX + BALL_WIDTH / 2 >= 1) {
        this.updateGameState({
          scoreA: this.gameState.scoreA + 1,
        });
        this.resetScene("B");

        return false;
      }

      return true;
    };

    // divide time from last bounce to now, ticking along until we get to now
    let time = this.lastBounceEvent.time + TICK_RESOLUTION_MS;
    let didStop = false;
    for (; time <= currentGameTime; time += TICK_RESOLUTION_MS) {
      if (!tickPosition(time, TICK_RESOLUTION_MS)) {
        didStop = true;
        break;
      }
    }

    // do one final partial tick to get us to exact real time
    if (!didStop) {
      // undo the final add our for loop did
      const lastSuccessfulTick = time - TICK_RESOLUTION_MS;
      tickPosition(currentGameTime, currentGameTime - lastSuccessfulTick);
    }

    this.updateGameState({
      ballX: ballPositionX,
      ballY: ballPositionY,
    });
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
      paddlePosition: 0.5,
      time: this.getCurrentGameTime() - 0.01,
    };

    this.recomputeBallPosition();
  }

  private updateGameState(newState: Partial<IPongRenderGameState>) {
    this.gameState = {
      ...this.gameState,
      ...newState,
    };
  }

  private getCurrentGameTime(): number {
    return Date.now();
  }
}
