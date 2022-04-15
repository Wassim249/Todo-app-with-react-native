import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./../components/Todo";
import Form from "./../components/Form";
import { TouchableOpacity } from "react-native-web";

export default function Home({ navigation, route }) {
  // lien Vers l'api jsonplaceholder
  const API_URL = "https://jsonplaceholder.typicode.com/todos/";

  const [todos, setTodos] = useState([]);

  //Ce Hook se déclenche quand le composant Home s'exécute
  useEffect(() => {
    //fonction qui fait apporter les todos
    const fetchTodos = async () => {
      //Charger les todos depuis le stockage local
      const localTodos = JSON.parse(await AsyncStorage.getItem("todos"));

      //Si les todos chargés depuis le stockage local sont non null et la longueur est différente de 0
      if (localTodos && localTodos.length != 0) setTodos(localTodos);
      else {
        //Charger les todos depuis l'api
        const response = await axios.get(API_URL);
        //Trier les todos
        setTodos(response.data.slice(0, 40).sort((t1, t2) => t1 < t2));
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
  const handleCheck = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };
  /******************************************************************************* */

  //Fonction qui ajoute un todo
  const handleAdd = (title) => {
    const id = todos.sort((t1, t2) => t1.id <= t2.id)[0].id + 1;
    setTodos([{ id, completed: false, title, userId: 1 }, ...todos]);
  };
  /******************************************************************************* */

  //Fonction qui modifie un todo selon son id
  const handleEdit = (id, title) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, title } : t)));
  };
  /******************************************************************************* */

  //Fonction qui supprime un todo selon son id
  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id != id));
  };
  /******************************************************************************* */

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* un Composant personalisé responsable de l'ajout un todo */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
            color: "#22c55e",
          }}
        >
          Bonjour {route.params.user},
        </Text>

        <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
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
            id={item.id}
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
