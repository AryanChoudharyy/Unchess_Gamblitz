'use client'

import React, { useState } from 'react'
import { GameProvider, useGame } from '../contexts/GameContext'
import Board from '../components/Board'
import GameInfo from '../components/GameInfo'
import HomePage from '../components/HomePage'
import Toast from '../components/Toast'

const GameWrapper: React.FC = () => {
  const { showDrawOfferRejectedToast, hideDrawOfferRejectedToast } = useGame();

  return (
    <>
      <main className="flex min-h-screen flex-col lg:flex-row items-center justify-center p-8">
        <Board />
        <div className="mt-8 lg:mt-0 lg:ml-8">
          <GameInfo />
        </div>
      </main>
      <Toast 
        message="Draw offer rejected" 
        show={showDrawOfferRejectedToast} 
        onClose={hideDrawOfferRejectedToast}
      />
    </>
  );
};

export default function Home() {
  const [showGame, setShowGame] = useState(false)

  const startGame = () => {
    setShowGame(true)
  }

  return (
    <GameProvider>
      {!showGame ? (
        <HomePage onStartGame={startGame} />
      ) : (
        <GameWrapper />
      )}
    </GameProvider>
  )
}