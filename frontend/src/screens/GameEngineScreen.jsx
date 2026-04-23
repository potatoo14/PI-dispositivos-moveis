import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useGameState } from "../core/GameStateContext";
import EventManager from "../components/EventManager";
import ExplorationView from "../components/ExplorationView";

export default function GameEngineScreen({ navigation }) {
  const { gameState } = useGameState();

  return (
    <View style={styles.container}>
      <ExplorationView />
      {gameState.activeEvent ? <EventManager /> : null}
      {gameState.activeEvent ? null : <TouchableOpacity
        style={styles.inventoryButton}
        onPress={() => navigation.navigate("Inventory")}
      >
        <Image
          resizeMode="contain"
          source={require("../../assets/extra/inventory_button.png")}
        />
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  inventoryButton: {
    position: "absolute",
    top: "5%",
    right: "2%",
    zIndex: 100,
  },
});
