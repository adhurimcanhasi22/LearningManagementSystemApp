import { NavigationContainer } from "@react-navigation/native";

import { MainNavigator } from "./src/navigation/MainNavigator";

import { SafeAreaView } from "react-native";

import { AuthNavigator } from "./src/navigation/auth/AuthNavigator";

import { AuthProvider, useAuth } from "./src/contexts/AuthContext";

import LoadingScreen from "./src/components/LoadingScreen";
import { LogBox } from "react-native";

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <AuthWrapper />
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
}

const AuthWrapper = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return user ? <MainNavigator /> : <AuthNavigator />;
};
LogBox.ignoreAllLogs();
