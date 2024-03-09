import { View, Image, SafeAreaView, StatusBar, FlatList, Text, Dimensions } from 'react-native'
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

const {width, height} = Dimensions.get('window');

const Slide = ({item}) => {
  return (
    <View className="flex-1 items-center">
      <Image
        source={item.image}
        style={{ height: "75%", width, resizeMode: "contain" }}
      />
      <View>
        <Text className="font-semibold text-xl">
          {item.title}
        </Text>
        <Text className="font-regular text-base text-slate-400">
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
};

export default function OnBoarding() {
  return (<SafeAreaView className='flex-1'>
    <StatusBar/>
    <FlatList
    pagingEnabled
    data={slides}
    contentContainerStyle={{ height: height * 0.5 }}
    horizontal
    showsHorizontalScrollIndicator={false}
    renderItem={({item}) => <Slide item={item}/>}
    />
  </SafeAreaView>);
};