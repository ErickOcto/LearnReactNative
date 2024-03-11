import React, { useState } from "react";
import { View, TextInput, Alert, TouchableOpacity, Text } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const OfficerCreate = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const createOfficer = async () => {
    try {
      setLoading(true);
          const requestData = {
            name: name,
            email: email,
            password: password,
          };
          console.log("Data:", requestData);
      const response = await axios.post("http://127.0.0.1:8000/api/officers", {
        name: name,
        email: email,
        password: password,
      });
      setLoading(false);
      Alert.alert("Success", "Officer created successfully");
      navigation.navigate("OfficerIndex", {refresh:true});
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to create officer");
      console.error(error);
    }
  };

  return (
    <View
      className="mx-6"
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View className="w-full bg-white p-6 rounded-3xl">
        <Text className="mb-4 font-bold text-xl text-center text-blue-950">Add Officer</Text>
        <Text className="font-bold text-sm mb-2 text-blue-950">Name</Text>
        <TextInput
          className="font-normal rounded-xl border border-slate-200 p-3 mb-4 focus:border-blue-700 w-full"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Text className="font-bold text-sm mb-2 text-blue-950">Email</Text>
        <TextInput
          className="w-full font-normal rounded-xl border border-slate-200 p-3 mb-4 focus:border-blue-700"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text className="font-bold text-sm mb-2 text-blue-950">Password</Text>
        <TextInput
          className="w-full font-normal rounded-xl border border-slate-200 p-3 mb-10 focus:border-blue-700"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View className="flex-row gap-x-2 items-center justify-end">
          <TouchableOpacity
            className="w-1/3 border-blue-700 border rounded-full active:bg-black"
            onPress={handleBack}
          >
            <Text className="py-3 text-center text-blue-700 font-bold text-base">
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-1/3 bg-blue-700 rounded-full active:bg-black"
            onPress={createOfficer}
            disabled={loading}
          >
            <Text className="py-3 text-center text-white font-bold text-base">
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OfficerCreate;
