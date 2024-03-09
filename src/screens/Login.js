import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Text, View } from "react-native";
import Input from "../components/Input.tsx";
import ButtonCustom from "../components/ButtonCustom.tsx";

const LoginPage = () => {
  return (
    <View className="flex-1 items-center justify-center bg-slate-100">
      <Image
        className="mb-20"
        source={require("../assets/icon.png")}
        style={{ width: 155, height: 50, resizeMode: "contain" }}
      ></Image>

      <View className="w-[327]">
        <Text className="font-semibold text-2xl">Please Sign In</Text>
        <Text className="font-semibold text-2xl">To Your Account</Text>
      </View>

      <View className="my-4"></View>

      <View className="bg-white w-[327] mx-6 rounded-3xl shadow-md">
        <View className="m-6">
          <Input
            inputLabel="Email Address"
            placeholder="Input Your Email"
          ></Input>

          <View className="my-2"></View>

          <Input
            inputLabel="Password"
            placeholder="Input Your Password"
          ></Input>

          <View className="my-4"></View>

          <ButtonCustom title="Sign In" onPress={undefined}></ButtonCustom>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default LoginPage;