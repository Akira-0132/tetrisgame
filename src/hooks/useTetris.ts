import { useState, useEffect, useCallback, useRef } from 'react';
import {
  createInitialGameState,
  checkCollision,
  createTetromino,
  randomTetromino,
  rotate,
  mergeTetromino,
  clearLines,
  calculateScore,
  calculateLevel,
  calculateDropTime,
  createPlayer,
} from '../lib/tetris';
import { GameState, TetrominoType, ParticleEffect } from '../types/tetris';

const useTetris = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());
  const [particles, setParticles] = useState<ParticleEffect[]>([]);
  const gameLoopRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);

  // パーティクルエフェクトを追加
  const addParticles = useCallback((x: number, y: number, color: string, count: number = 10) => {
    const newParticles: ParticleEffect[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: `${Date.now()}_${i}`,
        x: x + Math.random() * 40 - 20,
        y: y + Math.random() * 40 - 20,
        color,
        life: 1,
        maxLife: 1,
        velocityX: (Math.random() - 0.5) * 200,
        velocityY: (Math.random() - 0.5) * 200 - 100,
        size: Math.random() * 8 + 4,
      });
    }
    setParticles((prev: ParticleEffect[]) => [...prev, ...newParticles]);
  }, []);

  // パーティクルを更新
  const updateParticles = useCallback((deltaTime: number) => {
    setParticles((prev: ParticleEffect[]) => prev
      .map((particle: ParticleEffect) => ({
        ...particle,
        x: particle.x + particle.velocityX * deltaTime,
        y: particle.y + particle.velocityY * deltaTime,
        life: particle.life - deltaTime * 2,
        velocityY: particle.velocityY + 300 * deltaTime, // 重力
      }))
      .filter((particle: ParticleEffect) => particle.life > 0)
    );
  }, []);

  // プレイヤーを移動
  const movePlayer = useCallback((dir: number) => {
    if (gameState.isGameOver || gameState.isPaused) return;

    setGameState((prevState: GameState) => {
      if (!checkCollision(prevState.player, prevState.board, { x: dir, y: 0 })) {
        return {
          ...prevState,
          player: {
            ...prevState.player,
            pos: { ...prevState.player.pos, x: prevState.player.pos.x + dir },
          },
        };
      }
      return prevState;
    });
  }, [gameState.isGameOver, gameState.isPaused]);

  // プレイヤーを回転
  const rotatePlayer = useCallback(() => {
    if (gameState.isGameOver || gameState.isPaused) return;

    setGameState((prevState: GameState) => {
      const rotatedShape = rotate(prevState.player.tetromino.shape, 1);
      const rotatedPlayer = {
        ...prevState.player,
        tetromino: { ...prevState.player.tetromino, shape: rotatedShape },
      };

      if (!checkCollision(rotatedPlayer, prevState.board, { x: 0, y: 0 })) {
        return { ...prevState, player: rotatedPlayer };
      }

      // Wall kick
      for (const offset of [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 0 }, { x: -2, y: 0 }]) {
        if (!checkCollision(rotatedPlayer, prevState.board, offset)) {
          return {
            ...prevState,
            player: {
              ...rotatedPlayer,
              pos: {
                x: rotatedPlayer.pos.x + offset.x,
                y: rotatedPlayer.pos.y + offset.y,
              },
            },
          };
        }
      }
      return prevState;
    });
  }, [gameState.isGameOver, gameState.isPaused]);

  // プレイヤーを落下
  const dropPlayer = useCallback(() => {
    if (gameState.isGameOver || gameState.isPaused) return;

    setGameState((prevState: GameState) => {
      if (!checkCollision(prevState.player, prevState.board, { x: 0, y: 1 })) {
        return {
          ...prevState,
          player: {
            ...prevState.player,
            pos: { ...prevState.player.pos, y: prevState.player.pos.y + 1 },
          },
        };
      } else {
        // テトロミノを固定
        const newBoard = mergeTetromino(prevState.board, prevState.player);
        const { newBoard: clearedBoard, clearedLines, clearedRows } = clearLines(newBoard);
        
        // パーティクルエフェクトを追加
        if (clearedLines > 0) {
          clearedRows.forEach(row => {
            for (let x = 0; x < 10; x++) {
              addParticles(x * 32 + 16, row * 32 + 16, '#ffff00', 3);
            }
          });
        }

        const newCombo = clearedLines > 0 ? prevState.combo + 1 : 0;
        const newScore = prevState.score + calculateScore(prevState.level, clearedLines, newCombo);
        const newLines = prevState.lines + clearedLines;
        const newLevel = calculateLevel(newLines);

        // 次のピースを取得
        const nextType = prevState.nextPieces[0];
        const newNextPieces = prevState.nextPieces.slice(1).concat(randomTetromino());
        const newPlayer = createPlayer(createTetromino(nextType));

        // ゲームオーバーチェック
        const isGameOver = checkCollision(newPlayer, clearedBoard, { x: 0, y: 0 });

        return {
          ...prevState,
          board: clearedBoard,
          player: { ...newPlayer, canHold: true },
          nextPieces: newNextPieces,
          score: newScore,
          level: newLevel,
          lines: newLines,
          combo: newCombo,
          isGameOver,
          dropTime: calculateDropTime(newLevel),
        };
      }
    });
  }, [gameState.isGameOver, gameState.isPaused, addParticles]);

  // ハードドロップ
  const hardDrop = useCallback(() => {
    if (gameState.isGameOver || gameState.isPaused) return;

    setGameState((prevState: GameState) => {
      let dropDistance = 0;
      while (!checkCollision(prevState.player, prevState.board, { x: 0, y: dropDistance + 1 })) {
        dropDistance++;
      }

      const droppedPlayer = {
        ...prevState.player,
        pos: { ...prevState.player.pos, y: prevState.player.pos.y + dropDistance },
      };

      return { ...prevState, player: droppedPlayer };
    });
    
    setTimeout(dropPlayer, 50); // 少し遅延してから固定
  }, [gameState.isGameOver, gameState.isPaused, dropPlayer]);

  // ホールド機能
  const holdPiece = useCallback(() => {
    if (gameState.isGameOver || gameState.isPaused || !gameState.player.canHold) return;

    setGameState((prevState: GameState) => {
      const currentType = prevState.player.tetromino.type;
      let newPlayer: typeof prevState.player;

      if (prevState.heldPiece === null) {
        // 初回ホールド
        const nextType = prevState.nextPieces[0];
        newPlayer = createPlayer(createTetromino(nextType));
        const newNextPieces = prevState.nextPieces.slice(1).concat(randomTetromino());
        
        return {
          ...prevState,
          player: { ...newPlayer, canHold: false },
          heldPiece: currentType,
          nextPieces: newNextPieces,
        };
      } else {
        // ホールドピースと交換
        newPlayer = createPlayer(createTetromino(prevState.heldPiece));
        
        return {
          ...prevState,
          player: { ...newPlayer, canHold: false },
          heldPiece: currentType,
        };
      }
    });
  }, [gameState.isGameOver, gameState.isPaused, gameState.player.canHold]);

  // ゲームを一時停止/再開
  const togglePause = useCallback(() => {
    setGameState((prevState: GameState) => ({
      ...prevState,
      isPaused: !prevState.isPaused,
    }));
  }, []);

  // ゲームをリセット
  const resetGame = useCallback(() => {
    setGameState(createInitialGameState());
    setParticles([]);
  }, []);

  // メインゲームループ
  useEffect(() => {
    const gameLoop = (currentTime: number) => {
      const deltaTime = (currentTime - lastUpdateRef.current) / 1000;
      lastUpdateRef.current = currentTime;

      if (!gameState.isPaused && !gameState.isGameOver) {
        // 自動落下
        if (currentTime - gameState.lastDrop > gameState.dropTime) {
          dropPlayer();
          setGameState((prev: GameState) => ({ ...prev, lastDrop: currentTime }));
        }
      }

      // パーティクルを更新
      updateParticles(deltaTime);

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState.isPaused, gameState.isGameOver, gameState.dropTime, gameState.lastDrop, dropPlayer, updateParticles]);

  // キーボード操作
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft':
          e.preventDefault();
          movePlayer(-1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          movePlayer(1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          dropPlayer();
          break;
        case 'ArrowUp':
        case 'KeyX':
          e.preventDefault();
          rotatePlayer();
          break;
        case 'Space':
          e.preventDefault();
          hardDrop();
          break;
        case 'KeyC':
          e.preventDefault();
          holdPiece();
          break;
        case 'KeyP':
          e.preventDefault();
          togglePause();
          break;
        case 'KeyR':
          if (gameState.isGameOver) {
            e.preventDefault();
            resetGame();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer, dropPlayer, rotatePlayer, hardDrop, holdPiece, togglePause, resetGame, gameState.isGameOver]);

  return {
    gameState,
    particles,
    actions: {
      movePlayer,
      rotatePlayer,
      dropPlayer,
      hardDrop,
      holdPiece,
      togglePause,
      resetGame,
    },
  };
};

export default useTetris;
