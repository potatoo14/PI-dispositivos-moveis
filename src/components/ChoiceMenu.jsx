import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ChoiceMenu({ choices, onChoose }) {
  if (!choices || choices.length === 0) return null;

  return (
    <View style={styles.container}>
      {choices.map((choice, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => onChoose(choice.targetNode)}
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
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    minWidth: "70%",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ff9900",
    elevation: 4, // shadow
  },
  text: { color: "#333", fontSize: 20, fontWeight: "bold" },
});
