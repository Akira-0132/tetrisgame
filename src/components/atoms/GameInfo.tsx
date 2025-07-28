import React from 'react';
import { TetrominoType, GameState } from '../../types/tetris';
import { TETROMINOS } from '../../lib/tetris';

interface Props {
  gameState: GameState;
}

const GameInfo: React.FC<Props> = ({ gameState }) => {
  // テトロミノのプレビューを描画
  const renderTetromino = (type: TetrominoType | null, size: number = 20) => {
    if (!type) return null;
    
    const tetromino = TETROMINOS[type];
    const shape = tetromino.shape;
    
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${shape[0].length}, ${size}px)`,
          gridTemplateRows: `repeat(${shape.length}, ${size}px)`,
          gap: '1px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {shape.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: cell !== 0 ? tetromino.color : 'transparent',
                borderRadius: '3px',
                boxShadow: cell !== 0 ? `
                  inset 0 1px 2px rgba(255, 255, 255, 0.3),
                  inset 0 -1px 2px rgba(0, 0, 0, 0.3),
                  0 0 8px ${tetromino.color}66
                ` : 'none',
                background: cell !== 0 ? `
                  linear-gradient(135deg, 
                    ${tetromino.color} 0%, 
                    ${tetromino.color}dd 50%, 
                    ${tetromino.color}bb 100%
                  )
                ` : 'transparent',
                transition: 'all 0.2s ease',
              }}
            />
          ))
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        borderRadius: '15px',
        border: '2px solid #00ffff',
        boxShadow: `
          0 0 20px rgba(0, 255, 255, 0.3),
          inset 0 0 20px rgba(0, 255, 255, 0.1)
        `,
        minWidth: '200px',
        height: 'fit-content',
      }}
    >
      {/* スコア表示 */}
      <div
        style={{
          background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
          borderRadius: '10px',
          padding: '15px',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '5px',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
          }}
        >
          SCORE
        </div>
        <div
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            fontFamily: 'monospace',
          }}
        >
          {gameState.score.toLocaleString()}
        </div>
      </div>

      {/* レベル・ライン・コンボ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div
          style={{
            background: 'linear-gradient(45deg, #a000f0, #8e44ad)',
            borderRadius: '8px',
            padding: '10px',
            textAlign: 'center',
            boxShadow: '0 3px 10px rgba(160, 0, 240, 0.3)',
          }}
        >
          <div style={{ fontSize: '12px', color: 'white', marginBottom: '3px' }}>LEVEL</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', fontFamily: 'monospace' }}>
            {gameState.level}
          </div>
        </div>

        <div
          style={{
            background: 'linear-gradient(45deg, #00f000, #27ae60)',
            borderRadius: '8px',
            padding: '10px',
            textAlign: 'center',
            boxShadow: '0 3px 10px rgba(0, 240, 0, 0.3)',
          }}
        >
          <div style={{ fontSize: '12px', color: 'white', marginBottom: '3px' }}>LINES</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', fontFamily: 'monospace' }}>
            {gameState.lines}
          </div>
        </div>

        {gameState.combo > 0 && (
          <div
            style={{
              background: 'linear-gradient(45deg, #ffed00, #f39c12)',
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center',
              boxShadow: '0 3px 15px rgba(255, 237, 0, 0.5)',
              animation: 'pulse 1s infinite',
            }}
          >
            <div style={{ fontSize: '12px', color: '#333', marginBottom: '3px', fontWeight: 'bold' }}>COMBO</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', fontFamily: 'monospace' }}>
              {gameState.combo}x
            </div>
          </div>
        )}
      </div>

      {/* ホールドピース */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '10px',
          padding: '15px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#00ffff',
            marginBottom: '10px',
            textAlign: 'center',
            textShadow: '0 0 5px #00ffff',
          }}
        >
          HOLD (C)
        </div>
        <div
          style={{
            minHeight: '80px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {renderTetromino(gameState.heldPiece, 16)}
        </div>
      </div>

      {/* 次のピース */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '10px',
          padding: '15px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#00ffff',
            marginBottom: '10px',
            textAlign: 'center',
            textShadow: '0 0 5px #00ffff',
          }}
        >
          NEXT
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {gameState.nextPieces.slice(0, 4).map((pieceType, index) => (
            <div
              key={index}
              style={{
                minHeight: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: index === 0 ? 'rgba(0, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.3)',
                borderRadius: '6px',
                border: index === 0 ? '1px solid #00ffff' : '1px solid rgba(255, 255, 255, 0.1)',
                transform: index === 0 ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s ease',
              }}
            >
              {renderTetromino(pieceType, index === 0 ? 16 : 12)}
            </div>
          ))}
        </div>
      </div>

      {/* ゲーム状態表示 */}
      {gameState.isPaused && (
        <div
          style={{
            background: 'linear-gradient(45deg, #f39c12, #e67e22)',
            borderRadius: '10px',
            padding: '15px',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(243, 156, 18, 0.5)',
            animation: 'pulse 1.5s infinite',
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
            ⏸️ PAUSED
          </div>
          <div style={{ fontSize: '12px', color: 'white', marginTop: '5px' }}>
            Press P to resume
          </div>
        </div>
      )}

      {gameState.isGameOver && (
        <div
          style={{
            background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
            borderRadius: '10px',
            padding: '15px',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(231, 76, 60, 0.5)',
            animation: 'pulse 2s infinite',
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
            💀 GAME OVER
          </div>
          <div style={{ fontSize: '12px', color: 'white', marginTop: '5px' }}>
            Press R to restart
          </div>
        </div>
      )}

      {/* CSS animations */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default GameInfo; 