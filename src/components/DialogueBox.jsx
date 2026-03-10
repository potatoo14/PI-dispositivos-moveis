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
    height: 150,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 20,
    borderTopWidth: 3,
    borderColor: "#ff9900", // Kid-friendly accent color
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  speakerName: {
    color: "#ffd700",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dialogueText: { color: "#fff", fontSize: 18, lineHeight: 26 },
});
