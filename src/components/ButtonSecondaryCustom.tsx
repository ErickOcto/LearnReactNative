import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ButtonCustom({title, onPress}) {
  return (
    <View>
      <TouchableOpacity className="w-full border-blue-700 border rounded-full active:bg-black" onPress={onPress}>
        <Text className="py-3 text-center text-blue-700 font-bold text-base">{title}</Text>
      </TouchableOpacity>
    </View>
  );
}