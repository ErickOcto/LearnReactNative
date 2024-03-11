import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import axios from "axios";
import BackButton from "../../components/BackButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { PanGestureHandler, State } from "react-native-gesture-handler";

const StudentIndex = () => {

    const [students, setStudents] = useState([]);
    
    useEffect(() => {
      const fetchStudents = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/students");
          setStudents(response.data.data);
        } catch (error) {
          console.error("Error fetching students:", error);
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
            Students List
          </Text>
        </View>
      </View>
      <View className="w-full">
        <ScrollView className="mx-6 mt-8" contentContainerStyle={{ flexGrow: 1 }}>
          {students.length === 0 ? (
            <View className="bg-white p-6 rounded-3xl flex-row justify-center items-center mb-4">
              <Text className="font-bold text-xl text-red-700">Student Not Found</Text>
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
                    <Text className="font-bold text-blue-950 text-base">
                      {student.name}
                    </Text>
                    <Text className="text-slate-500 text-base">
                      {student.email}
                    </Text>

                    {/* <Text className="font-bold text-base text-blue-950">
                {student.major_name} - {student.classroom_name}
              </Text> */}
                  </View>
                </View>
                <View className="flex-col items-center gap-2">
                  <FontAwesome name="trash" size={24} color="#FF1E39" />
                  <FontAwesome name="pencil" size={24} color="#EBC200" />
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default StudentIndex;
