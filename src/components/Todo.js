import { StyleSheet, Text, TouchableOpacity, Alert, View } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import EditTodo from "./EditTodo";
import tailwind from "twrnc";

const Todo = ({
  id,
  title,
  isCompleted,
  handleCheck,
  handleDelete,
  handleEdit,
}) => {
  const [checked, setChecked] = useState(isCompleted);
  const [pressed, setPressed] = useState(false);

  const showDialog = () => {
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
  };

  return (
    <View style={tailwind`flex flex-row`}>
      <View style={tailwind`mb-5 bg-white py-10 rounded-lg flex flex-row justify-center items-center px-5 bg-slate-100`}>
        <Checkbox
          value={checked}
          color="#06B6D4"
          onValueChange={() => {
            setChecked(!checked);
            handleCheck(id);
          }}
        />
      </View>
      {/* **************************************** */}

      <TouchableOpacity
        onLongPress={() => {
          showDialog();
        }}
        onPress={() => {
          setPressed(true);
        }}
        style={tailwind`ml-3 grow-1 mb-5 bg-white py-10 rounded-lg flex flex-row justify-start items-center px-5 bg-slate-100`}
      >
        {pressed ? (
          <EditTodo
            oldTitle={title}
            pressed={pressed}
            setPressed={setPressed}
            handleEdit={handleEdit}
            id={id}
          />
        ) : (
          <Text style={tailwind`font-bold text-slate-900`}>{title}</Text>
        )}
      </TouchableOpacity>
      {/* /********************************************* */}
    </View>
  );
};

export default Todo;
