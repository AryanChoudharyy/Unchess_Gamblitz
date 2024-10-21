import React, { useState } from 'react'
import { useGame } from '../contexts/GameContext'
import Square from './Square'
import { Position } from '../lib/types'
import { getPossibleMoves } from '../lib/gameLogic'

const Board: React.FC = () => {
  const { board, makeMove, currentPlayer, captureMoves, lastMove } = useGame()
  const [selectedPiece, setSelectedPiece] = useState<Position | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<Position[]>([])
  const [flipped, setFlipped] = useState(false)

  const handleSquareClick = (position: Position) => {
    if (selectedPiece) {
      if (possibleMoves.some(move => move[0] === position[0] && move[1] === position[1])) {
        makeMove(selectedPiece, position)
        setSelectedPiece(null)
        setPossibleMoves([])
      } else {
        setSelectedPiece(null)
        setPossibleMoves([])
      }
    } else {
      const piece = board[position[0]][position[1]]
      if (piece && piece.player === currentPlayer) {
        setSelectedPiece(position)
        const moves = getPossibleMoves(board, position)
        setPossibleMoves(moves)
      }
    }
  }

  const renderBoard = () => {
    const rows = flipped ? [...Array(8)].map((_, i) => 7 - i) : [...Array(8)].map((_, i) => i)
    const cols = flipped ? [...Array(8)].map((_, i) => 7 - i) : [...Array(8)].map((_, i) => i)

    return rows.map(row => (
      <div key={row} className="flex">
        {cols.map(col => (
          <Square
            key={`${row}-${col}`}
            piece={board[row][col]}
            position={[row, col]}
            onClick={() => handleSquareClick([row, col])}
            isSelected={selectedPiece?.[0] === row && selectedPiece?.[1] === col}
            isPossibleMove={possibleMoves.some(move => move[0] === row && move[1] === col)}
            isCapturePossible={captureMoves.some(
              ([from, to]) => from[0] === row && from[1] === col
            )}
            isLastMoveFrom={lastMove?.from[0] === row && lastMove?.from[1] === col}
            isLastMoveTo={lastMove?.to[0] === row && lastMove?.to[1] === col}
          />
        ))}
      </div>
    ))
  }

  return (
    <div className="flex flex-col items-center">
      <div className="border-[15px] border-amber-700 rounded-lg overflow-hidden">
        {renderBoard()}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-amber-700 text-white rounded hover:bg-amber-800 transition-colors"
        onClick={() => setFlipped(!flipped)}
      >
        Flip Board
      </button>
    </div>
  )
}

export default Board