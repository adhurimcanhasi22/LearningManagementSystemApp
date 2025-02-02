import { useState } from "react";

import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useAuth } from '../../contexts/AuthContext';	

export const LoginScreen = ({ navigation }: any) => {

  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Temporary validation

    if (email && password) {

      login(email, password);
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LMS Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />

      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    padding: 20,
  },

  title: {
    fontSize: 24,

    fontWeight: "bold",

    marginBottom: 20,

    textAlign: "center",
  },

  input: {
    height: 40,

    borderColor: "gray",

    borderWidth: 1,

    marginBottom: 15,

    padding: 10,

    borderRadius: 5,
  },
});
