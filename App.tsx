import { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { MainNavigator } from './src/navigation/MainNavigator';

import { AuthNavigator } from './src/navigation/auth/AuthNavigator';

import { SafeAreaView } from 'react-native';

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (

    <SafeAreaView style={{ flex: 1 }}>

      <NavigationContainer>

        {isAuthenticated ? (

          <MainNavigator />

        ) : (

          <AuthNavigator />

        )}

      </NavigationContainer>

    </SafeAreaView>

  );

}
