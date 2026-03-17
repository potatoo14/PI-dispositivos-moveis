import { View, Text, StyleSheet } from "react-native";

export default function DialogueBox({ speaker, text }) {
  if (!text) return null; // Don't render if there's no dialogue

  return (
    <View style={styles.container}>
      {speaker && <Text style={styles.speakerName}>{speaker}</Text>}
      <Text style={styles.dialogueText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "30%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "1%",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  speakerName: {
    color: "yellow",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dialogueText: { color: "white", fontSize: 18, lineHeight: 26 },
});
