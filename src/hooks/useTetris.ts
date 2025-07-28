import { useState, useEffect } from 'react';
import { createBoard, checkCollision } from '../lib/tetris';
import { Player } from '../../types/tetris';

const useTetris = () => {
  const [board, setBoard] = useState(createBoard());
  const [player, setPlayer] = useState<Player>({
    pos: { x: 0, y: 0 },
    tetromino: [
      [1, 1],
      [1, 1],
    ],
    collided: false,
  });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const updatePlayerPos = ({ x, y, collided }: { x: number; y: number; collided: boolean }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = () => {
    setPlayer({
      pos: { x: 4, y: 0 },
      tetromino: [
        [1, 1],
        [1, 1],
      ],
      collided: false,
    });
  };

  useEffect(() => {
    const update = () => {
      if (!isGameOver) {
        if (checkCollision(player, board, { x: 0, y: 1 })) {
          if (player.pos.y < 1) {
            setIsGameOver(true);
          } else {
            const newBoard = [...board];
            player.tetromino.forEach((row, y) => {
              row.forEach((value, x) => {
                if (value !== 0) {
                  newBoard[y + player.pos.y][x + player.pos.x] = value;
                }
              });
            });
            setBoard(newBoard);
            resetPlayer();
          }
        } else {
          updatePlayerPos({ x: 0, y: 1, collided: false });
        }
      }
    };

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [board, isGameOver, player]);

  return { board, score, isGameOver };
};

export default useTetris;
