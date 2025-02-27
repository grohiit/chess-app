import React from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'
import { Colors } from '../constants/Styles'

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.text}>Evaluating position...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    color: Colors.text,
  },
})

export default Loading
