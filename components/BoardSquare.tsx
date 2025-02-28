import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

interface BoardSquareProps {
  piece: string
  isBlackSquare: boolean
  fontSize: number
  onPress: () => void
}

const BoardSquare: React.FC<BoardSquareProps> = ({
  piece,
  isBlackSquare,
  fontSize,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.square,
        isBlackSquare ? styles.blackSquare : styles.whiteSquare,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.pieceText, { fontSize }]}>{piece}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
    // fontSize is dynamically set via props
  },
})

export default BoardSquare
