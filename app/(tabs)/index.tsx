import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  Button,
} from 'react-native'
import Board from '../../components/Board'
import BoardOptions from '../../components/BoardOptions'
import ControlPanel from '../../components/ControlPanel'
import Loading from '../../components/Loading'
import EvaluationResult from '../../components/EvaluationResult'
import FEN from '../../components/FEN'
import { evaluatePosition } from '../../utils/stockfishEngine'
import AsyncStorage from '@react-native-async-storage/async-storage'
import createStyles from '@/constants/Styles'

// Storage keys
const DEPTH_STORAGE_KEY = 'chess-app-depth'
const HISTORY_STORAGE_KEY = 'chess-app-history'

// Default starting FEN for a standard chess game
const DEFAULT_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

// Define the evaluation result interface
interface EvaluationResultData {
  currentEval: number
  bestMove: string
  evalAfterMove: number
}

export default function TabOneScreen() {
  const styles = createStyles()
  const [boardState, setBoardState] = useState<string>('')
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [depth, setDepth] = useState(8)
  const [evaluationResult, setEvaluationResult] =
    useState<EvaluationResultData | null>(null)

  const [currentFEN, setCurrentFEN] = useState<string>(DEFAULT_FEN)
  const [history, setHistory] = useState<string[]>([DEFAULT_FEN])

  // Local styles for the component
  const localStyles = StyleSheet.create({
    boardAndOptionsContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 10,
      width: '100%',
    },
    boardWrapper: {
      flex: 2,
      marginRight: 10,
      paddingTop: 20,
      backgroundColor: '#f8f8f8',
      borderRadius: 8,
    },
    optionsWrapper: {
      flex: 1,
    },
  })

  // Load saved state on component mount
  useEffect(() => {
    const loadSavedState = async () => {
      try {
        // Load saved depth
        const savedDepth = await AsyncStorage.getItem(DEPTH_STORAGE_KEY)
        if (savedDepth !== null) {
          setDepth(parseInt(savedDepth, 12))
          console.log('Loaded depth:', savedDepth)
        }

        // Load saved history
        const savedHistory = await AsyncStorage.getItem(HISTORY_STORAGE_KEY)
        if (savedHistory !== null) {
          const parsedHistory = JSON.parse(savedHistory) as string[]
          if (parsedHistory.length > 0) {
            // Set history to the saved history
            setHistory(parsedHistory)

            // Set current FEN to the first entry in history
            const loadedFEN = parsedHistory[0]
            setCurrentFEN(loadedFEN)

            // Parse the FEN to extract board state, active color, and castling rights

            console.log('Loaded history:', parsedHistory)
            console.log('Loaded current FEN:', loadedFEN)
          } else {
            // If history exists but is empty, use default FEN
            setDefaultBoardState()
          }
        } else {
          // If no history exists at all, use default FEN
          setDefaultBoardState()
        }
      } catch (error) {
        console.error('Failed to load saved state:', error)
        // In case of error, still set default board state
        setDefaultBoardState()
      }
    }

    // Helper function to set the default board state
    const setDefaultBoardState = () => {
      console.log('Setting default board state')
      setHistory([DEFAULT_FEN])
      setCurrentFEN(DEFAULT_FEN)
    }

    loadSavedState()
  }, [])

  // Save depth when it changes
  useEffect(() => {
    const saveDepth = async () => {
      try {
        await AsyncStorage.setItem(DEPTH_STORAGE_KEY, depth.toString())
        console.log('Saved depth:', depth)
      } catch (error) {
        console.error('Failed to save depth:', error)
      }
    }

    saveDepth()
  }, [depth])

  // Save history when it changes
  useEffect(() => {
    const saveHistory = async () => {
      try {
        console.log('Saving history:', history)
        await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
      } catch (error) {
        console.error('Failed to save history:', error)
      }
    }

    // Always save history, even if it's the default FEN
    // This ensures we have a valid state to load on refresh
    if (history.length > 0) {
      saveHistory()
    }
  }, [history])

  // Handle FEN changes
  const handleFENChange = useCallback(
    (newFEN: string) => {
      if (newFEN !== currentFEN) {
        console.log('FEN changed from:', currentFEN, 'to:', newFEN)
        setCurrentFEN(newFEN)

        // Update the history with the new FEN
        setHistory([newFEN])
        console.log('History updated to:', [newFEN])

        // Save the new FEN to AsyncStorage
        const saveFEN = async () => {
          try {
            await AsyncStorage.setItem(
              HISTORY_STORAGE_KEY,
              JSON.stringify([newFEN])
            )
            console.log('Saved FEN to storage:', newFEN)
          } catch (error) {
            console.error('Failed to save FEN:', error)
          }
        }

        saveFEN()
      }
    },
    [currentFEN]
  )

  // Reset board to default state
  const handleResetBoard = async () => {
    console.log('Resetting board to default state')

    // Set the default board state in the UI
    setHistory([DEFAULT_FEN])
    setCurrentFEN(DEFAULT_FEN)

    // Save the default state to AsyncStorage
    try {
      await AsyncStorage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify([DEFAULT_FEN])
      )
      console.log('Saved default state to storage')
    } catch (error) {
      console.error('Failed to save default state:', error)
    }
  }

  const handleEvaluate = async () => {
    setIsEvaluating(true)
    setEvaluationResult(null)

    try {
      const result = await evaluatePosition(boardState, depth)

      // Simulate haptic feedback
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        console.log('Haptic feedback triggered')
      }

      setEvaluationResult(result)
    } catch (error: any) {
      Alert.alert(
        'Evaluation Error',
        error.message || 'Evaluation took too long. Try a lower depth.'
      )
    } finally {
      setIsEvaluating(false)
    }
  }

  const handleDepthChange = (newDepth: number) => {
    console.log(`Depth changed to ${newDepth}`)
    setDepth(newDepth)
  }

  const handleUndo = () => {
    console.log('Undo pressed')
    // handleResetBoard()

    // Show a message to the user
    Alert.alert(
      'Undo',
      'Board reset to initial position. In a full implementation, this would undo the last move.',
      [{ text: 'OK' }]
    )
  }

  const handleBestMovePress = () => {
    if (evaluationResult) {
      console.log(`Applying best move: ${evaluationResult.bestMove}`)

      Alert.alert(
        'Best Move',
        `The best move is: ${
          evaluationResult.bestMove
        }\nEvaluation after move: ${evaluationResult.evalAfterMove.toFixed(2)}`,
        [{ text: 'OK' }]
      )

      // Clear evaluation result after showing the alert
      setEvaluationResult(null)
    }
  }

  // Render the debug section
  const renderDebugSection = () => {
    return (
      <View style={styles.debugSection}>
        <Text style={styles.sectionTitle}>Debug</Text>

        <View style={styles.debugRow}>
          <Text style={styles.debugLabel}>Current FEN:</Text>
          <Text
            style={styles.debugValue}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {currentFEN}
          </Text>
        </View>

        <View style={styles.debugRow}>
          <Text style={styles.debugLabel}>History Length:</Text>
          <Text style={styles.debugValue}>{history.length}</Text>
        </View>

        <View style={styles.debugButtons}>
          <Button title="Reset Board" onPress={handleResetBoard} />
        </View>
      </View>
    )
  }

  // Render the help section
  const renderHelpSection = () => {
    return (
      <View style={styles.helpSection}>
        <Text style={styles.sectionTitle}>Help</Text>

        <View style={styles.helpItem}>
          <Text style={styles.helpText}>
            • Tap on a square to place a piece
          </Text>
        </View>

        <View style={styles.helpItem}>
          <Text style={styles.helpText}>
            • Tap again to cycle through piece types
          </Text>
        </View>

        <View style={styles.helpItem}>
          <Text style={styles.helpText}>
            • Use the Active Color option to select which color to place
          </Text>
        </View>

        <View style={styles.helpItem}>
          <Text style={styles.helpText}>
            • Adjust Castling Rights to set available castling options
          </Text>
        </View>

        <View style={styles.helpItem}>
          <Text style={styles.helpText}>
            • Press Evaluate to analyze the position with Stockfish
          </Text>
        </View>

        <View style={styles.helpItem}>
          <Text style={styles.helpText}>
            • Press Reset to return to the starting position
          </Text>
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Chess Board Editor</Text>

        <Text style={styles.text}>
          Tap on squares to place or cycle through pieces. The board state is
          automatically saved.
        </Text>

        {/* Board and options in horizontal layout */}
        <View style={localStyles.boardAndOptionsContainer}>
          {/* Board component */}
          <View style={localStyles.boardWrapper}>
            <Board fen={currentFEN} onFENChange={handleFENChange} />
          </View>

          {/* Board options */}
          <View style={localStyles.optionsWrapper}>
            <BoardOptions
              fen={currentFEN}
              onFENChange={handleFENChange}
              isHorizontal={true}
            />
          </View>
        </View>

        {/* FEN component */}
        <FEN fen={currentFEN} onFENChange={handleFENChange} />

        {/* Control panel */}
        <ControlPanel
          depth={depth}
          setDepth={setDepth}
          onDepthChange={handleDepthChange}
          onEvaluate={handleEvaluate}
          onUndo={handleUndo}
          initialDepth={8}
          isEvaluating={isEvaluating}
          onReset={handleResetBoard}
        />

        {/* Evaluation result */}
        {evaluationResult ? (
          <EvaluationResult
            currentEval={evaluationResult.currentEval}
            bestMove={evaluationResult.bestMove}
            evalAfterMove={evaluationResult.evalAfterMove}
            onBestMovePress={handleBestMovePress}
          />
        ) : null}

        {/* Show loading indicator when evaluating */}
        {isEvaluating && <Loading />}

        {/* Help section */}
        {renderHelpSection()}

        {/* Debug section */}
        {renderDebugSection()}
      </View>
    </ScrollView>
  )
}
