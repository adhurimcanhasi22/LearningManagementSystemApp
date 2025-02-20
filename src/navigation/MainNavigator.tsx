import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
    <Tab.Navigator>
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
