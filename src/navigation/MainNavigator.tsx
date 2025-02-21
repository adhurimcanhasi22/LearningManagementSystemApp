import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { DashboardScreen } from "../screens/DashboardScreen";
import { TimetableScreen } from "../screens/TimetableScreen";
import { CoursesScreen } from "../screens/CoursesScreen";
import { AttendanceScreen } from "../screens/AttendanceScreen";
import { ResultsScreen } from "../screens/ResultsScreen";
import { ChatScreen } from "../screens/ChatScreen";
import { FilesScreen } from "../screens/FilesUploadDownload";

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Hide the default header to avoid duplicate titles.
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          switch (route.name) {
            case "Dashboard":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Timetable":
              iconName = focused ? "calendar" : "calendar-outline";
              break;
            case "Chat":
              iconName = focused ? "chatbubble" : "chatbubble-outline";
              break;
            case "Courses":
              iconName = focused ? "book" : "book-outline";
              break;
            case "Attendance":
              iconName = focused
                ? "checkmark-circle"
                : "checkmark-circle-outline";
              break;
            case "Results":
              iconName = focused ? "stats-chart" : "stats-chart-outline";
              break;
            case "Files":
              iconName = focused ? "folder" : "folder-outline";
              break;
            default:
              iconName = "ellipse";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0066ff",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 5,
          height: 60,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Timetable" component={TimetableScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Attendance" component={AttendanceScreen} />
      <Tab.Screen name="Results" component={ResultsScreen} />
      <Tab.Screen name="Files" component={FilesScreen} />
    </Tab.Navigator>
  );
};
