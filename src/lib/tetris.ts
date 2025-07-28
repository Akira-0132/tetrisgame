import { Board, Player, Tetromino, TetrominoType, Position, GameState } from '../types/tetris';

// テトリスボードの作成
export const createBoard = (): Board => 
  Array.from({ length: 20 }, () => Array(10).fill(0));

// テトロミノの形状と色の定義
export const TETROMINOS: Record<TetrominoType, { shape: number[][], color: string }> = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: '#00f5ff',
  },
  O: {
    shape: [
      [2, 2],
      [2, 2],
    ],
    color: '#ffed00',
  },
  T: {
    shape: [
      [0, 3, 0],
      [3, 3, 3],
      [0, 0, 0],
    ],
    color: '#a000f0',
  },
  S: {
    shape: [
      [0, 4, 4],
      [4, 4, 0],
      [0, 0, 0],
    ],
    color: '#00f000',
  },
  Z: {
    shape: [
      [5, 5, 0],
      [0, 5, 5],
      [0, 0, 0],
    ],
    color: '#f00000',
  },
  J: {
    shape: [
      [6, 0, 0],
      [6, 6, 6],
      [0, 0, 0],
    ],
    color: '#0000f0',
  },
  L: {
    shape: [
      [0, 0, 7],
      [7, 7, 7],
      [0, 0, 0],
    ],
    color: '#f0a000',
  },
};

// ランダムなテトロミノを生成
export const randomTetromino = (): TetrominoType => {
  const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  return types[Math.floor(Math.random() * types.length)];
};

// テトロミノを作成
export const createTetromino = (type: TetrominoType): Tetromino => ({
  shape: TETROMINOS[type].shape,
  type,
  color: TETROMINOS[type].color,
});

// 衝突検知
export const checkCollision = (
  player: Player,
  board: Board,
  { x: moveX, y: moveY }: Position
): boolean => {
  for (let y = 0; y < player.tetromino.shape.length; y++) {
    for (let x = 0; x < player.tetromino.shape[y].length; x++) {
      if (player.tetromino.shape[y][x] !== 0) {
        const newX = player.pos.x + x + moveX;
        const newY = player.pos.y + y + moveY;
        
        if (
          newX < 0 ||
          newX >= board[0].length ||
          newY >= board.length ||
          (newY >= 0 && board[newY][newX] !== 0)
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

// テトロミノを回転
export const rotate = (tetromino: number[][], dir: number): number[][] => {
  const rotated = tetromino.map((_, index) =>
    tetromino.map(row => row[index])
  );
  
  if (dir > 0) {
    return rotated.map(row => row.reverse());
  } else {
    return rotated.reverse();
  }
};

// ボードにテトロミノをマージ
export const mergeTetromino = (board: Board, player: Player): Board => {
  const newBoard = board.map(row => [...row]);
  
  player.tetromino.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        const boardY = y + player.pos.y;
        const boardX = x + player.pos.x;
        if (boardY >= 0 && boardY < newBoard.length && boardX >= 0 && boardX < newBoard[0].length) {
          newBoard[boardY][boardX] = value;
        }
      }
    });
  });
  
  return newBoard;
};

// ライン消去とスコア計算
export const clearLines = (board: Board): { newBoard: Board; clearedLines: number; clearedRows: number[] } => {
  const clearedRows: number[] = [];
  const newBoard = board.filter((row, index) => {
    const isFull = row.every(cell => cell !== 0);
    if (isFull) {
      clearedRows.push(index);
    }
    return !isFull;
  });
  
  const clearedLines = clearedRows.length;
  
  // 消去された分だけ上に新しい行を追加
  while (newBoard.length < 20) {
    newBoard.unshift(Array(10).fill(0));
  }
  
  return { newBoard, clearedLines, clearedRows };
};

// スコア計算
export const calculateScore = (level: number, clearedLines: number, combo: number): number => {
  const baseScores = [0, 100, 300, 500, 800];
  const baseScore = baseScores[clearedLines] || 0;
  const levelMultiplier = level + 1;
  const comboBonus = combo > 0 ? combo * 50 : 0;
  
  return baseScore * levelMultiplier + comboBonus;
};

// レベル計算
export const calculateLevel = (lines: number): number => {
  return Math.floor(lines / 10);
};

// 落下速度計算
export const calculateDropTime = (level: number): number => {
  return Math.max(50, 1000 - level * 50);
};

// 新しいプレイヤーを作成
export const createPlayer = (tetromino: Tetromino): Player => ({
  pos: { x: 4, y: 0 },
  tetromino,
  canHold: true,
});

// ゲーム状態の初期化
export const createInitialGameState = (): GameState => {
  const nextPieces = Array.from({ length: 5 }, randomTetromino);
  const firstPiece = createTetromino(nextPieces[0]);
  
  return {
    board: createBoard(),
    player: createPlayer(firstPiece),
    nextPieces: nextPieces.slice(1).concat(randomTetromino()),
    heldPiece: null,
    score: 0,
    level: 0,
    lines: 0,
    combo: 0,
    isGameOver: false,
    isPaused: false,
    dropTime: 1000,
    lastDrop: 0,
  };
};
