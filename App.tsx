import { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { MainNavigator } from './src/navigation/MainNavigator';

import { AuthNavigator } from './src/navigation/auth/AuthNavigator';

import { SafeAreaView } from 'react-native';

import { AuthProvider } from './src/contexts/AuthContext';

import { useAuth } from '../LMS-App/src/contexts/AuthContext';	



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

  const { user } = useAuth();

  return user ? <MainNavigator /> : <AuthNavigator />;

};
