import React, { useState, useEffect } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native'

interface BoardProps {
  fen: string
  onFENChange: (newFEN: string) => void
  onBoardChange: (newBoardState: string) => void
}

const Board: React.FC<BoardProps> = ({ fen, onFENChange, onBoardChange }) => {
  const [pieces, setPieces] = useState<string[][]>(
    Array(8).fill(Array(8).fill(''))
  )
  const [activeColor, setActiveColor] = useState<'w' | 'b'>('w')
  const [castlingRights, setCastlingRights] = useState('KQkq')
  const [enPassant, setEnPassant] = useState('-')
  const [halfmoveClock, setHalfmoveClock] = useState('0')
  const [fullmoveNumber, setFullmoveNumber] = useState('1')

  // Calculate board size (max 500x500)
  const screenWidth = Dimensions.get('window').width
  const maxBoardSize = Math.min(500, screenWidth - 40) // 40px for padding/margins

  // Parse FEN when it changes
  useEffect(() => {
    if (fen) {
      const fenParts = fen.split(' ')
      const boardPart = fenParts[0]
      const rows = boardPart.split('/')

      // Parse board position
      const newPieces = Array(8)
        .fill(0)
        .map(() => Array(8).fill(''))

      rows.forEach((row, rowIndex) => {
        let colIndex = 0
        for (let i = 0; i < row.length; i++) {
          const char = row[i]
          if (/\d/.test(char)) {
            // Skip empty squares
            colIndex += parseInt(char, 10)
          } else {
            // Place piece
            newPieces[rowIndex][colIndex] = fenToPieceSymbol(char)
            colIndex++
          }
        }
      })

      setPieces(newPieces)

      // Parse other FEN components
      if (fenParts.length > 1) setActiveColor(fenParts[1] as 'w' | 'b')
      if (fenParts.length > 2) setCastlingRights(fenParts[2])
      if (fenParts.length > 3) setEnPassant(fenParts[3])
      if (fenParts.length > 4) setHalfmoveClock(fenParts[4])
      if (fenParts.length > 5) setFullmoveNumber(fenParts[5])
    }
  }, [fen])

  // Convert FEN character to Unicode chess piece
  const fenToPieceSymbol = (fenChar: string): string => {
    const pieceMap: Record<string, string> = {
      P: '♙',
      N: '♘',
      B: '♗',
      R: '♖',
      Q: '♕',
      K: '♔',
      p: '♟',
      n: '♞',
      b: '♝',
      r: '♜',
      q: '♛',
      k: '♚',
    }
    return pieceMap[fenChar] || ''
  }

  // Convert Unicode chess piece to FEN character
  const pieceSymbolToFen = (symbol: string): string => {
    const symbolMap: Record<string, string> = {
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
    return symbolMap[symbol] || ''
  }

  // Generate FEN from current board state
  const generateFEN = (newPieces: string[][]): string => {
    let fenParts: string[] = []

    // Board position
    let boardPart = ''
    for (let row = 0; row < 8; row++) {
      let emptyCount = 0
      for (let col = 0; col < 8; col++) {
        const piece = newPieces[row][col]
        if (piece === '') {
          emptyCount++
        } else {
          if (emptyCount > 0) {
            boardPart += emptyCount
            emptyCount = 0
          }
          boardPart += pieceSymbolToFen(piece)
        }
      }
      if (emptyCount > 0) {
        boardPart += emptyCount
      }
      if (row < 7) boardPart += '/'
    }

    fenParts.push(boardPart)
    fenParts.push(activeColor)
    fenParts.push(castlingRights)
    fenParts.push(enPassant)
    fenParts.push(halfmoveClock)
    fenParts.push(fullmoveNumber)

    return fenParts.join(' ')
  }

  // Handle square press
  const handleSquarePress = (row: number, col: number) => {
    const newPieces = [...pieces.map((r) => [...r])]

    // Cycle through pieces
    const currentPiece = newPieces[row][col]
    const isWhiteTurn = activeColor === 'w'

    // Define piece cycle based on active color
    const whitePieceCycle = ['♙', '♘', '♗', '♖', '♕', '♔', '']
    const blackPieceCycle = ['♟', '♞', '♝', '♜', '♛', '♚', '']

    const pieceCycle = isWhiteTurn ? whitePieceCycle : blackPieceCycle

    // Find current piece in cycle and move to next
    const currentIndex = pieceCycle.indexOf(currentPiece)
    const nextIndex = (currentIndex + 1) % pieceCycle.length
    newPieces[row][col] = pieceCycle[nextIndex]

    // Update pieces state
    setPieces(newPieces)

    // Generate new FEN and update
    const newFEN = generateFEN(newPieces)
    onFENChange(newFEN)
    onBoardChange(newFEN)
  }

  // Calculate font size based on board size
  const fontSize = maxBoardSize / 16

  // Render the board
  return (
    <View style={[styles.board, { width: maxBoardSize, height: maxBoardSize }]}>
      {pieces.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((piece, colIndex) => {
            const isBlackSquare = (rowIndex + colIndex) % 2 === 1
            return (
              <TouchableOpacity
                key={`square-${rowIndex}-${colIndex}`}
                style={[
                  styles.square,
                  isBlackSquare ? styles.blackSquare : styles.whiteSquare,
                ]}
                onPress={() => handleSquarePress(rowIndex, colIndex)}
              >
                <Text style={[styles.pieceText, { fontSize }]}>{piece}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  board: {
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: '#000',
    alignSelf: 'center', // Center the board
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  square: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteSquare: {
    backgroundColor: '#f0d9b5',
  },
  blackSquare: {
    backgroundColor: '#b58863',
  },
  pieceText: {
    // fontSize is now dynamically calculated
  },
})

export default Board
