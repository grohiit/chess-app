import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface BoardOptionsProps {
  fen: string
  onFENChange: (newFEN: string) => void
  isHorizontal?: boolean
}

const BoardOptions: React.FC<BoardOptionsProps> = ({
  fen,
  onFENChange,
  isHorizontal = false,
}) => {
  const [activeColor, setActiveColor] = useState<'w' | 'b'>('w')
  const [castlingRights, setCastlingRights] = useState({
    whiteKingside: true,
    whiteQueenside: true,
    blackKingside: true,
    blackQueenside: true,
  })

  // Parse FEN when it changes
  useEffect(() => {
    if (fen) {
      const fenParts = fen.split(' ')

      // Parse active color
      if (fenParts.length > 1) {
        setActiveColor(fenParts[1] as 'w' | 'b')
      }

      // Parse castling rights
      if (fenParts.length > 2) {
        const castling = fenParts[2]
        setCastlingRights({
          whiteKingside: castling.includes('K'),
          whiteQueenside: castling.includes('Q'),
          blackKingside: castling.includes('k'),
          blackQueenside: castling.includes('q'),
        })
      }
    }
  }, [fen])

  // Update FEN when options change
  const updateFEN = (
    newActiveColor?: 'w' | 'b',
    newCastlingRights?: {
      whiteKingside: boolean
      whiteQueenside: boolean
      blackKingside: boolean
      blackQueenside: boolean
    }
  ) => {
    const fenParts = fen.split(' ')

    // Update active color if provided
    if (newActiveColor) {
      fenParts[1] = newActiveColor
    }

    // Update castling rights if provided
    if (newCastlingRights) {
      let castlingStr = ''
      if (newCastlingRights.whiteKingside) castlingStr += 'K'
      if (newCastlingRights.whiteQueenside) castlingStr += 'Q'
      if (newCastlingRights.blackKingside) castlingStr += 'k'
      if (newCastlingRights.blackQueenside) castlingStr += 'q'
      fenParts[2] = castlingStr || '-'
    }

    // Generate new FEN
    const newFEN = fenParts.join(' ')
    onFENChange(newFEN)
  }

  // Handle active color change
  const handleActiveColorChange = (color: 'w' | 'b') => {
    setActiveColor(color)
    updateFEN(color)
  }

  // Handle castling rights change
  const handleCastlingRightsChange = (
    key: keyof typeof castlingRights,
    value: boolean
  ) => {
    const newCastlingRights = { ...castlingRights, [key]: value }
    setCastlingRights(newCastlingRights)
    updateFEN(undefined, newCastlingRights)
  }

  // Custom checkbox component
  const Checkbox = ({
    checked,
    onPress,
    label,
  }: {
    checked: boolean
    onPress: () => void
    label: string
  }) => (
    <View style={styles.checkboxRow}>
      <Pressable
        style={[styles.checkbox, checked && styles.checkboxChecked]}
        onPress={onPress}
      >
        {checked && <Ionicons name="checkmark" size={16} color="white" />}
      </Pressable>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </View>
  )

  return (
    <View
      style={[
        styles.container,
        isHorizontal ? styles.horizontalContainer : styles.verticalContainer,
      ]}
    >
      {/* Active Color */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Color</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              activeColor === 'w' && styles.radioButtonSelected,
            ]}
            onPress={() => handleActiveColorChange('w')}
          >
            <Text style={styles.radioText}>White</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              activeColor === 'b' && styles.radioButtonSelected,
            ]}
            onPress={() => handleActiveColorChange('b')}
          >
            <Text style={styles.radioText}>Black</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Castling Rights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Castling Rights</Text>
        <Checkbox
          checked={castlingRights.whiteKingside}
          onPress={() =>
            handleCastlingRightsChange(
              'whiteKingside',
              !castlingRights.whiteKingside
            )
          }
          label="White O-O"
        />
        <Checkbox
          checked={castlingRights.whiteQueenside}
          onPress={() =>
            handleCastlingRightsChange(
              'whiteQueenside',
              !castlingRights.whiteQueenside
            )
          }
          label="White O-O-O"
        />
        <Checkbox
          checked={castlingRights.blackKingside}
          onPress={() =>
            handleCastlingRightsChange(
              'blackKingside',
              !castlingRights.blackKingside
            )
          }
          label="Black O-O"
        />
        <Checkbox
          checked={castlingRights.blackQueenside}
          onPress={() =>
            handleCastlingRightsChange(
              'blackQueenside',
              !castlingRights.blackQueenside
            )
          }
          label="Black O-O-O"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  horizontalContainer: {
    flexDirection: 'column',
  },
  verticalContainer: {
    flexDirection: 'column',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#007AFF',
  },
  radioText: {
    fontWeight: '500',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  checkboxLabel: {
    fontSize: 14,
  },
})

export default BoardOptions
