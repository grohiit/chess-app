import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { Checkbox, RadioButton } from 'react-native-paper'
import createStyles from '@/constants/Styles'

// Import the ActiveColorType from the parent component
type ActiveColorType = 'white' | 'black'

interface BoardOptionsProps {
  activeColor: ActiveColorType
  setActiveColor: (color: ActiveColorType) => void
  castlingRights: {
    whiteKingside: boolean
    whiteQueenside: boolean
    blackKingside: boolean
    blackQueenside: boolean
  }
  setCastlingRights: (rights: {
    whiteKingside: boolean
    whiteQueenside: boolean
    blackKingside: boolean
    blackQueenside: boolean
  }) => void
  isHorizontal?: boolean // For desktop layout (horizontal) vs mobile (vertical)
}

const BoardOptions: React.FC<BoardOptionsProps> = ({
  activeColor,
  setActiveColor,
  castlingRights,
  setCastlingRights,
  isHorizontal = false,
}) => {
  const styles = createStyles()
  const localStyles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
      margin: 10,
      ...(isHorizontal
        ? { marginLeft: 20, maxWidth: 200 }
        : { marginTop: 20, width: '100%' }),
    },
    sectionTitle: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 8,
    },
    optionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    label: {
      fontSize: 14,
      marginLeft: 8,
    },
    radioGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
    radioOption: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })

  const updateCastlingRight = (
    key: keyof typeof castlingRights,
    value: boolean
  ) => {
    setCastlingRights({
      ...castlingRights,
      [key]: value,
    })
  }

  useEffect(() => {
    console.log('Castling rights changed:', castlingRights)
  }, [castlingRights])

  useEffect(() => {
    console.log('Active color changed:', activeColor)
  }, [activeColor])

  return (
    <View style={localStyles.container}>
      <Text style={localStyles.sectionTitle}>Active Color</Text>
      <View style={localStyles.radioGroup}>
        <View style={localStyles.radioOption}>
          <RadioButton
            value="white"
            status={activeColor === 'white' ? 'checked' : 'unchecked'}
            onPress={() => setActiveColor('white')}
            color="#2f95dc"
          />
          <Text style={localStyles.label}>White</Text>
        </View>
        <View style={localStyles.radioOption}>
          <RadioButton
            value="black"
            status={activeColor === 'black' ? 'checked' : 'unchecked'}
            onPress={() => setActiveColor('black')}
            color="#2f95dc"
          />
          <Text style={localStyles.label}>Black</Text>
        </View>
      </View>

      <Text style={localStyles.sectionTitle}>Castling Rights</Text>

      <View style={localStyles.optionRow}>
        <Checkbox
          status={castlingRights.whiteKingside ? 'checked' : 'unchecked'}
          onPress={() =>
            updateCastlingRight('whiteKingside', !castlingRights.whiteKingside)
          }
          color="#2f95dc"
        />
        <Text style={localStyles.label}>White Kingside</Text>
      </View>

      <View style={localStyles.optionRow}>
        <Checkbox
          status={castlingRights.whiteQueenside ? 'checked' : 'unchecked'}
          onPress={() =>
            updateCastlingRight(
              'whiteQueenside',
              !castlingRights.whiteQueenside
            )
          }
          color="#2f95dc"
        />
        <Text style={localStyles.label}>White Queenside</Text>
      </View>

      <View style={localStyles.optionRow}>
        <Checkbox
          status={castlingRights.blackKingside ? 'checked' : 'unchecked'}
          onPress={() =>
            updateCastlingRight('blackKingside', !castlingRights.blackKingside)
          }
          color="#2f95dc"
        />
        <Text style={localStyles.label}>Black Kingside</Text>
      </View>

      <View style={localStyles.optionRow}>
        <Checkbox
          status={castlingRights.blackQueenside ? 'checked' : 'unchecked'}
          onPress={() =>
            updateCastlingRight(
              'blackQueenside',
              !castlingRights.blackQueenside
            )
          }
          color="#2f95dc"
        />
        <Text style={localStyles.label}>Black Queenside</Text>
      </View>
    </View>
  )
}

export default BoardOptions
