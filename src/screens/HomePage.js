import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect, useCallback} from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
//import { NavigationContainer } from "@react-navigation/native";

  const HomePage = () => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const userJSON = await AsyncStorage.getItem("username");
          if (userJSON !== null) {
            setCurrentUser(userJSON);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }, []);

  const [students, setStudents] = useState(0);
  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/total-student"
      );
      console.log(response.data);
      setStudents(response.data.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const [officers, setOfficers] = useState(0);
  const fetchOfficers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/total-officer"
      );
      console.log(response.data);
      setOfficers(response.data.data);
    } catch (error) {
      console.error("Error fetching officers:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOfficers();
      fetchStudents();
      fetchTeachers();
      fetchClassrooms();
    }, [])
  );

  // Fungsi untuk menampilkan semua data yang tersimpan di AsyncStorage
const displayAsyncStorageData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const data = await AsyncStorage.multiGet(keys);

    console.log('Data stored in AsyncStorage:');
    data.forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  } catch (error) {
    console.error('Failed to retrieve AsyncStorage data:', error);
  }
};

// Panggil fungsi displayAsyncStorageData untuk menampilkan data
displayAsyncStorageData();

  const [teachers, setTeachers] = useState(0);
  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/total-teacher"
      );
      console.log(response.data);
      setTeachers(response.data.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const [classrooms, setClassrooms] = useState(0);
  const fetchClassrooms = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/total-classroom"
      );
      console.log(response.data);
      setClassrooms(response.data.data);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };

    const navigation = useNavigation();

    const handlePressStudent = () => {
      navigation.navigate("StudentIndex");
    };

    const handlePressTeacher = () => {
      navigation.navigate("TeacherIndex");
    };

    const handlePressOfficer = () => {
      navigation.navigate("OfficerIndex");
    };

    const handlePressClass = () => {
      navigation.navigate("ClassroomIndex");
    };

  return (
    <View className="flex-1  bg-slate-100 relative">
      {/* Profile */}
      <View className="absolute top-14 flex-row mx-6 justify-between items-center">
        <View className="flex-1">
          <Text className="text-base text-slate-300">Howdy,</Text>
          <Text className="text-xl font-bold text-blue-950">
            {/* Nama User */}
            {currentUser ? currentUser : "Guest"}
          </Text>
        </View>
        <Image
          source={require("../assets/photo.png")}
          style={{ height: 60, width: 60, resizeMode: "contain" }}
        />
      </View>

      {/* List category */}
      <View className="flex-row flex-wrap items-center justify-between mt-36 mx-6">
        <TouchableOpacity onPress={handlePressStudent}>
          <View className="bg-white rounded-3xl">
            <View className="m-6">
              <Image
                source={require("../assets/fi_user.png")}
                style={{ height: 26, width: 26, resizeMode: "contain" }}
              />
            </View>
          </View>
          <Text className="font-medium text-base text-blue-950 text-center mt-2">
            {students} Student
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePressTeacher}>
          <View className="bg-white rounded-3xl">
            <View className="m-6">
              <Image
                source={require("../assets/fi_user.png")}
                style={{ height: 26, width: 26, resizeMode: "contain" }}
              />
            </View>
          </View>
          <Text className="font-medium text-base text-blue-950 text-center mt-2">
            {teachers} Teachers
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePressOfficer}>
          <View className="bg-white rounded-3xl">
            <View className="m-6">
              <Image
                source={require("../assets/fi_user.png")}
                style={{ height: 26, width: 26, resizeMode: "contain" }}
              />
            </View>
          </View>
          <Text className="font-medium text-base text-blue-950 text-center mt-2">
            {officers} Officers
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePressClass}>
          <View className="bg-white rounded-3xl">
            <View className="m-6">
              <Image
                source={require("../assets/ic_more.png")}
                style={{ height: 26, width: 26, resizeMode: "contain" }}
              />
            </View>
          </View>
          <Text className="font-medium text-base text-blue-950 text-center mt-2">
            {classrooms} Class
          </Text>
        </TouchableOpacity>
      </View>

      {/* Data */}

      <StatusBar style="auto" />
    </View>
  );
};

export default HomePage;