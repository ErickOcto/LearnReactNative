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

const TeacherIndex = () => {
  const navigation = useNavigation();

  const handlePressCreate = () => {
    navigation.navigate("TeacherCreate");
  };

  const handlePressEdit = (teacherId) => {
    navigation.navigate("TeacherEdit", { teacherId });
  };

  const handlePressDetail = (teacherId) => {
    navigation.navigate("TeacherDetail", { teacherId });
  };

  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/teachers");
      setTeachers(response.data.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleDeleteTeacher = async (teacherId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/teachers/${teacherId}`);
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
      Alert.alert("Error", "Failed to delete teacher. Please try again.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTeachers();
    }, [])
  );

  return (
    <View className="flex-1 items-center relative">
      <View className="mx-6 flex-row h-24 justify-between items-center pt-16">
        <View className="w-full flex-row items-center justify-between">
          <BackButton></BackButton>
          <Text className=" text-blue-950 font-bold text-xl">
            Teachers List
          </Text>
        </View>
      </View>
      <View className="w-full flex-1">
        <ScrollView
          className="mx-6 mt-8 flex-1"
          showsVerticalScrollIndicator={false}
        >
          {teachers.length == 0 ? (
            <View className="flex-1 items-center">
              <Image
                className="w-[340] h-[400]"
                source={require("../assets/not-found.png")}
                style={{
                  resizeMode: "contain",
                }}
              />
              <Text className="text-blue-950 font-bold text-xl mb-4">
                No Teacher Data
              </Text>
              <TouchableOpacity
                className="w-1/2 bg-blue-700 rounded-full active:bg-black "
                onPress={handlePressCreate}
              >
                <Text className="py-3 text-center text-white font-bold text-base">
                  Create Now
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            teachers.map((teacher) => (
              <View
                key={teacher.id}
                className="bg-white p-6 rounded-3xl flex-row justify-between items-center mb-4"
              >
                <View className="flex-row justify-between items-center">
                  <Image
                    source={{
                      uri: teacher.image
                        ? `http://127.0.0.1:8000/storage/users/${teacher.image}`
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
                    <TouchableOpacity
                      onPress={() => handlePressDetail(teacher.id)}
                    >
                      <Text className="font-bold text-blue-950 text-base">
                        {teacher.name}
                      </Text>
                      <Text className="text-slate-500 text-base">
                        {teacher.email}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="flex-col items-center gap-2">
                  <TouchableOpacity
                    onPress={() => handleDeleteTeacher(teacher.id)}
                  >
                    <FontAwesome name="trash" size={24} color="#FF1E39" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handlePressEdit(teacher.id)}>
                    <FontAwesome name="pencil" size={24} color="#EBC200" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
          <View className="my-10"></View>
        </ScrollView>
      </View>
      {teachers.length == 0 ? (
        ""
      ) : (
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
      )}
    </View>
  );
};

export default TeacherIndex;
