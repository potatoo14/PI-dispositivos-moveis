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
    dispatch({ type: "set_event", targetEvent: interactable.targetEvent });
  };

  const canRender = (interactable, gameState) => {
    // If a hide condition is met, DO NOT render
    if (interactable.hideIfFlag && gameState.flags[interactable.hideIfFlag])
      return false;
    if (
      interactable.hideIfItem &&
      gameState.inventory.includes(interactable.hideIfItem)
    )
      return false;

    // If a show condition is missing, DO NOT render
    if (interactable.showIfFlag && !gameState.flags[interactable.showIfFlag])
      return false;
    if (
      interactable.showIfItem &&
      !gameState.inventory.includes(interactable.showIfItem)
    )
      return false;

    // If it survived all checks, render it!
    return true;
  };

  return (
    <ImageBackground
      source={ASSETS.backgrounds[roomData.background]}
      style={styles.container}
    >
      {/* Filter out anything that shouldn't be visible */}
      {/* Loop through only the ones that survived */}
      {roomData.interactables
        ?.filter((interactable) => canRender(interactable, gameState))
        .map((interactable, index) => {
          const spriteSource = ASSETS.sprites[interactable.id];
          if (!spriteSource) {
            console.warn(
              `[ExplorationView] Sprite for "${interactable.id}" is missing`,
            );
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
                backgroundColor: "rgba(255, 0, 0, 0.4)", // UNCOMMENT THIS LINE WHILE DEVELOPING TO SEE THE HITBOXES:
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
