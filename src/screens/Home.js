import { StatusBar } from "expo-status-bar";
import {
  View,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Todo from "./../components/Todo";
import Form from "./../components/Form";
import { UserContext } from "../contexts/UserContext";
import config from "../utils/config";
import tailwind from "twrnc";

export default function Home({ navigation, route }) {
  const [todos, setTodos] = useState([]);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          config.SERVER_URL + `/todos/oneuser/${user._id}`
        );
        setTodos(response.data.todos);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodos();
  }, []);
  /************************************************************************** */

  const handleCheck = async (id) => {
    try {
      const { data } = await axios.put(config.SERVER_URL + `/todos/${id}`, {
        completed: !todos.find((todo) => todo._id === id).completed,
      });
      if (data.success) {
        setTodos(
          todos.map((t) =>
            t._id === id ? { ...t, completed: !t.completed } : t
          )
        );
      }
    } catch (error) {}
  };
  /******************************************************************************* */
  const handleAdd = async (title) => {
    try {
      const { data } = await axios.post(config.SERVER_URL + "/todos", {
        completed: false,
        title,
        userId: user._id,
      });

      if (data.success) {
        setTodos([...todos, data.todo]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /******************************************************************************* */
  const handleEdit = async (id, title) => {
    try {
      const { data } = await axios.put(config.SERVER_URL + `/todos/${id}`, {
        title,
      });
      if (data.success) {
        setTodos(todos.map((t) => (t._id === id ? { ...t, title } : t)));
      }
    } catch (error) {
      console.log(error);
    }
  };
  /******************************************************************************* */

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(config.SERVER_URL + `/todos/${id}`);
      if (data.success) {
        setTodos(todos.filter((t) => t._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  /******************************************************************************* */

  BackHandler.addEventListener("hardwareBackPress", () => true);

  return (
    <View style={tailwind`h-full p-4 bg-slate-50`}>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={tailwind`flex-row justify-between items-center mt-10`}>
          <Text style={tailwind`text-2xl text-cyan-500 font-bold `}>
            Bonjour , {user.username}
          </Text>

          <TouchableOpacity
            onPress={() => {
              setUser({ ...user, isAuth: false });
              navigation.navigate("Login");
            }}
          >
            <Text style={tailwind`text-xl text-slate-900 font-bold`}>↲</Text>
          </TouchableOpacity>
        </View>

        <Form handleAdd={handleAdd} />

        <FlatList
          data={todos}
          keyExtractor={(todo) => todo._id}
          horizontal={false}
          renderItem={({ item }) => (
            <Todo
              id={item._id}
              title={item.title}
              isCompleted={item.completed}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              todos={todos}
              setTodos={setTodos}
            />
          )}
        />
      </ScrollView>
    </View>
  );
}
