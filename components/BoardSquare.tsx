import React from 'react'
import { useRef } from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Animated,
  PanResponder,
} from 'react-native'
import { ViewStyle } from 'react-native'
const DRAG_THRESHOLD = 5

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
  const pan = useRef(new Animated.ValueXY()).current
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        // isDragging.current = true
        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(e, gestureState)
      },
      onPanResponderRelease: (e, gestureState) => {
        // if (!isDragging.current) {
        //   onPress()
        // } else {
        //   onDragEnd(gestureState)
        // }
        console.log(gestureState)
        if (
          Math.abs(gestureState.dx) < DRAG_THRESHOLD &&
          Math.abs(gestureState.dy) < DRAG_THRESHOLD
        ) {
          onPress()
        }

        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start()
        // isDragging.current = false
      },
    })
  ).current

  return (
    <TouchableOpacity
      style={[
        styles.square,
        isBlackSquare ? styles.blackSquare : styles.whiteSquare,
        Platform.OS === 'web' && ({ cursor: 'pointer' } as ViewStyle),
      ]}
    >
      <Animated.View {...panResponder.panHandlers} style={[pan.getLayout()]}>
        <Text style={[styles.pieceText, { fontSize }]}>{piece}</Text>
      </Animated.View>
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
