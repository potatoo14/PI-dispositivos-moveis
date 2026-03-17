import { StyleSheet, View } from "react-native";

import { useGameState } from "../core/GameStateContext";
import EventManager from "../components/EventManager";
import ExplorationView from "../components/ExplorationView";

export default function GameEngineScreen() {
  const { gameState } = useGameState();

  return (
    <View style={styles.container}>
      <ExplorationView />
      {gameState.activeEvent ? <EventManager /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
});
