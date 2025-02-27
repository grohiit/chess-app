import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text } from 'react-native'

// Define the possible piece types
const WHITE_PIECES = ['', '♙', '♘', '♗', '♖', '♕', '♔']
const BLACK_PIECES = ['', '♟', '♞', '♝', '♜', '♛', '♚']

// Map Unicode chess symbols to FEN characters
const PIECE_TO_FEN = {
  '♙': 'P',
  '♘': 'N',
  '♗': 'B',
  '♖': 'R',
  '♕': 'Q',
  '♔': 'K',
  '♟': 'p',
  '♞': 'n',
  '♝': 'b',
  '♜': 'r',
  '♛': 'q',
  '♚': 'k',
}

interface BoardSquareProps {
  row: number
  col: number
  isDark: boolean
  activeColor: 'white' | 'black'
  onPieceChange: (row: number, col: number, piece: string) => void
  initialPiece?: string
}

const BoardSquare: React.FC<BoardSquareProps> = ({
  row,
  col,
  isDark,
  activeColor,
  onPieceChange,
  initialPiece = '',
}) => {
  // Initialize piece state based on initialPiece if provided
  const [piece, setPiece] = useState<{
    type: number
    color: 'white' | 'black' | null
  }>(() => {
    if (initialPiece) {
      // Determine piece type and color from the initialPiece
      const whiteIndex = WHITE_PIECES.indexOf(initialPiece)
      if (whiteIndex !== -1) {
        return { type: whiteIndex, color: 'white' }
      }

      const blackIndex = BLACK_PIECES.indexOf(initialPiece)
      if (blackIndex !== -1) {
        return { type: blackIndex, color: 'black' }
      }
    }

    // Default to empty
    return { type: 0, color: null }
  })

  // Notify parent component when piece changes
  useEffect(() => {
    const pieceSymbol = getPieceSymbol()
    onPieceChange(row, col, pieceSymbol)
  }, [piece, row, col, onPieceChange])

  const handlePress = () => {
    // If there's no piece, add a new one with the active color
    if (piece.type === 0) {
      setPiece({
        type: 1, // Start with pawn (index 1)
        color: activeColor,
      })
    }
    // If there's already a piece, cycle through piece types of the same color
    else {
      setPiece({
        type: (piece.type + 1) % 7, // Cycle through 0-6 (0 means empty)
        color: piece.type === 6 ? null : piece.color, // Reset color if cycling back to empty
      })
    }
  }

  // Get the appropriate piece symbol based on type and color
  const getPieceSymbol = () => {
    if (piece.type === 0) return ''
    return piece.color === 'white'
      ? WHITE_PIECES[piece.type]
      : BLACK_PIECES[piece.type]
  }

  return (
    <TouchableOpacity
      style={{
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDark ? '#769656' : '#eeeed2',
      }}
      onPress={handlePress}
    >
      <Text style={{ fontSize: 40, lineHeight: 42, textAlign: 'center' }}>
        {getPieceSymbol()}
      </Text>
    </TouchableOpacity>
  )
}

export default BoardSquare
