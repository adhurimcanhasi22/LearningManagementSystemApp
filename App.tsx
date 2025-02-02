import { NavigationContainer } from "@react-navigation/native";

import { MainNavigator } from "./src/navigation/MainNavigator";

import { SafeAreaView } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}
