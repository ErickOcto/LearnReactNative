import React, { useState } from "react";
import { View, Text, Image, TextInput, StatusBar } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ButtonCustom from "../components/ButtonCustom";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login-react",
        form
      );
      console.log("Login Success:", response.data);
      await AsyncStorage.setItem("accessToken", response.data.token);
      await AsyncStorage.setItem("username", response.data.user.name);
      navigation.navigate("HomePage");
    } catch (error) {
      console.error("Login Error:", error);
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <View className=" bg-slate-100 flex-1 justify-center items-center relative">
      {error && (
        <Text className="text-white bg-red-700 w-full p-2 rounded-full text-center font-bold text-base absolute top-14">
          {error}
        </Text>
      )}
      <Image
        className="mb-20"
        source={require("../assets/icon.png")}
        style={{ width: 155, height: 50, resizeMode: "contain" }}
      />

      <View className="w-[327] mb-8">
        <Text className="font-semibold text-2xl">Please Sign In</Text>
        <Text className="font-semibold text-2xl">To Your Account</Text>
      </View>

      <View className="w-[326]">
        <View className="p-6 bg-white rounded-3xl">
          <Text className="font-medium text-sm mb-2">Email</Text>
          <TextInput
            className="w-full font-normal rounded-xl border border-slate-200 mb-4 p-3 focus:border-blue-700"
            placeholder="Email"
            onChangeText={(text) => setForm({ ...form, email: text })}
            value={form.email}
          />

          <Text className="font-medium text-sm mb-2">Password</Text>
          <TextInput
            className="w-full font-normal rounded-xl border border-slate-200 mb-10 p-3 focus:border-blue-700"
            placeholder="Input your password"
            onChangeText={(text) => setForm({ ...form, password: text })}
            value={form.password}
            secureTextEntry={true}
          />

          <ButtonCustom title="Login" onPress={handleLogin}></ButtonCustom>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default LoginPage;