import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Colors } from '../constants/Styles'

interface EvaluationResultProps {
  currentEval: number
  bestMove: string
  evalAfterMove: number
  onBestMovePress: () => void
}

const EvaluationResult = ({
  currentEval,
  bestMove,
  evalAfterMove,
  onBestMovePress,
}: EvaluationResultProps) => {
  // Format evaluation score for display
  const formatEval = (score: number) => {
    const sign = score > 0 ? '+' : ''
    return `${sign}${score.toFixed(2)}`
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evaluation Results:</Text>

      <View style={styles.resultRow}>
        <Text style={styles.label}>Current position:</Text>
        <Text style={styles.value}>{formatEval(currentEval)}</Text>
      </View>

      <View style={styles.resultRow}>
        <Text style={styles.label}>Best move:</Text>
        <Pressable onPress={onBestMovePress}>
          <Text style={styles.bestMove}>{bestMove}</Text>
        </Pressable>
      </View>

      <View style={styles.resultRow}>
        <Text style={styles.label}>Evaluation after move:</Text>
        <Text style={styles.value}>{formatEval(evalAfterMove)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.background,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: Colors.text,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    fontSize: 16,
    color: Colors.text,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  bestMove: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
})

export default EvaluationResult
