import React from 'react';
import { Board as BoardType } from '../../../types/tetris';

interface Props {
  board: BoardType;
}

const Board = ({ board }: Props) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${board[0].length}, 1fr)` }}>
      {board.map((row, y) =>
        row.map((cell, x) => <div key={`${y}-${x}`} style={{ width: 20, height: 20, backgroundColor: cell ? 'blue' : 'black' }} />)
      )}
    </div>
  );
};

export default Board;
