import React, { useState } from 'react'
import { useGame } from '../contexts/GameContext'

const MoveInput: React.FC = () => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const { makeMove, quitGame } = useGame()

  const handleMove = () => {
    const fromPosition = from.split(',').map(Number) as [number, number]
    const toPosition = to.split(',').map(Number) as [number, number]
    makeMove(fromPosition, toPosition)
    setFrom('')
    setTo('')
  }

  const handleQuit = () => {
    quitGame()
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="From (row,col)"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="To (row,col)"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleMove}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Make Move
      </button>
      <button
        onClick={handleQuit}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Quit Game
      </button>
    </div>
  )
}

export default MoveInput