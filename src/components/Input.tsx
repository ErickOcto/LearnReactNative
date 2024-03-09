import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function Input({inputLabel, placeholder, onChangeText, secure}) {
  return (
    <View>
      <Text className="font-medium text-sm mb-2">{inputLabel}</Text>
      <TextInput
        className="w-[282] font-normal rounded-xl border border-slate-200 p-3 focus:border-blue-700"
        placeholder={placeholder}
        onChangeText={(text) => (onChangeText = text)}
        secureTextEntry={secure}
      ></TextInput>
    </View>
  );
}