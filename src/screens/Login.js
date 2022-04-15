import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const Login = () => {
  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={styles.container}>
          <Text>Login</Text>
          <TextInput
            style={styles.textinput}
            placeholder="Nom d'utilisateur"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Mot de passe"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.registerText}>Créér un compte</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textinput: {
    width: "80%",
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  loginButton: {
    width: "80%",
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
  },
  registerText: {
    color: "#000",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
