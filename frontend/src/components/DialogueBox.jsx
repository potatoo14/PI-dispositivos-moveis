import { Text, StyleSheet, ImageBackground } from "react-native";

export default function DialogueBox({ speaker, text }) {
  if (!text) return null; // Don't render if there's no dialogue

  return (
    <ImageBackground
      source={require("../../assets/extra/dialogue_box.png")}
      style={styles.container}
      imageStyle={{ resizeMode: "stretch" }}
    >
      {speaker && <Text style={styles.speakerName}>{speaker}</Text>}
      <Text style={styles.dialogueText}>{text}</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "70%",
    width: "100%",
    top: "50%",
    position: "absolute",
  },
  speakerName: {
    top: "4%",
    left: "14%",
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dialogueText: {
    top: "4%",
    left: "8%",
    color: "black",
    fontSize: 22,
    lineHeight: 26,
  },
});
