import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

const Register = ({route , navigation}) => {
  const [error, setErrorText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const handleRegister = () => {
    console.log(username, password, passwordConf);
    if (username === "") setErrorText("Veuillez entrer un nom d'utilisateur");
    else if (password === "") setErrorText("Veuillez entrer un mot de passe");
    else if (password !== passwordConf)
      setErrorText("Les mots de passe ne correspondent pas");
    else {
      setErrorText("");
      navigation.navigate("Home", {user: username});
    } 
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.registerLabel}>Register</Text>
          {error != "" && (
            <View style={styles.errorContainer}>
              <Text style={styles.error}>{error}</Text>
            </View>
          )}
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => setUsername(text)}
            placeholder="Nom d'utilisateur"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => setPassword(text)}
            placeholder="Mot de passe"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => setPasswordConf(text)}
            placeholder="Resaisir votre Mot de passe"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.loginText}>S'identifier</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    backgroundColor: "red",
    width: "80%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  error: {
    color: "#fff",
    textAlign: "center",
  },
  registerLabel: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#22c55e",
  },
  textinput: {
    width: "80%",
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: "#22c55e",
    padding: 10,
    width: "80%",
    borderRadius: 10,
    marginBottom: 10,
  },
  registerText: {
    color: "#fff",
    textAlign: "center",
  },
  loginText: {
    color: "#22c55e",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  loginText: {
    color: "#000",
    textAlign: "center",
  },
});
