import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const Form = ({ handleAdd }) => {
  const [title, setTitle] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(e) => {
          setTitle(e);
        }}
        placeholder="ajouter une todo"
        style={styles.textinput}
      />
      <TouchableOpacity
        onPress={() => {
          handleAdd(title);
        }}
        style={styles.addButton}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 20,
  },

  textinput: {
    backgroundColor: "#e2e8f0",
    flexGrow: 1,
    padding: 20,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: "#22c55e",
    paddingHorizontal: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
