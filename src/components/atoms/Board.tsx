import React from 'react';
import { Board as BoardType, Player, ParticleEffect } from '../../types/tetris';
import { TETROMINOS } from '../../lib/tetris';

interface Props {
  board: BoardType;
  player: Player;
  particles: ParticleEffect[];
}

const Board: React.FC<Props> = ({ board, player, particles }) => {
  // プレイヤーのテトロミノを現在の位置でボードに重ねる
  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    // 現在のテトロミノを描画用ボードに追加
    if (player) {
      player.tetromino.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell !== 0) {
            const boardY = y + player.pos.y;
            const boardX = x + player.pos.x;
            if (
              boardY >= 0 && 
              boardY < displayBoard.length && 
              boardX >= 0 && 
              boardX < displayBoard[0].length
            ) {
              displayBoard[boardY][boardX] = cell;
            }
          }
        });
      });
    }

    return displayBoard;
  };

  const displayBoard = renderBoard();

  // セルの色を取得
  const getCellColor = (cellValue: number): string => {
    if (cellValue === 0) return 'transparent';
    
    // セルの値に対応する色を探す
    for (const [type, tetromino] of Object.entries(TETROMINOS)) {
      if (tetromino.shape.flat().includes(cellValue)) {
        return tetromino.color;
      }
    }
    return '#888'; // フォールバック色
  };

  return (
    <div 
      className="tetris-board"
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 32px)',
        gridTemplateRows: 'repeat(20, 32px)',
        gap: '1px',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        border: '3px solid #00ffff',
        borderRadius: '10px',
        padding: '8px',
        boxShadow: `
          0 0 20px #00ffff,
          inset 0 0 20px rgba(0, 255, 255, 0.1),
          0 0 60px rgba(0, 255, 255, 0.3)
        `,
        overflow: 'hidden'
      }}
    >
      {/* ボードのセル */}
      {displayBoard.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${y}-${x}`}
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: getCellColor(cell),
              border: cell !== 0 ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '4px',
              boxShadow: cell !== 0 ? `
                inset 0 2px 4px rgba(255, 255, 255, 0.3),
                inset 0 -2px 4px rgba(0, 0, 0, 0.3),
                0 0 10px ${getCellColor(cell)}66
              ` : 'inset 0 0 3px rgba(255, 255, 255, 0.05)',
              transition: 'all 0.2s ease',
              transform: cell !== 0 ? 'scale(0.95)' : 'scale(1)',
              background: cell !== 0 ? `
                linear-gradient(135deg, 
                  ${getCellColor(cell)} 0%, 
                  ${getCellColor(cell)}dd 50%, 
                  ${getCellColor(cell)}bb 100%
                )
              ` : 'rgba(255, 255, 255, 0.02)',
            }}
          />
        ))
      )}

      {/* パーティクルエフェクト */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: '50%',
            opacity: particle.life / particle.maxLife,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            pointerEvents: 'none',
            zIndex: 10,
            transform: `scale(${particle.life / particle.maxLife})`,
            transition: 'opacity 0.1s ease',
          }}
        />
      ))}

      {/* グリッド線エフェクト */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '33px 33px',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* 輝きエフェクト */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.1) 50%, transparent 70%)',
          animation: 'sparkle 3s linear infinite',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* CSS animations */}
      <style jsx>{`
        @keyframes sparkle {
          0% { transform: translateX(-100%) translateY(-100%) rotate(0deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(0deg); }
        }
        
        .tetris-board:hover {
          box-shadow: 
            0 0 30px #00ffff,
            inset 0 0 30px rgba(0, 255, 255, 0.2),
            0 0 80px rgba(0, 255, 255, 0.4) !important;
        }
      `}</style>
    </div>
  );
};

export default Board;
