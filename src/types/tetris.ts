export type Board = number[][];

export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export type Position = {
  x: number;
  y: number;
};

export type Tetromino = {
  shape: number[][];
  type: TetrominoType;
  color: string;
};

export type Player = {
  pos: Position;
  tetromino: Tetromino;
  canHold: boolean;
};

export type GameState = {
  board: Board;
  player: Player;
  nextPieces: TetrominoType[];
  heldPiece: TetrominoType | null;
  score: number;
  level: number;
  lines: number;
  combo: number;
  isGameOver: boolean;
  isPaused: boolean;
  dropTime: number;
  lastDrop: number;
};

export type ParticleEffect = {
  id: string;
  x: number;
  y: number;
  color: string;
  life: number;
  maxLife: number;
  velocityX: number;
  velocityY: number;
  size: number;
};
