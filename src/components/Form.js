import { StyleSheet, View, TextInput, Button } from "react-native";
import { useState } from "react";

const Form = ({ handleAdd }) => {
  const [title, setTitle] = useState("");

  return (
    <View style={styles.container}>
      {/* le saisie de text pour le titre */}
      <TextInput
        onChangeText={(e) => {
          setTitle(e);
        }}
        placeholder="ajouter une todo"
        value={title}
        style={styles.textinput}
      />
      {/**************************************************** */}

      {/* Button Ajouter  */}
      <Button
        onPress={() => {
          setTitle("");
          handleAdd(title);
        }}
        color="#22c55e"
        style={{ ...styles.addButton, ...styles.buttonText }}
        title="+"
        accessibilityLabel="Ajouter une todo"
      />
      {/************************************************************************** */}
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
    padding: 30,
    marginLeft: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
  },
});
