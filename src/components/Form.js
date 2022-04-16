import { View, TextInput, TouchableOpacity , Text } from "react-native";
import { useState } from "react";
import tailwind from "twrnc";

const Form = ({ handleAdd }) => {
  const [title, setTitle] = useState("");

  return (
    <View style={tailwind`flex flex-row py-5`}>
      <TextInput
        onChangeText={(e) => {
          setTitle(e);
        }}
        placeholder="ajouter une todo"
        value={title}
        style={tailwind`bg-slate-100 grow-1 p-5 rounded-lg`}
      />
      {/**************************************************** */}

      <TouchableOpacity
      style={tailwind`ml-2 bg-cyan-500 px-4 py-2 rounded-lg w-16 flex flex-row justify-center items-center`}
       onPress={() => {
        setTitle("");
        handleAdd(title);
      }}
      >
        <Text
        style={tailwind`text-white text-xl font-bold `}
        >
          +
        </Text>
      </TouchableOpacity>
     
      {/************************************************************************** */}
    </View>
  );
};

export default Form;
