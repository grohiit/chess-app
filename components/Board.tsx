import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import BoardSquare from './BoardSquare'
import createStyles from '@/constants/Styles'

interface BoardProps {
  boardState?: string
  onBoardChange?: (boardState: string) => void
  activeColor: 'white' | 'black'
  onPiecesChange: (pieces: string[][]) => void
  initialPieces?: string[][]
}

const Board: React.FC<BoardProps> = ({
  boardState,
  onBoardChange,
  activeColor,
  onPiecesChange,
  initialPieces,
}) => {
  const styles = createStyles()
  // Initialize an 8x8 grid of empty strings to represent the board
  const [pieces, setPieces] = useState<string[][]>(
    initialPieces ||
      Array(8)
        .fill(0)
        .map(() => Array(8).fill(''))
  )

  // Update pieces when initialPieces changes (from FEN updates)
  useEffect(() => {
    if (initialPieces) {
      setPieces(initialPieces)
    }
  }, [initialPieces])

  // Column labels (a-h)
  const colLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  // Row labels (8-1, displayed from top to bottom)
  const rowLabels = ['8', '7', '6', '5', '4', '3', '2', '1']

  // When a piece changes, update the pieces array
  const handlePieceChange = (row: number, col: number, piece: string) => {
    const newPieces = [...pieces]
    newPieces[row][col] = piece
    setPieces(newPieces)
  }

  // Notify parent component when pieces change
  useEffect(() => {
    onPiecesChange(pieces)
  }, [pieces, onPiecesChange])

  // Create an 8x8 grid with labels
  const renderBoard = () => {
    const boardContent = []

    // Create the board with row labels
    for (let row = 0; row < 8; row++) {
      const squares = []

      // Add row label (8-1) on the left
      squares.push(
        <Text key={`row-label-${row}`} style={localStyles.rowLabelText}>
          {rowLabels[row]}
        </Text>
      )

      for (let col = 0; col < 8; col++) {
        // Determine if the square is dark or light
        // (row + col) % 2 === 1 means the square is dark
        const isDark = (row + col) % 2 === 1

        squares.push(
          <BoardSquare
            key={`${row}-${col}`}
            row={row}
            col={col}
            isDark={isDark}
            activeColor={activeColor}
            onPieceChange={handlePieceChange}
            initialPiece={pieces[row][col]}
          />
        )
      }

      boardContent.push(
        <View
          key={`row-${row}`}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          {squares}
        </View>
      )
    }

    // Create a container for the board and labels
    return (
      <View>
        {/* The chess board with row labels */}
        <View>{boardContent}</View>

        {/* Column labels row */}
        <View style={localStyles.colLabelsContainer}>
          {/* Empty space to align with row labels */}
          <View style={{ width: 15 }} />

          {/* Column labels */}
          {colLabels.map((label, index) => (
            <View key={`col-label-${index}`} style={localStyles.colLabelBox}>
              <Text style={localStyles.colLabelText}>{label}</Text>
            </View>
          ))}
        </View>
      </View>
    )
  }

  return <View style={styles.boardContainer}>{renderBoard()}</View>
}

const localStyles = StyleSheet.create({
  rowLabelText: {
    width: 15,
    height: 50,
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    lineHeight: 50,
  },
  colLabelsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  colLabelBox: {
    width: 50,
    alignItems: 'center',
  },
  colLabelText: {
    fontSize: 12,
    color: '#666',
  },
})

export default Board
