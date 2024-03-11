// OfficerIndex.js

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import BackButton from "../../components/BackButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const OfficerIndex = () => {
  const navigation = useNavigation();

  const handlePressCreate = () => {
    navigation.navigate("OfficerCreate");
  };

  const handlePressEdit = (officerId) => {
    navigation.navigate("OfficerEdit", { officerId });
  };

  const [officers, setOfficers] = useState([]);

  const fetchOfficers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/officers");
      setOfficers(response.data.data);
    } catch (error) {
      console.error("Error fetching officers:", error);
    }
  };

  const handleDeleteOfficer = async (officerId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/officers/${officerId}`);
      fetchOfficers();
    } catch (error) {
      console.error("Error deleting officer:", error);
      Alert.alert("Error", "Failed to delete officer. Please try again.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOfficers();
    }, [])
  );

  return (
    <View className="flex-1 items-center relative">
      <View className="mx-6 flex-row h-24 justify-between items-center pt-16">
        <View className="w-full flex-row items-center justify-between">
          <BackButton></BackButton>
          <Text className=" text-blue-950 font-bold text-xl">
            Officers List
          </Text>
        </View>
      </View>
      <View className="w-full flex-1">
        <ScrollView
          className="mx-6 mt-8 flex-1"
          showsVerticalScrollIndicator={false}
        >
          {officers.map((officer) => (
            <View
              key={officer.id}
              className="bg-white p-6 rounded-3xl flex-row justify-between items-center mb-4"
            >
              <View className="flex-row justify-between items-center">
                <Image
                  source={{
                    uri: officer.image
                      ? `http://127.0.0.1:8000/storage/users/${officer.image}`
                      : "http://127.0.0.1:8000/users/user_pp_default.jpeg",
                  }}
                  style={{
                    width: 60,
                    height: 60,
                    resizeMode: "cover",
                    borderRadius: 400,
                  }}
                />
                <View className="px-2"></View>
                <View className="w-[200]">
                  <Text className="font-bold text-blue-950 text-base">
                    {officer.name}
                  </Text>
                  <Text className="text-slate-500 text-base">
                    {officer.email}
                  </Text>
                </View>
              </View>
              <View className="flex-col items-center gap-2">
                <TouchableOpacity
                  onPress={() => handleDeleteOfficer(officer.id)}
                >
                  <FontAwesome name="trash" size={24} color="#FF1E39" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePressEdit(officer.id)}>
                  <FontAwesome name="pencil" size={24} color="#EBC200" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={handlePressCreate}
        className="p-4 bg-blue-950 absolute bottom-6 right-6 rounded-full"
      >
        <Image
          source={require("../assets/plus-circle.png")}
          style={{
            width: 36,
            height: 36,
            resizeMode: "cover",
            borderRadius: 400,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default OfficerIndex;
