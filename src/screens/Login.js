import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

const Login = ({navigation}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (userName.trim() === "" || password.trim() === "") {
      setError("All fields are required");
    } else {
      setError("");
      navigation.navigate("Home" , {
        user : userName,}
        );
    }
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.loginLabel}>Login</Text>
          {error !== "" && (
            <View
              style={{
                backgroundColor: "red",
                width: "80%",
                padding: 10,
                marginBottom: 10,
                borderRadius: 10,
              }}
            >
              <Text style={styles.error}>{error}</Text>
            </View>
          )}
          <TextInput
            style={styles.textinput}
            placeholder="Nom d'utilisateur"
            autoCapitalize="none"
            onChangeText={(text) => setUserName(text)}
            autoCorrect={false}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Mot de passe"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          >
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
    height: Dimensions.get("window").height,
    width:Dimensions.get("window").width,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textinput: {
    width: "80%",
    borderColor: "grey",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  error : {
    color: "white",
  } ,
  loginButton: {
    width: "80%",
    backgroundColor: "#22c55e",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  loginText: {
    color: "#fff",
    fontWeight : "bold",
    textAlign: "center",
  },
  loginLabel: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
    color : "#22c55e"
  },
  registerText: {
    color: "#22c55e",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
