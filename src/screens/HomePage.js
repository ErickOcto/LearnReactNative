import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import { Image, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  return (
    <View className="flex-1  bg-slate-100 relative">
      {/* Profile */}
      <View className="absolute top-14 flex-row mx-12 items-center w-[326]">
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
      <View className="w-[326] flex-row gap-x-4 mt-36 mx-6">
        <View>
          <View className="bg-white rounded-3xl">
            <View className="m-6">
              <Image
                source={require("../assets/fi_user.png")}
                style={{ height: 26, width: 26, resizeMode: "contain" }}
              />
            </View>
          </View>
          <Text className="font-medium text-base text-blue-950 text-center mt-2">
            Students
          </Text>
        </View>

        <View>
          <View className="bg-white rounded-3xl">
            <View className="m-6">
              <Image
                source={require("../assets/fi_user.png")}
                style={{ height: 26, width: 26, resizeMode: "contain" }}
              />
            </View>
          </View>
          <Text className="font-medium text-base text-blue-950 text-center mt-2">
            Teachers
          </Text>
        </View>

        <View>
          <View className="bg-white rounded-3xl">
            <View className="m-6">
              <Image
                source={require("../assets/fi_user.png")}
                style={{ height: 26, width: 26, resizeMode: "contain" }}
              />
            </View>
          </View>
          <Text className="font-medium text-base text-blue-950 text-center mt-2">
            Officers
          </Text>
        </View>

        <View>
          <View className="bg-white rounded-3xl">
            <View className="m-6">
              <Image
                source={require("../assets/ic_more.png")}
                style={{ height: 26, width: 26, resizeMode: "contain" }}
              />
            </View>
          </View>
          <Text className="font-medium text-base text-blue-950 text-center mt-2">
            Classes
          </Text>
        </View>
      </View>

      {/* Data */}

      <StatusBar style="auto" />
    </View>
  );
};

export default HomePage;