import React from 'react';
import Board from '../atoms/Board';
import useTetris from '../../hooks/useTetris';

const Game = () => {
  const { board, score, isGameOver } = useTetris();

  return (
    <div>
      <Board board={board} />
      <div>
        Score: {score}
      </div>
      {isGameOver && <div>Game Over</div>}
    </div>
  );
};

export default Game;
