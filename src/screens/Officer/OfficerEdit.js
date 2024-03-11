import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";

const OfficerEdit = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const officerId = route.params.officerId;

  
    const handleBack = () => {
      navigation.goBack();
    };

  useEffect(() => {
    // Fetch officer detail based on officerId
    const fetchOfficerDetail = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/officers/${officerId}`
        );
        const { name, email } = response.data.data;
        setName(name);
        setEmail(email);
      } catch (error) {
        console.error("Error fetching officer detail:", error);
      }
    };

    fetchOfficerDetail();
  }, [officerId]);

  const handleUpdateOfficer = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/officers/${officerId}`, {
        name,
        email,
        password,
      });
      Alert.alert("Success", "Officer updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating officer:", error);
      Alert.alert("Error", "Failed to update officer. Please try again.");
    }
  };

  return (
    <View className="flex-1 items-center justify-center mx-6">
      <View className="w-full bg-white p-6 rounded-3xl">
        <Text className="mb-4 font-bold text-xl text-center text-blue-950">
          Edit Officer
        </Text>
        <Text className="font-bold text-sm mb-2 text-blue-950">Name</Text>
        <TextInput
          className="w-full font-normal rounded-xl border border-slate-200 p-3 mb-4 focus:border-blue-700"
          onChangeText={setName}
          value={name}
          placeholder="Name"
        />
        <Text className="font-bold text-sm mb-2 text-blue-950">Email</Text>
        <TextInput
          className="w-full font-normal rounded-xl border border-slate-200 p-3 mb-4 focus:border-blue-700"
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
        <Text className="font-bold text-sm mb-2 text-blue-950">Password</Text>
        <TextInput
          className="w-full font-normal rounded-xl border border-slate-200 p-3 mb-10 focus:border-blue-700"
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
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
            onPress={handleUpdateOfficer}
          >
            <Text className="py-3 text-center text-white font-bold text-base">
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OfficerEdit;