import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import axios from "axios";
import BackButton from "../../components/BackButton";
// import { PanGestureHandler, State } from "react-native-gesture-handler";

const TeacherIndex = () => {

    const handleSwipe = (event, teacherId) => {
      const { translationX } = event.nativeEvent;
    };

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/teachers");
        setTeachers(response.data.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <View className="flex-1 items-center">
      <View className="mx-6 flex-row h-24 justify-between items-center pt-16">
        <View className="w-full flex-row items-center justify-between">
          <BackButton></BackButton>
          <Text className=" text-blue-950 font-bold text-xl">
            Teachers List
          </Text>
        </View>
      </View>
      <View className="w-full">
        <ScrollView className="mx-6 mt-8">
          {teachers.map((teacher) => (
            <View
              key={teacher.id}
              className="bg-white p-6 rounded-3xl flex-row items-center mb-4"
            >
              <Image
                source={{
                  uri: "http://127.0.0.1:8000/users/user_pp_default.jpeg",
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
                  {teacher.name}
                </Text>
                <Text className="text-slate-500 text-base">
                  {teacher.email}
                </Text>

                {/* <Text className="font-bold text-base text-blue-950">
                {teacher.major_name} - {teacher.classroom_name}
              </Text> */}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default TeacherIndex;
