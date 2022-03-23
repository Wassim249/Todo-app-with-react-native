import { StyleSheet, Text, TouchableOpacity, Alert, View } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";

const Todo = ({ id, title, isCompleted, handleCheck, handleDelete }) => {
  const [checked, setChecked] = useState(isCompleted);

  return (
    <View style={styles.todoContainer}>
      <View style={{ ...styles.container, ...styles.checkboxContainer }}>
        <Checkbox
          style={styles.checkbox}
          value={checked}
          color="#22c55e"
          onValueChange={() => {
            setChecked(!checked);
            handleCheck(id);
          }}
        />
      </View>

      <TouchableOpacity
        onLongPress={() => {
          Alert.alert("Confirmation", "Vous voulez vraiment supprimé ce todo", [
            {
              text: "Annuler",
            },
            {
              text: "OK",
              onPress: () => {
                handleDelete(id);
              },
            },
          ]);
        }}
        style={{ ...styles.container, ...styles.textContainer }}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  todoContainer: {
    display: "flex",
    flexDirection: "row",
  },
  container: {
    marginBottom: 20,
    backgroundColor: "#e2e8f0",
    paddingVertical: 30,
    borderRadius: 10,
  },
  textContainer: {
    paddingHorizontal: 10,
    marginLeft: 10,
    flexGrow: 1,
  },

  checkboxContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    color: "black",
  },
});
