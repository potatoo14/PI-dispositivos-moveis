import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ChoiceMenu({ choices, onChoose }) {
  if (!choices || choices.length === 0 || !Array.isArray(choices)) {
    console.error("[ChoiceMenu] choices is either not an array, missing from STORY, or it's empty");
    return null;
  }

  return (
    <View style={styles.container}>
      {choices.map((choice, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => onChoose(choice)}
        >
          <Text style={styles.text}>{choice.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "25%",
    width: "100%",
    alignItems: "center",
    zIndex: 10,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: "2%",
    borderRadius: 20,
    marginVertical: "1%",
    minWidth: "50%",
    alignItems: "center",
  },
  text: { color: "white", fontSize: 20, fontWeight: "bold" },
});
