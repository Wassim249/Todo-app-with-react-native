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

const Register = () => {
  const [erroText, setErroText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const handleRegister = () => {
    if (username === "") setErroText("Veuillez entrer un nom d'utilisateur");
    else if (password === "") setErroText("Veuillez entrer un mot de passe");
    else if (password !== passwordConf)
      setErroText("Les mots de passe ne correspondent pas");
    else setErroText("");
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={styles.container}>
          {erroText !== "" && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{erroText}</Text>
            </View>
          )}
          <Text>Register</Text>
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
          <TextInput
            style={styles.textinput}
            placeholder="Resaisir votre Mot de passe"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRegister()}>
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
    backgroundColor: "#f00",
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "#fff",
    textAlign: "center",
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
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  registerText: {
    color: "#fff",
    textAlign: "center",
  },
  loginText: {
    color: "#000",
    textAlign: "center",
  },
});
