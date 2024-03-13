import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import axios from "axios";
import BackButton from "../../components/BackButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const StudentIndex = () => {

    const [searchKeyword, setSearchKeyword] = useState("");
    const handleSearch = (text) => {
      setSearchKeyword(text);
    };

  const navigation = useNavigation();

  const handlePressCreate = () => {
    navigation.navigate("StudentCreate");
  };

  const handlePressEdit = (studentId) => {
    navigation.navigate("StudentEdit", { studentId });
  };

  const handlePressDetail = (studentId) => {
    navigation.navigate("StudentDetail", { studentId });
  };

  const [students, setStudents] = useState("");

  const fetchStudents = async () => {
    try {
    let url = "http://127.0.0.1:8000/api/students";
    if (searchKeyword) {
      url = `http://127.0.0.1:8000/api/student-search?name=${searchKeyword}`;
    }
    const response = await axios.get(url);
      setStudents(response.data.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  


  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/students/${studentId}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      Alert.alert("Error", "Failed to delete student. Please try again.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchStudents();
    }, [searchKeyword])
  );

  return (
    <View className="flex-1 items-center relative">
      <View className="mx-6 flex-row h-24 justify-between items-center pt-16">
        <View className="w-full flex-row items-center justify-between">
          <BackButton></BackButton>
          <Text className=" text-blue-950 font-bold text-xl">
            Students List
          </Text>
        </View>
      </View>
      <View className="w-full flex-1">
        {/* <View className="bg-white mx-6 rounded-3xl my-4 p-3"> */}
          <TextInput
            className="mx-6 my-4 font-normal rounded-xl border border-slate-200 p-3 focus:border-blue-700"
            onChangeText={handleSearch}
            value={searchKeyword}
            placeholder="Search Officers"
          />
        {/* </View> */}
        <ScrollView
          className="mx-6 flex-1"
          showsVerticalScrollIndicator={false}
        >
          {students.length == 0 ? (
            <View className="flex-1 items-center">
              <Image
                className="w-[340] h-[400]"
                source={require("../assets/not-found.png")}
                style={{
                  resizeMode: "contain",
                }}
              />
              <Text className="text-blue-950 font-bold text-xl mb-4">
                No Student Data
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
            students.map((student) => (
              <View
                key={student.id}
                className="bg-white p-6 rounded-3xl flex-row justify-between items-center mb-4"
              >
                <View className="flex-row justify-between items-center">
                  <Image
                    source={{
                      uri: student.image
                        ? `http://127.0.0.1:8000/storage/users/${student.image}`
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
                      onPress={() => handlePressDetail(student.id)}
                    >
                      <Text className="font-bold text-blue-950 text-base">
                        {student.name}
                      </Text>
                      <Text className="text-slate-500 text-base">
                        {student.email}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="flex-col items-center gap-2">
                  <TouchableOpacity
                    onPress={() => handleDeleteStudent(student.id)}
                  >
                    <FontAwesome name="trash" size={24} color="#FF1E39" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handlePressEdit(student.id)}>
                    <FontAwesome name="pencil" size={24} color="#EBC200" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
          <View className="my-10"></View>
        </ScrollView>
      </View>
      {students.length == 0 ? (
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

export default StudentIndex;
