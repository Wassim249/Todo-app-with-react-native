import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import tailwind from "twrnc";

const EditTodo = ({ setPressed, handleEdit, id , oldTitle }) => {
const oldTitle1 = oldTitle
  const [title, setTitle] = useState(oldTitle);
  return (
    <View style={tailwind`flex flex-row justify-between items-center w-11/12`}>
      <TextInput
      defaultValue={oldTitle1}
        onChangeText={(text) => {
          setTitle(text);
        }}
        placeholder="Modifier cette todo"
      />
      <TouchableOpacity
        style={tailwind`bg-cyan-500 px-4 py-2 rounded-lg`}
        onPress={() => {
          title.length != 0 && handleEdit(id, title);
          setPressed(false);
        }}
      >
        <Text style={tailwind`text-white`}>✓</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditTodo;
