import React from 'react'
import { View, Button, StyleSheet, Alert, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Colors } from '../constants/Styles'

interface ControlPanelProps {
  onEvaluate: () => void
  onUndo: () => void
  onReset?: () => void
  onDepthChange: (depth: number) => void
  initialDepth: number
  depth: number
  setDepth: (depth: number) => void
  isEvaluating: boolean
}

const ControlPanel = ({
  onEvaluate,
  onUndo,
  onReset,
  onDepthChange,
  initialDepth,
  depth,
  setDepth,
  isEvaluating,
}: ControlPanelProps) => {
  const depthOptions = [8, 12, 16, 20]

  return (
    <View style={styles.container}>
      <View style={styles.controlRow}>
        <View style={styles.depthSelector}>
          <Picker
            selectedValue={depth}
            onValueChange={(itemValue) => setDepth(Number(itemValue))}
            enabled={!isEvaluating}
            style={styles.picker}
          >
            {depthOptions.map((option) => (
              <Picker.Item
                key={option}
                label={`Depth: ${option}`}
                value={option}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Evaluate"
            onPress={onEvaluate}
            disabled={isEvaluating}
            color={Colors.primary}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Undo"
            onPress={onUndo}
            disabled={isEvaluating}
            color={Colors.secondary}
          />
        </View>

        {onReset && (
          <View style={styles.buttonContainer}>
            <Button
              title="Reset"
              onPress={onReset}
              disabled={isEvaluating}
              color="red"
            />
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  depthSelector: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  buttonContainer: {
    marginHorizontal: 4,
  },
})

export default ControlPanel
