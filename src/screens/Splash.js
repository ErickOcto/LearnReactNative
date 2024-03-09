import { View, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
        navigation.replace('Login');
    }, 3000);
  });
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/icon.png")}
        style={{ width: 155, height: 50, resizeMode: "contain" }}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Splash;