import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";

const OfficerEdit = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const officerId = route.params.officerId;

  useEffect(() => {
    // Fetch officer detail based on officerId
    const fetchOfficerDetail = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/officers/${officerId}`
        );
        const { name, email } = response.data.data;
        setName(name);
        setEmail(email);
      } catch (error) {
        console.error("Error fetching officer detail:", error);
      }
    };

    fetchOfficerDetail();
  }, [officerId]);

  const handleUpdateOfficer = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/officers/${officerId}`, {
        name,
        email,
        password,
      });
      Alert.alert("Success", "Officer updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating officer:", error);
      Alert.alert("Error", "Failed to update officer. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Edit Officer</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        onChangeText={setName}
        value={name}
        placeholder="Name"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button title="Update Officer" onPress={handleUpdateOfficer} />
    </View>
  );
};

export default OfficerEdit;