import React from 'react';

interface Props {
  onPause: () => void;
  onRestart: () => void;
  isPaused: boolean;
  isGameOver: boolean;
}

const Controls: React.FC<Props> = ({ onPause, onRestart, isPaused, isGameOver }) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        borderRadius: '15px',
        border: '2px solid #00ffff',
        padding: '20px',
        boxShadow: `
          0 0 20px rgba(0, 255, 255, 0.3),
          inset 0 0 20px rgba(0, 255, 255, 0.1)
        `,
      }}
    >
      {/* タイトル */}
      <div
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#00ffff',
          textAlign: 'center',
          marginBottom: '20px',
          textShadow: '0 0 10px #00ffff',
        }}
      >
        🎮 TETRIS ULTIMATE
      </div>

      {/* コントロールボタン */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={onPause}
          disabled={isGameOver}
          style={{
            flex: 1,
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            background: isPaused 
              ? 'linear-gradient(45deg, #27ae60, #2ecc71)' 
              : 'linear-gradient(45deg, #f39c12, #e67e22)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: isGameOver ? 'not-allowed' : 'pointer',
            opacity: isGameOver ? 0.5 : 1,
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.2s ease',
            transform: 'scale(1)',
          }}
          onMouseDown={(e) => !isGameOver && (e.currentTarget.style.transform = 'scale(0.95)')}
          onMouseUp={(e) => !isGameOver && (e.currentTarget.style.transform = 'scale(1)')}
          onMouseLeave={(e) => !isGameOver && (e.currentTarget.style.transform = 'scale(1)')}
        >
          {isPaused ? '▶️ RESUME' : '⏸️ PAUSE'}
        </button>

        <button
          onClick={onRestart}
          style={{
            flex: 1,
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.2s ease',
            transform: 'scale(1)',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          🔄 RESTART
        </button>
      </div>

      {/* 操作方法 */}
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
            marginBottom: '15px',
            textAlign: 'center',
            textShadow: '0 0 5px #00ffff',
          }}
        >
          ⌨️ CONTROLS
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                background: 'linear-gradient(45deg, #34495e, #2c3e50)',
                padding: '4px 8px',
                borderRadius: '4px',
                color: 'white',
                fontWeight: 'bold',
                minWidth: '25px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              ←→
            </div>
            <span style={{ color: 'white' }}>Move</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                background: 'linear-gradient(45deg, #34495e, #2c3e50)',
                padding: '4px 8px',
                borderRadius: '4px',
                color: 'white',
                fontWeight: 'bold',
                minWidth: '25px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              ↓
            </div>
            <span style={{ color: 'white' }}>Soft Drop</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
                padding: '4px 8px',
                borderRadius: '4px',
                color: 'white',
                fontWeight: 'bold',
                minWidth: '25px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              ↑
            </div>
            <span style={{ color: 'white' }}>Rotate</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                background: 'linear-gradient(45deg, #9b59b6, #8e44ad)',
                padding: '4px 8px',
                borderRadius: '4px',
                color: 'white',
                fontWeight: 'bold',
                minWidth: '25px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              SPACE
            </div>
            <span style={{ color: 'white' }}>Hard Drop</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                background: 'linear-gradient(45deg, #f39c12, #e67e22)',
                padding: '4px 8px',
                borderRadius: '4px',
                color: 'white',
                fontWeight: 'bold',
                minWidth: '25px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              C
            </div>
            <span style={{ color: 'white' }}>Hold</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                background: 'linear-gradient(45deg, #27ae60, #2ecc71)',
                padding: '4px 8px',
                borderRadius: '4px',
                color: 'white',
                fontWeight: 'bold',
                minWidth: '25px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              P
            </div>
            <span style={{ color: 'white' }}>Pause</span>
          </div>
        </div>
      </div>

      {/* ゲームのヒント */}
      <div
        style={{
          marginTop: '15px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          padding: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            color: '#00ffff',
            textAlign: 'center',
            marginBottom: '8px',
            fontWeight: 'bold',
          }}
        >
          💡 TIPS
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.4' }}>
          • Clear multiple lines for higher scores<br/>
          • Use Hold (C) to save pieces for later<br/>
          • Plan ahead with the Next pieces<br/>
          • Build combos for bonus points!
        </div>
      </div>

      {/* 輝きエフェクト */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.05) 50%, transparent 70%)',
          animation: 'shine 4s linear infinite',
          pointerEvents: 'none',
          borderRadius: '15px',
          zIndex: 1,
        }}
      />

      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(0deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default Controls; 