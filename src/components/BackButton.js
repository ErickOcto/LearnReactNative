import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BackButton = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleBack} className="">
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="arrow-back" size={24} className="text-blue-950" />
        <Text className="text-blue-950 font-bold text-base">Back</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;