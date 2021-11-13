import {PongGameController} from "../PongGameController";
import {PADDLE_MAX, PADDLE_MIN} from "../../Constants";

describe("PongGameController", () => {
  it("Provides initial game state", () => {
    const gameController = new PongGameController();

    expect(gameController.gameState).toEqual({
      scoreA: 0,
      scoreB: 0,
      ballX: 0.5,
      ballY: 0.5,
      paddleBPosition: 0.5,
      paddleAPosition: 0.5
    });
  });

  it("Doesn't mutate gameState object during changes", () => {
    const gameController = new PongGameController();

    // capture original reference
    const originalGameStateObject = gameController.gameState;

    // cause state change
    gameController.setPaddleAPosition(0.3);

    // assert original object was not mutated
    expect(gameController.gameState).not.toStrictEqual(originalGameStateObject);
  });

  it("Updates paddle A position", () => {
    const gameController = new PongGameController();

    expect(gameController.gameState.paddleAPosition).toEqual(0.5);

    gameController.setPaddleAPosition(0.3);
    expect(gameController.gameState.paddleAPosition).toEqual(0.3);

    gameController.setPaddleAPosition(0.6);
    expect(gameController.gameState.paddleAPosition).toEqual(0.6);
  });

  it("Doesn't allow setting paddle A position past PADDLE_MAX", () => {
    const gameController = new PongGameController();

    expect(gameController.gameState.paddleAPosition).toEqual(0.5);

    gameController.setPaddleAPosition(PADDLE_MAX + 0.01);
    expect(gameController.gameState.paddleAPosition).toEqual(PADDLE_MAX);

    gameController.setPaddleAPosition(0.5);
    expect(gameController.gameState.paddleAPosition).toEqual(0.5);

    gameController.setPaddleAPosition(1.5);
    expect(gameController.gameState.paddleAPosition).toEqual(PADDLE_MAX);
  });

  it("Doesn't allow setting paddle A position past PADDLE_MIN", () => {
    const gameController = new PongGameController();

    expect(gameController.gameState.paddleAPosition).toEqual(0.5);

    gameController.setPaddleAPosition(PADDLE_MIN - 0.01);
    expect(gameController.gameState.paddleAPosition).toEqual(PADDLE_MIN);

    gameController.setPaddleAPosition(0.5);
    expect(gameController.gameState.paddleAPosition).toEqual(0.5);

    gameController.setPaddleAPosition(-0.5);
    expect(gameController.gameState.paddleAPosition).toEqual(PADDLE_MIN);
  });

  it("Updates paddle B position", () => {
    const gameController = new PongGameController();

    expect(gameController.gameState.paddleBPosition).toEqual(0.5);

    gameController.setPaddleBPosition(0.3);
    expect(gameController.gameState.paddleBPosition).toEqual(0.3);

    gameController.setPaddleBPosition(0.6);
    expect(gameController.gameState.paddleBPosition).toEqual(0.6);
  });

  it("Doesn't allow setting paddle B position past PADDLE_MAX", () => {
    const gameController = new PongGameController();

    expect(gameController.gameState.paddleBPosition).toEqual(0.5);

    gameController.setPaddleBPosition(PADDLE_MAX + 0.01);
    expect(gameController.gameState.paddleBPosition).toEqual(PADDLE_MAX);

    gameController.setPaddleBPosition(0.5);
    expect(gameController.gameState.paddleBPosition).toEqual(0.5);

    gameController.setPaddleBPosition(1.5);
    expect(gameController.gameState.paddleBPosition).toEqual(PADDLE_MAX);
  });

  it("Doesn't allow setting paddle B position past PADDLE_MIN", () => {
    const gameController = new PongGameController();

    expect(gameController.gameState.paddleBPosition).toEqual(0.5);

    gameController.setPaddleBPosition(PADDLE_MIN - 0.01);
    expect(gameController.gameState.paddleBPosition).toEqual(PADDLE_MIN);

    gameController.setPaddleBPosition(0.5);
    expect(gameController.gameState.paddleBPosition).toEqual(0.5);

    gameController.setPaddleBPosition(-0.5);
    expect(gameController.gameState.paddleBPosition).toEqual(PADDLE_MIN);
  });

  it("Moves paddles to center when resetting game", () => {
    const gameController = new PongGameController();

    gameController.setPaddleAPosition(0.4);
    gameController.setPaddleBPosition(0.4);

    gameController.resetScene("A");
    expect(gameController.gameState.paddleAPosition).toEqual(0.5);
    expect(gameController.gameState.paddleBPosition).toEqual(0.5);
  })
});