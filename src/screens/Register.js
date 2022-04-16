import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { UserContext } from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import config from "../utils/config";

const Register = ({ route, navigation }) => {
  const [error, setErrorText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const { user, setUser } = useContext(UserContext);

  const handleRegister = async () => {
    if (username === "") setErrorText("Veuillez entrer un nom d'utilisateur");
    else if (password === "") setErrorText("Veuillez entrer un mot de passe");
    else if (password !== passwordConf)
      setErrorText("Les mots de passe ne correspondent pas");
    else {
      //register with axios
      await register();
    }
  };

  const register = async () => {
    try {
      console.log("register");
      const { data } = await axios.post(config.SERVER_URL + "/auth/register", {
        username,
        password,
      });
      if (data.success) {
        setUser(data.user);
        navigation.navigate("Home");
      } else {
        setErrorText(data.message);
      }
    } catch (error) {
      console.log(error);
      setErrorText("Erreur lors de l'enregistrement");
    }
  };

  const storeUser = async () => {
    try {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          username,
          password,
        })
      );

      setUser({
        username,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <ScrollView style={{ height: "100%", backgroundColor: "white" }}>
        <View style={styles.container}>
          <Text style={styles.registerLabel}>Inscription</Text>
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
            <Text style={styles.registerText}>S'inscrire</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text
              style={{
                color: "#22c55e",
                textAlign: "center",
                textDecorationLine: "underline",
              }}
            >
              S'identifier
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    flex: 1,
    height: "100%",
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

});
