import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

import { useGameState } from "../core/GameStateContext.jsx";

export default function MainMenuScreen() {
  const { dispatch } = useGameState();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MEU JOGO</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch({ type: "START_GAME" })}
      >
        <Text style={styles.buttonText}>INICIAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
