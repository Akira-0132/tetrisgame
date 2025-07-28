'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// ssr: false でクライアント側のみ描画
const Tetris = dynamic(() => import('../components/organisms/Tetris'), { ssr: false });

const Home = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 75%, #0f3460 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 背景のアニメーション */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(2px 2px at 20px 30px, rgba(0, 255, 255, 0.15), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255, 107, 53, 0.15), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.1), transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255, 119, 198, 0.1), transparent),
            radial-gradient(2px 2px at 160px 30px, rgba(0, 255, 255, 0.1), transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 100px',
          animation: 'backgroundFloat 25s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* メインコンテンツ */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        {/* タイトルヘッダー */}
        <header
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            animation: 'titleGlow 3s ease-in-out infinite alternate',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #00ffff 0%, #ff6b35 50%, #ffed00 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
              margin: 0,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '2px',
            }}
          >
            🎮 TETRIS ULTIMATE
          </h1>
          <p
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '10px 0 0 0',
              fontWeight: '300',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
            }}
          >
            限界を超えたリッチなテトリス体験
          </p>
        </header>

        {/* ゲームエリア */}
        <main style={{ width: '100%', maxWidth: '1400px' }}>
          <Tetris />
        </main>

        {/* フッター */}
        <footer
          style={{
            marginTop: '40px',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '14px',
          }}
        >
          <p style={{ margin: 0 }}>
            Created with ❤️ using Next.js + React + TypeScript
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px' }}>
            © 2024 Tetris Ultimate - The most beautiful Tetris experience
          </p>
        </footer>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes backgroundFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        
        @keyframes titleGlow {
          0% { filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.7)); }
          100% { filter: drop-shadow(0 0 40px rgba(255, 107, 53, 0.7)); }
        }
        
        @media (max-width: 1200px) {
          .game-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        
        @media (max-width: 768px) {
          .game-container {
            padding: 10px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
