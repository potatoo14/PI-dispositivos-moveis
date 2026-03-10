import React from "react";
import { StyleSheet, View } from "react-native";
import { useGameState } from "../core/GameStateContext";

import ExplorationView from "../components/ExplorationView";
import DialogueView from "../components/DialogueView";

export default function GameEngineScreen() {
  const { activeEvent } = useGameState();

  return (
    <View style={styles.container}>
      {/* 1. THE BASE LAYER: Always render the room the player is in */}
      <ExplorationView />

      {/* 2. THE OVERLAY: Render dialogue ON TOP if an event is active */}
      {activeEvent ? <DialogueView /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
});
