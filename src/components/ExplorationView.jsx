import {
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useGameState } from "../core/GameStateContext";
import { ASSETS, STORY } from "../core/Content";

export default function ExplorationView() {
  // const { currentRoom, setActiveEvent, checkFlag } = useGameState();
  const { gameState, dispatch } = useGameState();

  const roomData = STORY[gameState.currentRoom];

  if (!roomData) {
    console.error(`[ExplorationView] Room "${currentRoom}" not found`);
    return null;
  }

  const handleInteract = (interactable) => {
    if (!interactable.targetEvent) {
      console.warn(
        `[ExplorationView] interactable "${interactable}" doesn't have any event tied to it`,
      );
      return;
    }
    // dispatch(interactable.targetEvent, "room_change");
    dispatch({ type: "set_event", targetEvent: interactable.targetEvent });
  };

  return (
    <ImageBackground
      source={ASSETS.backgrounds[roomData.background]}
      style={styles.container}
    >
      {/* Loop through all interactables in the JSON for this room */}
      {roomData.interactables?.map((interactable, index) => {
        // If the player already picked this up (or triggered a hide flag), don't render it!
        if (interactable.hideIfFlag && gameState.flags[interactable.hideIfFlag]) {
          return null;
        }

        const spriteSource = ASSETS.sprites[interactable.id];
        if (!spriteSource) {
          console.warn(`[ExplorationView] Sprite for "${interactable.id}" is missing`);
          return null;
        }

        return (
          <TouchableOpacity
            key={index}
            style={{
              position: "absolute",
              left: interactable.x,
              top: interactable.y,
              width: interactable.width,
              height: interactable.height,
              // UNCOMMENT THIS LINE WHILE DEVELOPING TO SEE THE HITBOXES:
              backgroundColor: "rgba(255, 0, 0, 0.4)",
            }}
            onPress={() => handleInteract(interactable)}
          >
            <Image
              style={styles.container}
              resizeMode="contain"
              source={spriteSource}
            />
          </TouchableOpacity>
        );
      })}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", height: "100%" },
});
