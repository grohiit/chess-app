import React from 'react'
import { View, Button, StyleSheet, Alert, Platform, Text } from 'react-native'
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
        <View style={styles.depthContainer}>
          <View style={styles.depthLabel}>
            <Text style={styles.labelText}>Depth:</Text>
          </View>
          <View style={styles.depthSelector}>
            <Picker
              selectedValue={depth}
              onValueChange={(itemValue) => setDepth(Number(itemValue))}
              enabled={!isEvaluating}
              style={styles.picker}
            >
              {depthOptions.map((option) => (
                <Picker.Item key={option} label={`${option}`} value={option} />
              ))}
            </Picker>
          </View>
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
  depthContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  depthLabel: {
    marginRight: 8,
  },
  labelText: {
    fontWeight: '500',
  },
  depthSelector: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  picker: {
    height: 40,
    width: '100%',
    paddingLeft: 8,
  },
  buttonContainer: {
    marginHorizontal: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
})

export default ControlPanel
