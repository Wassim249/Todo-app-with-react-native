import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./src/components/Todo";
import Form from "./src/components/Form";

export default function App() {
  const API_URL = "https://jsonplaceholder.typicode.com/todos/";
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const localTodos = JSON.parse(await AsyncStorage.getItem("todos"));

      if (localTodos && localTodos.length != 0) setTodos(localTodos);
      else {
        const response = await axios.get(API_URL);
        setTodos(response.data.slice(0, 40).sort((t1, t2) => t1 < t2));
      }
    };

    fetchTodos();
  }, []);
  useEffect(() => {
    const storeTodos = async () => {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    };
    storeTodos();
  }, [todos]);

  const handleCheck = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAdd = (title) => {
    const id = todos.sort((t1, t2) => t1.id <= t2.id)[0].id + 1;
    setTodos([{ id, completed: false, title, userId: 1 }, ...todos]);
  };

  const handleEdit = (id, title) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, title } : t)));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id != id));
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Form handleAdd={handleAdd} />
      <FlatList
        data={todos}
        keyExtractor={(todo) => todo.id}
        renderItem={({ item }) => (
          <Todo
            id={item.id}
            todos={todos}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            setTodos={setTodos}
            title={item.title}
            isCompleted={item.completed}
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
