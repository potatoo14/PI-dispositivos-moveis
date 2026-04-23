import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from "react-native";
import { useGameState } from "../core/GameStateContext";
import { ASSETS } from "../core/Content";

export default function InventoryScreen({ navigation }) {
  const { gameState } = useGameState();

  const inventorySlots = Array.from({ length: 8 }).map((_, index) => {
    return gameState.inventory && gameState.inventory[index]
      ? gameState.inventory[index]
      : null;
  });

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/extra/inventory_background.png")}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          resizeMode="contain"
          source={require("../../assets/extra/back_button.png")}
        />
      </TouchableOpacity>

      <View style={styles.gridContainer}>
        <FlatList
          data={inventorySlots}
          keyExtractor={(item, index) =>
            item ? `${item}-${index}` : `empty-slot-${index}`
          }
          numColumns={4}
          columnWrapperStyle={styles.rowWrapper}
          renderItem={({ item }) => {
            const spriteSource = item ? ASSETS.sprites[item] : null;

            return (
                <ImageBackground
                  style={styles.itemSlot}
                  source={require("../../assets/extra/inventory_slot.png")}
                >
                  {spriteSource && (
                    <Image
                      source={spriteSource}
                      style={styles.itemImage}
                      resizeMode="contain"
                    />
                  )}
                </ImageBackground>
            );
          }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  backButton: {
    padding: "2%",
  },
  gridContainer: {
    flex: 1,
    alignItems: "center",
  },
  rowWrapper: {
    justifyContent: "space-evenly",
    gap: 15,
    marginBottom: 15,
  },
  itemSlot: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scale: 2 }],
  },
  itemImage: {
    width: 30,
    height: 30,
  },
});
