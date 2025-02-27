import React from 'react'
import { View, Text } from 'react-native'

export default function TailwindTest() {
  return (
    <View className="bg-blue-500 p-4 rounded-lg m-4">
      <Text className="text-white font-bold text-center">
        This is a Tailwind CSS test
      </Text>
    </View>
  )
}
