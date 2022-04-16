import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Todo from "./../components/Todo";
import Form from "./../components/Form";
import { UserContext } from "../contexts/UserContext";
import config from "../utils/config";

export default function Home({ navigation, route }) {
  const [todos, setTodos] = useState([]);

  const { user, setUser } = useContext(UserContext);

  //Ce Hook se déclenche quand le composant Home s'exécute
  useEffect(() => {
    //fonction qui fait apporter les todos
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

  //Ce Hook se déclenche quand l'état de todos est changé
  useEffect(() => {
    //Fonction qui enregistre les todos dans le stockage local
    const storeTodos = async () => {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    };
    storeTodos();
  }, [todos]);

  //Fonction qui change la propriété completed d'un objet avec un id donnné dans le tableau todos
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
      } else {
        console.log(data.message);
      }
    } catch (error) {}
  };
  /******************************************************************************* */
  //Fonction qui ajoute un todo
  const handleAdd = async (title) => {
    try {
      const { data } = await axios.post(config.SERVER_URL + "/todos", {
        completed: false,
        title,
        userId: user._id,
      });

      if (data.success) {
        setTodos([...todos, data.todo]);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /******************************************************************************* */

  //Fonction qui modifie un todo selon son id
  const handleEdit = async (id, title) => {
    console.log(id, title);
    try {
      const { data } = await axios.put(config.SERVER_URL + `/todos/${id}`, {
        title,
      });
      if (data.success) {
        setTodos(todos.map((t) => (t._id === id ? { ...t, title } : t)));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  /******************************************************************************* */

  //Fonction qui supprime un todo selon son id
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(config.SERVER_URL + `/todos/${id}`);
      if (data.success) {
        setTodos(todos.filter((t) => t._id !== id));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /******************************************************************************* */

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* un Composant personalisé responsable de l'ajout un todo */}

      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",

              color: "#22c55e",
            }}
          >
            Bonjour , {user.username}
          </Text>

          <TouchableOpacity
            onPress={() => {
              setUser({ ...user, isAuth: false });
              navigation.navigate("Login");
            }}
          >
            <Text>Se déconnecter</Text>
          </TouchableOpacity>
        </View>

        <Form handleAdd={handleAdd} />

        <FlatList
          data={todos}
          keyExtractor={(todo) => todo.id}
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

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 20,
    backgroundColor: "#f3f4f6",
  },
});
