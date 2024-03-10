import { View, Image, SafeAreaView, StatusBar, FlatList, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import ButtonCustom from '../components/ButtonCustom'
import ButtonSecondaryCustom from "../components/ButtonSecondaryCustom";


const slides = [
  {
    id: "1",
    image: require("../assets/onboard.png"),
    title: "Grow Your \nFinancial Today",
    subtitle: "Our system is helping you to \nachieve a better goal",
  },
  {
    id: "2",
    image: require("../assets/onboard2.png"),
    title: "Grow Your \nFinancial Today",
    subtitle: "Our system is helping you to \nachieve a better goal",
  },
  {
    id: "3",
    image: require("../assets/onboard-3.png"),
    title: "Grow Your \nFinancial Today",
    subtitle: "Our system is helping you to \nachieve a better goal",
  },
];

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  indicator:{
    height:12,
    backgroundColor: '#fff',
    width:12,
    borderRadius:50,
    marginHorizontal: 2
  },
});
const Slide = ({item}) => {
  return (
    <View className="flex-1 items-center ">
      <Image
        className="mt-12"
        source={item?.image}
        style={{ height: "75%", width, resizeMode: "contain" }}
      />
      <View className="w-[327] mx-6 rounded-3xl mt-4">
        <View className="p-6">
          <Text className="text-center font-semibold text-xl mb-6">
            {item?.title}
          </Text>
          <Text className="text-center font-regular text-base text-slate-400 mb-2">
            {item?.subtitle}
          </Text>
        </View>
      </View>
    </View>
  );
};

const OnBoarding = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const Footer = () => {
    return (
      <View className="mx-6 gap-y-4" style={{ height: height * 0.15 }}>
        <View className="h-[12] flex-row justify-center px-8">
          {slides.map((_, index) => (
            <View
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: "#04e",
                  width: 12,
                },
              ]}
            ></View>
          ))}
        </View>
        {currentSlideIndex == slides.length - 1 ? (
          <View className="flex-row justify-center mx-6">
            <View className="w-full">
              <ButtonCustom
                title={"Get Started"}
                onPress={() => navigation.replace("Login")}
              ></ButtonCustom>
            </View>
          </View>
        ) : (
          <View className="flex-row justify-center gap-x-4">
            <View className="w-[150] text-end">
              <ButtonSecondaryCustom
                title={"Skip"}
                onPress={skip}
              ></ButtonSecondaryCustom>
            </View>
            <View className="w-[150] text-end">
              <ButtonCustom title={"Next"} onPress={goNextSlide}></ButtonCustom>
            </View>
          </View>
        )}
      </View>
    );
  };

  const updateCurrentIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };
  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  return (
  <SafeAreaView className='flex-1'>
    <StatusBar/>
    <FlatList
    ref={ref}
    onMomentumScrollEnd={updateCurrentIndex}
    pagingEnabled
    data={slides}
    contentContainerStyle={{ height: height * 0.6 }}
    horizontal
    showsHorizontalScrollIndicator={false}
    renderItem={({item}) => <Slide item={item}/>}/>
    <Footer></Footer>
  </SafeAreaView>
  );
};

export default OnBoarding;