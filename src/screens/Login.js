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
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tailwind from "twrnc";


const Login = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, setUser } = useContext(UserContext);

  const handleLogin = async () => {
    if (userName.trim() === "" || password.trim() === "") {
      setError("All fields are required");
    } else {
      await login();
    }
  };

  const login = async () => {
    try {
      const { data } = await axios.post(config.SERVER_URL + "/auth/login", {
        username: userName,
        password,
      });
      if (data.success) {
        console.log('user' , data.user);
        setUser({...data.user , isAuth : true});
        await AsyncStorage.setItem(
          "user",
          JSON.stringify({
            username: userName,
            password,
            isAuth: true,
          })
        );

      
       navigation.navigate("Home");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <ScrollView style={tailwind`bg-white h-full`}>
        <View style={tailwind`flex flex-col justify-center items-center mt-10 bg-white`}>
          <Text
          
          style={tailwind`text-4xl font-bold my-10 text-sky-500 text-left `}
          >Indentification</Text>
          {error !== "" && (
            <View
            style={tailwind`bg-red-300 w-4/5 p-5 mb-5 rounded-lg`}
            >
              <Text style={tailwind`text-slate-900 text-center`}>{error}</Text>
            </View>
          )}
          <TextInput
            style={textsInputStyle}
            placeholder="Nom d'utilisateur"
            autoCapitalize="none"
            onChangeText={(text) => setUserName(text)}
            autoCorrect={false}
          />
          <TextInput
            style={textsInputStyle}
            placeholder="Mot de passe"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity 
           style={tailwind`bg-cyan-500 w-4/5 p-5 rounded-lg `}
           onPress={handleLogin}>
            <Text
          style={tailwind`text-white text-center`}
             >S'identifier</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text 
             style={tailwind`text-slate-900 text-center mt-5 underline`}
            >Créér un compte</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const textsInputStyle = tailwind`w-4/5 border border-gray-400 p-5 rounded-lg bg-gray-50 mb-5 `;
