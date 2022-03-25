import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const EditTodo = ({ pressed, setPressed, handleEdit, id , oldTitle }) => {
const oldTitle1 = oldTitle
  const [title, setTitle] = useState(oldTitle);
  return (
    <View style={styles.container}>
      <TextInput
      defaultValue={oldTitle1}
        onChangeText={(text) => {
          setTitle(text);
        }}
        placeholder="Modifier cette todo"
      />
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          title.length != 0 && handleEdit(id, title);
          setPressed(false);
        }}
      >
        <Text style={styles.editButtonText}>done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditTodo;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  editButton: {
    backgroundColor: "green",
    borderRadius: 5,
    padding: 5,
  },
  editButtonText: {
    color: "white",
  },
});
