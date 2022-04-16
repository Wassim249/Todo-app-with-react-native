import {
  SafeAreaView,
  ScrollView,
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
import tailwind from "twrnc";

const Register = ({ navigation }) => {
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
      try {
        const { data } = await axios.post(
          config.SERVER_URL + "/auth/register",
          {
            username,
            password,
          }
        );
        if (data.success) {
          setUser(data.user);

          await AsyncStorage.setItem(
            "user",
            JSON.stringify({
              username,
              password,
              isAuth: true,
            })
          );

          setUser({
            username,
            password,
          });

          navigation.navigate("Home");
        } else {
          setErrorText(data.message);
        }
      } catch (error) {
        console.log(error);
        setErrorText("Erreur lors de l'enregistrement");
      }
    }
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <ScrollView style={tailwind`h-full bg-white`}>
        <View
          style={tailwind`mt-10 flex flex-col items-center justify-center bg-white`}
        >
          <Text
            style={tailwind`text-4xl font-bold my-10 text-sky-500 text-left `}
          >
            Créer un compte
          </Text>

          {error != "" && (
            <View style={tailwind`bg-red-300 w-4/5 p-5 mb-5 rounded-lg`}>
              <Text style={tailwind`text-slate-900 text-center`}>{error}</Text>
            </View>
          )}
          <TextInput
            style={textsInputStyle}
            onChangeText={(text) => setUsername(text)}
            placeholder="Nom d'utilisateur"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={textsInputStyle}
            onChangeText={(text) => setPassword(text)}
            placeholder="Mot de passe"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={textsInputStyle}
            onChangeText={(text) => setPasswordConf(text)}
            placeholder="Resaisir votre Mot de passe"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={tailwind`bg-cyan-500 w-4/5 p-5 rounded-lg `}
            onPress={handleRegister}
          >
            <Text style={tailwind`text-white text-center`}>S'inscrire</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={tailwind`text-slate-900 text-center mt-5 underline`}
              onPress={() => navigation.navigate("Login")}
            >
              Déjà inscrit ?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const textsInputStyle = tailwind`w-4/5 border border-gray-400 p-5 rounded-lg bg-gray-50 mb-5 `;
