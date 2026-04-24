import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import { useGameState } from "../core/GameStateContext";
import EventManager from "../components/EventManager";
import ExplorationView from "../components/ExplorationView";

export default function GameEngineScreen({ navigation }) {
  const { gameState } = useGameState();

  return (
    <View style={styles.container}>
      <ExplorationView />

      {gameState.activeEvent ? <EventManager /> : null}

      {/* Botão de voltar pro menu */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "#fff" }}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
});