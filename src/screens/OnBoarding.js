import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const slides = [
  {
    id: "1",
    image: require("../assets/onboard.png"),
    title: "Best Digital Solution",
    subtitle: "We Grow Together",
  },
  {
    id: "2",
    image: require("../assets/onboard2.png"),
    title: "Best Digital Solution",
    subtitle: "We Grow Together",
  },
  {
    id: "3",
    image: require("../assets/onboard-3.png"),
    title: "Best Digital Solution",
    subtitle: "We Grow Together",
  },
];

export default function OnBoarding() {
  return <SafeAreaView className='font'></SafeAreaView>
}