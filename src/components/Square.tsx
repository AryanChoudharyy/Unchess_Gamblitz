import React from 'react'
import { Piece, Position } from '../lib/types'
import classNames from 'classnames'

interface SquareProps {
  piece: Piece | null
  position: Position
  onClick: () => void
  isSelected: boolean
  isPossibleMove: boolean
  isCapturePossible: boolean
  isLastMoveFrom: boolean
  isLastMoveTo: boolean
}

const Square: React.FC<SquareProps> = ({ 
  piece, 
  position, 
  onClick, 
  isSelected, 
  isPossibleMove, 
  isCapturePossible,
  isLastMoveFrom,
  isLastMoveTo
}) => {
  const [row, col] = position
  const isLight = (row + col) % 2 === 0

  const squareClass = classNames(
    'w-16 h-16 flex items-center justify-center relative',
    {
      'bg-amber-200': isLight && !isLastMoveFrom && !isLastMoveTo,
      'bg-amber-800': !isLight && !isLastMoveFrom && !isLastMoveTo,
      'bg-teal-300': isLastMoveFrom || isLastMoveTo,
      'ring-4 ring-blue-500': isSelected,
      'ring-4 ring-red-500': isCapturePossible && !isSelected,
    }
  )

  const getPieceSymbol = (piece: Piece) => {
    const symbols: { [key in Piece['type']]: string } = {
      pawn: '♟',
      rook: '♜',
      knight: '♞',
      bishop: '♝',
      queen: '♛',
      king: '♚',
    }
    return symbols[piece.type]
  }

  return (
    <div className={squareClass} onClick={onClick}>
      {piece && (
        <span className={`text-4xl ${piece.player === 'white' ? 'text-white' : 'text-black'}`}>
          {getPieceSymbol(piece)}
        </span>
      )}
      {isPossibleMove && !piece && (
        <div className="absolute w-4 h-4 bg-gray-500 rounded-full opacity-50"></div>
      )}
      {isPossibleMove && piece && (
        <div className="absolute inset-0 ring-4 ring-gray-500 opacity-50 rounded-full"></div>
      )}
    </div>
  )
}

export default Square