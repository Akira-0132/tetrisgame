import React from 'react';
import Board from '../atoms/Board';
import GameInfo from '../atoms/GameInfo';
import Controls from '../atoms/Controls';
import useTetris from '../../hooks/useTetris';

const Game = () => {
  const { gameState, particles, actions } = useTetris();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 200, 255, 0.2) 0%, transparent 50%),
          linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 75%, #0f3460 100%)
        `,
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* 背景のパーティクル */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(1px 1px at 20px 30px, rgba(255, 255, 255, 0.1), transparent),
            radial-gradient(1px 1px at 40px 70px, rgba(255, 255, 255, 0.1), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.1), transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255, 255, 255, 0.1), transparent),
            radial-gradient(1px 1px at 160px 30px, rgba(255, 255, 255, 0.1), transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 100px',
          animation: 'stars 20s linear infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* メインゲームエリア */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '300px auto 250px',
          gap: '30px',
          alignItems: 'start',
          maxWidth: '1200px',
          width: '100%',
          zIndex: 1,
          position: 'relative',
        }}
      >
        {/* 左パネル - コントロール */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Controls
            onPause={actions.togglePause}
            onRestart={actions.resetGame}
            isPaused={gameState.isPaused}
            isGameOver={gameState.isGameOver}
          />
        </div>

        {/* 中央 - ゲームボード */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* ボードの輝きエフェクト */}
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              left: '-20px',
              right: '-20px',
              bottom: '-20px',
              background: 'radial-gradient(ellipse at center, rgba(0, 255, 255, 0.2) 0%, transparent 70%)',
              borderRadius: '20px',
              animation: 'boardGlow 2s ease-in-out infinite alternate',
              zIndex: -1,
            }}
          />

          <Board 
            board={gameState.board} 
            player={gameState.player} 
            particles={particles}
          />

          {/* ゲームオーバーオーバーレイ */}
          {gameState.isGameOver && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
                zIndex: 10,
                animation: 'fadeIn 0.5s ease-out',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>💀</div>
              <div style={{ marginBottom: '10px', textShadow: '0 0 10px #ff0000' }}>
                GAME OVER
              </div>
              <div style={{ fontSize: '18px', marginBottom: '20px', color: '#ffff00' }}>
                Final Score: {gameState.score.toLocaleString()}
              </div>
              <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
                Press R to restart
              </div>
            </div>
          )}

          {/* 一時停止オーバーレイ */}
          {gameState.isPaused && !gameState.isGameOver && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
                color: 'white',
                fontSize: '32px',
                fontWeight: 'bold',
                zIndex: 10,
                animation: 'pulse 2s ease-in-out infinite',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏸️</div>
              <div style={{ marginBottom: '10px', textShadow: '0 0 10px #ffff00' }}>
                PAUSED
              </div>
              <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
                Press P to resume
              </div>
            </div>
          )}
        </div>

        {/* 右パネル - ゲーム情報 */}
        <div>
          <GameInfo gameState={gameState} />
        </div>
      </div>

      {/* レベルアップエフェクト */}
      {gameState.level > 0 && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 100,
            fontSize: '72px',
            fontWeight: 'bold',
            color: '#ffff00',
            textShadow: '0 0 20px #ffff00',
            animation: 'levelUp 2s ease-out',
            display: gameState.lines % 10 === 0 && gameState.lines > 0 ? 'block' : 'none',
          }}
        >
          LEVEL UP!
        </div>
      )}

      {/* コンボエフェクト */}
      {gameState.combo > 1 && (
        <div
          style={{
            position: 'fixed',
            bottom: '20%',
            right: '20%',
            pointerEvents: 'none',
            zIndex: 100,
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#ff6b35',
            textShadow: '0 0 15px #ff6b35',
            animation: 'comboEffect 1s ease-out',
          }}
        >
          {gameState.combo}x COMBO!
        </div>
      )}

      {/* CSS animations */}
      <style jsx>{`
        @keyframes stars {
          from { transform: translateY(0px); }
          to { transform: translateY(-100px); }
        }
        
        @keyframes boardGlow {
          0% { opacity: 0.5; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.02); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes levelUp {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes comboEffect {
          0% { opacity: 0; transform: translateY(20px) scale(0.8); }
          50% { opacity: 1; transform: translateY(-10px) scale(1.1); }
          100% { opacity: 0; transform: translateY(-30px) scale(0.9); }
        }
      `}</style>
    </div>
  );
};

export default Game;
