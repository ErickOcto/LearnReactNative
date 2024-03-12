import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from '../screens/LoginPage';
import Splash from '../screens/Splash';
import OnBoarding from '../screens/OnBoardingPage';
import HomePage from '../screens/HomePage';

// Import Student CRUD
import StudentIndex from '../screens/Student/StudentIndex';
import StudentCreate from '../screens/Student/StudentCreate';
import StudentEdit from '../screens/Student/StudentEdit';

// Import Teacher CRUD
import TeacherIndex from '../screens/Teachers/TeacherIndex';
import TeacherCreate from '../screens/Teachers/TeacherCreate';
import TeacherEdit from '../screens/Teachers/TeacherEdit';
import TeacherDetail from '../screens/Teachers/TeacherDetail';

// Import Officer CRUD
import OfficerIndex from '../screens/Officer/OfficerIndex';
import OfficerCreate from '../screens/Officer/OfficerCreate';
import OfficerEdit from '../screens/Officer/OfficerEdit';

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash}></Stack.Screen>
        <Stack.Screen name="OnBoarding" component={OnBoarding}></Stack.Screen>
        <Stack.Screen name="Login" component={LoginPage}></Stack.Screen>
        <Stack.Screen name="HomePage" component={HomePage}></Stack.Screen>

        {/* Student CRUD */}
        <Stack.Screen
          name="StudentIndex"
          component={StudentIndex}
        ></Stack.Screen>
        <Stack.Screen
          name="StudentCreate"
          component={StudentCreate}
        ></Stack.Screen>
        <Stack.Screen name="StudentEdit" component={StudentEdit}></Stack.Screen>

        {/* Teacher CRUD */}
        <Stack.Screen
          name="TeacherIndex"
          component={TeacherIndex}
        ></Stack.Screen>
        <Stack.Screen
          name="TeacherCreate"
          component={TeacherCreate}
        ></Stack.Screen>
        <Stack.Screen name="TeacherEdit" component={TeacherEdit}></Stack.Screen>
        <Stack.Screen name="TeacherDetail" component={TeacherDetail}></Stack.Screen>

        {/* Officer CRUD */}
        <Stack.Screen
          name="OfficerIndex"
          component={OfficerIndex}
        ></Stack.Screen>
        <Stack.Screen
          name="OfficerCreate"
          component={OfficerCreate}
        ></Stack.Screen>
        <Stack.Screen name="OfficerEdit" component={OfficerEdit}></Stack.Screen>
      </Stack.Navigator>
    );
};

export default Router;