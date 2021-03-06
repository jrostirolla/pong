export const PADDLE_HEIGHT = 0.2;

export const PADDLE_WIDTH = 0.02;

export const PADDLE_WALLSPACING = 0.02;

export const BALL_WIDTH = 0.015;

export const ASPECT_RATIO = 1080 / 1920;

export const BALL_HEIGHT = BALL_WIDTH / ASPECT_RATIO;

export const PADDLE_MIN = PADDLE_HEIGHT / 2;
export const PADDLE_MAX = 1 - PADDLE_HEIGHT / 2;

export const WALL_TO_BALL_WHEN_TOUCHING_PADDLE =
  PADDLE_WALLSPACING + PADDLE_WIDTH + BALL_WIDTH / 2;
