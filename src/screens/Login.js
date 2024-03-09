import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import React from "react";
import { Image, Text, View } from "react-native";
import Input from "../components/Input.tsx";
import ButtonCustom from "../components/ButtonCustom.tsx";
import {useSelector, useDispatch} from "react-redux";
import { setUser } from "../../redux/user/action.js";
import axios from "axios";

const LoginPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

  const [form, setForm] = useState({
    email:'',
    password:'',
  });

  const login = () => {
    axios.post('login', form).then(({data}) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    })
    //dispatch(setUser('frederick'))
  }
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
            onChangeText="form.email"
            placeholder="Input Your Email"
          ></Input>

          <View className="my-2"></View>

          <Input
            inputLabel="Password"
            onChangeText="form.password"
            placeholder="Input Your Password"
            secure={true}
          ></Input>

          <View className="my-4"></View>

          <ButtonCustom
            title="Sign In"
            onPress={() => {
              login();
            }}
          ></ButtonCustom>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default LoginPage;