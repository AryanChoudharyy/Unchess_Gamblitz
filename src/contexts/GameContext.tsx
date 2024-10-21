import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { initialBoard, isValidMove, makeMove as makeGameMove, checkWinCondition, getCaptureMoves, hasLegalMoves } from '../lib/gameLogic';
import { Board, Player, Position, Move, PlayerTimer } from '../lib/types';

interface GameContextType {
  board: Board;
  currentPlayer: Player;
  winner: Player | 'resigned' | 'draw' | null;
  makeMove: (from: Position, to: Position) => void;
  resetGame: () => void;
  quitGame: () => void;
  offerDraw: () => void;
  respondToDrawOffer: (accept: boolean) => void;
  captureMoves: Position[][];
  lastMove: Move | null;
  timer: PlayerTimer;
  gameStarted: boolean;
  startGame: () => void;
  drawOffered: boolean;
  showDrawOfferRejectedToast: boolean;
  hideDrawOfferRejectedToast: () => void;
}

const INITIAL_TIME = 5 * 60; // 5 minutes in seconds

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [board, setBoard] = useState<Board>(initialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('white');
  const [winner, setWinner] = useState<Player | 'resigned' | 'draw' | null>(null);
  const [captureMoves, setCaptureMoves] = useState<Position[][]>([]);
  const [lastMove, setLastMove] = useState<Move | null>(null);
  const [timer, setTimer] = useState<PlayerTimer>({ white: INITIAL_TIME, black: INITIAL_TIME });
  const [gameStarted, setGameStarted] = useState(false);
  const [drawOffered, setDrawOffered] = useState(false);
  const [showDrawOfferRejectedToast, setShowDrawOfferRejectedToast] = useState(false);

  const updateCaptureMoves = useCallback((newBoard: Board, player: Player) => {
    const newCaptureMoves = getCaptureMoves(newBoard, player);
    setCaptureMoves(newCaptureMoves);
  }, []);

  const checkGameOver = useCallback((board: Board) => {
    const gameWinner = checkWinCondition(board);
    if (gameWinner) {
      setWinner(gameWinner);
      setCaptureMoves([]);
      setGameStarted(false);
    }
    return gameWinner;
  }, []);

  const makeMove = useCallback((from: Position, to: Position) => {
    if (winner || !gameStarted) return;

    if (captureMoves.length > 0) {
      const isValidCapture = captureMoves.some(
        ([captureFrom, captureTo]) =>
          captureFrom[0] === from[0] && captureFrom[1] === from[1] &&
          captureTo[0] === to[0] && captureTo[1] === to[1]
      );

      if (!isValidCapture) {
        console.log('Capture move is available. You must capture a piece.');
        return;
      }
    } else if (!isValidMove(board, currentPlayer, from, to)) {
      console.log('Invalid move');
      return;
    }

    const { newBoard, lastMove } = makeGameMove(board, from, to);
    setBoard(newBoard);
    setLastMove(lastMove);

    const nextPlayer = currentPlayer === 'white' ? 'black' : 'white';
    
    if (!checkGameOver(newBoard)) {
      setCurrentPlayer(nextPlayer);
      updateCaptureMoves(newBoard, nextPlayer);

      if (!hasLegalMoves(newBoard, nextPlayer)) {
        setWinner(nextPlayer);
        setGameStarted(false);
      }
    }
  }, [board, currentPlayer, winner, captureMoves, updateCaptureMoves, gameStarted, checkGameOver]);

  const resetGame = useCallback(() => {
    const newBoard = initialBoard();
    setBoard(newBoard);
    setCurrentPlayer('white');
    setWinner(null);
    setLastMove(null);
    setTimer({ white: INITIAL_TIME, black: INITIAL_TIME });
    updateCaptureMoves(newBoard, 'white');
    setGameStarted(true);
  }, [updateCaptureMoves]);

  const startGame = useCallback(() => {
    setGameStarted(true);
  }, []);

  const quitGame = useCallback(() => {
    setWinner(currentPlayer === 'white' ? 'black' : 'white');
    setGameStarted(false);
  }, [currentPlayer]);

  const offerDraw = useCallback(() => {
    setDrawOffered(true);
  }, []);

  const respondToDrawOffer = useCallback((accept: boolean) => {
    if (accept) {
      setWinner('draw');
      setGameStarted(false);
    } else {
      setShowDrawOfferRejectedToast(true);
    }
    setDrawOffered(false);
  }, []);

  const hideDrawOfferRejectedToast = useCallback(() => {
    setShowDrawOfferRejectedToast(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (gameStarted && !winner) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          const newTimer = {
            ...prevTimer,
            [currentPlayer]: Math.max(prevTimer[currentPlayer] - 1, 0)
          };
          if (newTimer[currentPlayer] <= 0) {
            setWinner(currentPlayer === 'white' ? 'black' : 'white');
            setGameStarted(false);
          }
          return newTimer;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentPlayer, winner, gameStarted]);

  return (
    <GameContext.Provider value={{
      board,
      currentPlayer,
      winner,
      makeMove,
      resetGame,
      quitGame,
      offerDraw,
      respondToDrawOffer,
      captureMoves,
      lastMove,
      timer,
      gameStarted,
      startGame,
      drawOffered,
      showDrawOfferRejectedToast,
      hideDrawOfferRejectedToast
    }}>
      {children}
    </GameContext.Provider>
  );
};