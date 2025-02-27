import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import createStyles from '@/constants/Styles'

// Define the ActiveColorType
type ActiveColorType = 'white' | 'black'

// Map Unicode chess symbols to FEN characters
const PIECE_TO_FEN: Record<string, string> = {
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

interface FENProps {
  pieces: string[][]
  activeColor: ActiveColorType
  castlingRights: {
    whiteKingside: boolean
    whiteQueenside: boolean
    blackKingside: boolean
    blackQueenside: boolean
  }
  onFENChange?: (fen: string) => void
}

const FEN: React.FC<FENProps> = ({
  pieces,
  activeColor,
  castlingRights,
  onFENChange,
}) => {
  const styles = createStyles()

  // Generate FEN string from board state
  const generateFEN = () => {
    // 1. Piece placement
    // In FEN, ranks are described from 8 to 1 (top to bottom)
    const ranks = []

    // Iterate through rows (0-7 in our array corresponds to ranks 8-1 in chess notation)
    for (let row = 0; row < 8; row++) {
      let rank = ''
      let emptyCount = 0

      for (let col = 0; col < 8; col++) {
        const piece = pieces[row][col]
        if (piece === '') {
          emptyCount++
        } else {
          // If there were empty squares before this piece, add the count
          if (emptyCount > 0) {
            rank += emptyCount
            emptyCount = 0
          }
          // Add the FEN character for this piece
          rank += PIECE_TO_FEN[piece] || ''
        }
      }

      // If there are empty squares at the end of the rank
      if (emptyCount > 0) {
        rank += emptyCount
      }

      ranks.push(rank)
    }

    // Join ranks with '/' separator
    const piecePlacement = ranks.join('/')

    // 2. Active color
    const colorCode = activeColor === 'white' ? 'w' : 'b'

    // 3. Castling availability
    let castling = ''
    if (castlingRights.whiteKingside) castling += 'K'
    if (castlingRights.whiteQueenside) castling += 'Q'
    if (castlingRights.blackKingside) castling += 'k'
    if (castlingRights.blackQueenside) castling += 'q'
    if (castling === '') castling = '-'

    // 4, 5, 6. En passant, halfmove clock, fullmove number (using defaults)
    const enPassant = '-'
    const halfmoveClock = '0'
    const fullmoveNumber = '1'

    return `${piecePlacement} ${colorCode} ${castling} ${enPassant} ${halfmoveClock} ${fullmoveNumber}`
  }

  // Notify parent component when FEN changes
  useEffect(() => {
    const currentFEN = generateFEN()
    console.log('FEN generated:', currentFEN)
    if (onFENChange) {
      onFENChange(currentFEN)
    }
  }, [pieces, activeColor, castlingRights, onFENChange])

  return (
    <View style={localStyles.container}>
      <Text style={localStyles.label}>FEN:</Text>
      <Text style={localStyles.fenText}>{generateFEN()}</Text>
    </View>
  )
}

const localStyles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 10,
    marginTop: 15,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  fenText: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
})

export default FEN
