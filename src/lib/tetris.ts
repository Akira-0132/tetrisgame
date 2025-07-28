import { Board, Player } from '../types/tetris';

export const createBoard = (): Board => Array.from({ length: 20 }, () => Array(10).fill(0));

export const checkCollision = (
  player: Player,
  board: Board,
  { x: moveX, y: moveY }: { x: number; y: number }
): boolean => {
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      if (player.tetromino[y][x] !== 0) {
        if (
          !board[y + player.pos.y + moveY] ||
          !board[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          board[y + player.pos.y + moveY][x + player.pos.x + moveX] !== 0
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
