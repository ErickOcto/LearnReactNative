import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import axios from "axios";

const TeacherDetail = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nis, setNis] = useState("");
  const [bio, setBio] = useState("");
  const [classroom, setClassroom] = useState("");
  const [major, setMajor] = useState("");

  const teacherId = route.params.teacherId;

  const handleBack = () => {
    navigation.goBack();
  };
  
  useEffect(() => {
    const fetchTeacherDetail = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/detail-teacher/${teacherId}`
        );
        const { name, email, nis, classroom_name, major_name, bio } = response.data.data;
        setName(name);
        setEmail(email);
        setNis(nis);
        setBio(bio);
        setClassroom(classroom_name);
        setMajor(major_name);
        console.log(teacherId);
      } catch (error) {
        console.error("Error fetching teacher detail:", error);
      }
    };

    fetchTeacherDetail();
  }, [teacherId]);

  return (
    <View className=" items-center justify-center mx-6">
      <View className=" flex-row h-24 justify-between items-center pt-16 mb-8">
        <View className="w-full flex-row items-center justify-end">
          <Text className=" text-blue-950 font-bold text-xl">Detail</Text>
        </View>
      </View>
      <View className="w-full bg-white p-6 rounded-3xl">
        <Text className="mb-4 font-bold text-xl text-center text-blue-950">
          Detail : {name}
        </Text>
        <View className="flex-row items-center justify-between">
          <Text className="font-medium text-base mb-2 text-blue-950">NIP</Text>
          {nis ? (
            <Text className="font-medium text-base mb-2 text-slate-400">
              {nis}
            </Text>
          ) : (
            <Text className="font-medium text-base mb-2 text-red-400">
              Not Found
            </Text>
          )}
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-medium text-base mb-2 text-blue-950">
            Email
          </Text>
          <Text className="font-medium text-base mb-2 text-slate-400">
            {email}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-medium text-base mb-2 text-blue-950">
            Classroom
          </Text>
          <Text className="font-medium text-base mb-2 text-slate-400">
            {classroom}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-medium text-base mb-2 text-blue-950">
            Major
          </Text>
          <Text className="font-medium text-base mb-2 text-slate-400">
            {major}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-medium text-base mb-2 text-blue-950">
            Description
          </Text>
          <Text className="font-medium text-base mb-2 text-slate-400">
            {bio}
          </Text>
        </View>

        <View className="mb-10"></View>
        <View className="flex-row gap-x-2 items-center justify-end">
          <TouchableOpacity
            className="w-1/3 border-blue-700 border rounded-full active:bg-black"
            onPress={handleBack}
          >
            <Text className="py-3 text-center text-blue-700 font-bold text-base">
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TeacherDetail;
