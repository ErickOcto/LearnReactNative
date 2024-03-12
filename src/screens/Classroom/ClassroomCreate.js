import React, { useState, useEffect } from "react";
import { View, TextInput, Alert, TouchableOpacity, Text } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import { defaultStyles } from "../assets/style";

const ClassroomCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/class-create-option"
        );
        setClassrooms(response.data.majors);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const createClassroom = async () => {
    try {
      setLoading(true);
      const requestData = {
        name: name,
        major_id: selectedClassroom,
      };
      console.log("Data:", requestData);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/classrooms",
        requestData
      );
      setLoading(false);
      Alert.alert("Success", "Classroom created successfully");
      navigation.navigate("ClassroomIndex", { refresh: true });
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to create classroom");
      console.error(error);
    }
  };

  return (
    <View
      className="mx-6"
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View className="w-full bg-white p-6 rounded-3xl">
        <Text className="mb-4 font-bold text-xl text-center text-blue-950">
          Add Classroom
        </Text>
        <Text className="font-bold text-sm mb-2 text-blue-950">Name</Text>
        <TextInput
          className="font-normal rounded-xl border border-slate-200 p-3 mb-4 focus:border-blue-700 w-full"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <View className="my-2"></View>
        <Text className="font-bold text-sm mb-2 text-blue-950">Major</Text>
        <RNPickerSelect
          style={defaultStyles}
          onValueChange={(value) => setSelectedClassroom(value)}
          items={classrooms.map((classroom) => ({
            label: classroom.name,
            value: classroom.id,
          }))}
        />
        <View className="my-5"></View>
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
            onPress={createClassroom}
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
export default ClassroomCreate;
