export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king'
export type Player = 'white' | 'black'

export interface Piece {
  type: PieceType
  player: Player
}

export type Position = [number, number]

export type Board = (Piece | null)[][]

export interface Move {
  from: Position
  to: Position
}

export interface PlayerTimer {
  white: number
  black: number
}