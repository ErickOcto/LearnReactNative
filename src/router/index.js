import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from '../screens/Login';
import Splash from '../screens/Splash';
import OnBoarding from '../screens/OnBoarding';
import HomePage from '../screens/HomePage';

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash}></Stack.Screen>
        <Stack.Screen name="OnBoarding" component={OnBoarding}></Stack.Screen>
        <Stack.Screen name="Login" component={LoginPage}></Stack.Screen>
        <Stack.Screen name="HomePage" component={HomePage}></Stack.Screen>
      </Stack.Navigator>
    );
};

export default Router;