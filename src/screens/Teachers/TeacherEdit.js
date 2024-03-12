import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";

const TeacherEdit = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nis, setNis] = useState("");
  const [majors, setMajors] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const teacherId = route.params.teacherId;

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/student-create-option"
        );
        setMajors(response.data.majors);
        setClassrooms(response.data.classrooms);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchTeacherDetail = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/teachers/${teacherId}`
        );
        const { name, email, nis } = response.data.data;
        setName(name);
        setEmail(email);
        setNis(nis);
        console.log(teacherId);
      } catch (error) {
        console.error("Error fetching teacher detail:", error);
      }
    };

    fetchTeacherDetail();
  }, [teacherId]);

  const handleUpdateTeacher = async () => {
    if (selectedClassroom == null && selectedMajor == null) {
      Alert.alert("Please select a classroom and  a major");
    }
    try {
      const requestData = {
        name: name,
        email: email,
        nis: nis,
        password: password,
        major_id: selectedMajor,
        classroom_id: selectedClassroom,
      };
      await axios.put(
        `http://127.0.0.1:8000/api/teachers/${teacherId}`,
        requestData
      );
      Alert.alert("Success", "Teacher updated successfully");
      console.log(selectedClassroom, selectedMajor);
      navigation.goBack();
    } catch (error) {
      console.error("Error updating teacher:", error);
      console.log(selectedClassroom, selectedMajor);
      Alert.alert("Error", "Failed to update teacher. Please try again.");
    }
  };

  return (
    <View className="flex-1 items-center justify-center mx-6">
      <View className="w-full bg-white p-6 rounded-3xl">
        <Text className="mb-4 font-bold text-xl text-center text-blue-950">
          Edit Teacher
        </Text>
        <Text className="font-bold text-sm mb-2 text-blue-950">Name</Text>
        <TextInput
          className="w-full font-normal rounded-xl border border-slate-200 p-3 mb-4 focus:border-blue-700"
          onChangeText={setName}
          value={name}
          placeholder="Name"
        />
        <Text className="font-bold text-sm mb-2 text-blue-950">NIP</Text>
        <TextInput
          className="w-full font-normal rounded-xl border border-slate-200 p-3 mb-4 focus:border-blue-700"
          onChangeText={setNis}
          value={nis}
          placeholder="NIP"
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
          className="w-full font-normal rounded-xl border border-slate-200 p-3 mb-4 focus:border-blue-700"
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Text className="font-bold text-sm mb-2 text-blue-950">Major</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedMajor(value)}
          items={majors.map((major) => ({
            label: major.name,
            value: major.id,
          }))}
        />
        <View className="mb-4"></View>
        <Text className="font-bold text-sm mb-2 text-blue-950">Classroom</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedClassroom(value)}
          items={classrooms.map((classroom) => ({
            label: classroom.name,
            value: classroom.id,
          }))}
        />
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
          <TouchableOpacity
            className="w-1/3 bg-blue-700 rounded-full active:bg-black"
            onPress={handleUpdateTeacher}
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

export default TeacherEdit;
