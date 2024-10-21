import { Board, Player, Position, PieceType, Move } from './types'
import { BOARD_SIZE } from './constants'

export function initialBoard(): Board {
  const board: Board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))

  // Initialize pawns
  for (let i = 0; i < BOARD_SIZE; i++) {
    board[1][i] = { type: 'pawn', player: 'white' }
    board[6][i] = { type: 'pawn', player: 'black' }
  }

  // Initialize other pieces
  const pieceOrder: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
  for (let i = 0; i < BOARD_SIZE; i++) {
    board[0][i] = { type: pieceOrder[i], player: 'white' }
    board[7][i] = { type: pieceOrder[i], player: 'black' }
  }

  return board
}

function isWithinBoard(position: Position): boolean {
  const [row, col] = position
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE
}

function getPieceMoves(board: Board, position: Position): Position[] {
  const [row, col] = position
  const piece = board[row][col]
  if (!piece) return []

  const moves: Position[] = []

  switch (piece.type) {
    case 'pawn':
      const direction = piece.player === 'white' ? 1 : -1
      const startRow = piece.player === 'white' ? 1 : 6
      
      // Single step forward
      const singleStep: Position = [row + direction, col]
      if (isWithinBoard(singleStep) && !board[singleStep[0]][singleStep[1]]) {
        moves.push(singleStep)
        
        // Double step forward (only from starting position)
        if (row === startRow) {
          const doubleStep: Position = [row + 2 * direction, col]
          if (!board[doubleStep[0]][doubleStep[1]]) {
            moves.push(doubleStep)
          }
        }
      }
      
      // Captures
      const diagonalLeft: Position = [row + direction, col - 1]
      const diagonalRight: Position = [row + direction, col + 1]
      if (isWithinBoard(diagonalLeft) && board[diagonalLeft[0]][diagonalLeft[1]] && board[diagonalLeft[0]][diagonalLeft[1]]!.player !== piece.player) {
        moves.push(diagonalLeft)
      }
      if (isWithinBoard(diagonalRight) && board[diagonalRight[0]][diagonalRight[1]] && board[diagonalRight[0]][diagonalRight[1]]!.player !== piece.player) {
        moves.push(diagonalRight)
      }
      break
    case 'rook':
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        let newRow = row + dx
        let newCol = col + dy
        while (isWithinBoard([newRow, newCol])) {
          if (board[newRow][newCol]) {
            if (board[newRow][newCol]!.player !== piece.player) {
              moves.push([newRow, newCol])
            }
            break
          }
          moves.push([newRow, newCol])
          newRow += dx
          newCol += dy
        }
      }
      break
    case 'knight':
      for (const [dx, dy] of [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]) {
        const newPos: Position = [row + dx, col + dy]
        if (isWithinBoard(newPos) && (!board[newPos[0]][newPos[1]] || board[newPos[0]][newPos[1]]!.player !== piece.player)) {
          moves.push(newPos)
        }
      }
      break
    case 'bishop':
      for (const [dx, dy] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        let newRow = row + dx
        let newCol = col + dy
        while (isWithinBoard([newRow, newCol])) {
          if (board[newRow][newCol]) {
            if (board[newRow][newCol]!.player !== piece.player) {
              moves.push([newRow, newCol])
            }
            break
          }
          moves.push([newRow, newCol])
          newRow += dx
          newCol += dy
        }
      }
      break
    case 'queen':
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        let newRow = row + dx
        let newCol = col + dy
        while (isWithinBoard([newRow, newCol])) {
          if (board[newRow][newCol]) {
            if (board[newRow][newCol]!.player !== piece.player) {
              moves.push([newRow, newCol])
            }
            break
          }
          moves.push([newRow, newCol])
          newRow += dx
          newCol += dy
        }
      }
      break
    case 'king':
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        const newPos: Position = [row + dx, col + dy]
        if (isWithinBoard(newPos) && (!board[newPos[0]][newPos[1]] || board[newPos[0]][newPos[1]]!.player !== piece.player)) {
          moves.push(newPos)
        }
      }
      break
  }

  return moves
}

export function isValidMove(board: Board, player: Player, from: Position, to: Position): boolean {
  const piece = board[from[0]][from[1]]
  if (!piece || piece.player !== player) return false

  const validMoves = getPieceMoves(board, from)
  return validMoves.some(move => move[0] === to[0] && move[1] === to[1])
}

export function getCaptureMoves(board: Board, player: Player): Position[][] {
  const captureMoves: Position[][] = []

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const piece = board[row][col]
      if (piece && piece.player === player) {
        const moves = getPieceMoves(board, [row, col])
        const captures = moves.filter(([toRow, toCol]) => board[toRow][toCol] && board[toRow][toCol]!.player !== player)
        if (captures.length > 0) {
          captureMoves.push(...captures.map((to: Position) => [[row, col], to]))
        }
      }
    }
  }

  return captureMoves
}

export function makeMove(board: Board, from: Position, to: Position): { newBoard: Board; lastMove: Move } {
  const newBoard = board.map(row => [...row])
  const [fromRow, fromCol] = from
  const [toRow, toCol] = to

  newBoard[toRow][toCol] = newBoard[fromRow][fromCol]
  newBoard[fromRow][fromCol] = null

  // Pawn promotion
  if (newBoard[toRow][toCol]!.type === 'pawn' && (toRow === 0 || toRow === BOARD_SIZE - 1)) {
    newBoard[toRow][toCol] = { ...newBoard[toRow][toCol]!, type: 'queen' }
  }

  return { newBoard, lastMove: { from, to } }
}

export function hasLegalMoves(board: Board, player: Player): boolean {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const piece = board[row][col]
      if (piece && piece.player === player) {
        const moves = getPossibleMoves(board, [row, col])
        if (moves.length > 0) {
          return true
        }
      }
    }
  }
  return false
}

export function checkWinCondition(board: Board): Player | null {
  const whitePieces = board.flat().filter(piece => piece && piece.player === 'white')
  const blackPieces = board.flat().filter(piece => piece && piece.player === 'black')

  if (whitePieces.length === 0) return 'black'
  if (blackPieces.length === 0) return 'white'

  return null
}

export function getPossibleMoves(board: Board, position: Position): Position[] {
  const [row, col] = position
  const piece = board[row][col]
  if (!piece) return []

  const moves = getPieceMoves(board, position)
  const captureMoves = moves.filter(([toRow, toCol]) => board[toRow][toCol] && board[toRow][toCol]!.player !== piece.player)

  return captureMoves.length > 0 ? captureMoves : moves
}