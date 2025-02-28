import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import createStyles from '@/constants/Styles'

interface FENProps {
  fen: string
  onFENChange: (newFEN: string) => void
}

const FEN: React.FC<FENProps> = ({ fen, onFENChange }) => {
  const styles = createStyles()
  const [inputFEN, setInputFEN] = useState(fen)
  const [isEditing, setIsEditing] = useState(false)

  // Update local state when prop changes
  useEffect(() => {
    setInputFEN(fen)
  }, [fen])

  // Handle FEN input change
  const handleFENChange = (text: string) => {
    setInputFEN(text)
  }

  // Handle save button press
  const handleSave = () => {
    // Basic validation - check if FEN has at least the board part and active color
    const fenParts = inputFEN.split(' ')
    if (fenParts.length >= 2) {
      onFENChange(inputFEN)
    }
    setIsEditing(false)
  }

  // Handle cancel button press
  const handleCancel = () => {
    setInputFEN(fen) // Reset to current FEN
    setIsEditing(false)
  }

  return (
    <View style={localStyles.container}>
      <Text style={localStyles.label}>FEN:</Text>

      {isEditing ? (
        <View>
          <TextInput
            style={localStyles.input}
            value={inputFEN}
            onChangeText={handleFENChange}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
          />
          <View style={localStyles.buttonContainer}>
            <TouchableOpacity
              style={[localStyles.button, localStyles.saveButton]}
              onPress={handleSave}
            >
              <Text style={localStyles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[localStyles.button, localStyles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={localStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Text style={localStyles.fenText}>{fen}</Text>
          <Text style={localStyles.editHint}>(Tap to edit)</Text>
        </TouchableOpacity>
      )}
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
  editHint: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    backgroundColor: '#fff',
    minHeight: 60,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 8,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default FEN
