import {
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useGameState } from "../core/GameStateContext";
import { ASSETS, STORY } from "../core/Content";

export default function ExplorationView() {
  const { gameState, dispatch } = useGameState();

  const roomData = STORY[gameState.currentRoom];

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  if (!roomData) {
    console.error(
      `[ExplorationView] Room "${gameState.currentRoom}" not found`,
    );
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

  // Default to 1 (static screen) if not specified in STORY
  const roomMultiplierW = roomData.scrollWidth || 1;
  const roomMultiplierH = roomData.scrollHeight || 1;

  const totalRoomWidth = SCREEN_WIDTH * roomMultiplierW;
  const totalRoomHeight = SCREEN_HEIGHT * roomMultiplierH;

  return (
    <ScrollView
      key={gameState.currentRoom} // Destroy and rebuild ScrollView everytime currentRoom changes, so it doesn't keep how much you scrolled from different rooms
      bounces={false} // Disables rubber-band stretching on iOS
      overScrollMode="never" // Disables rubber-band stretching on Android
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <ScrollView
        horizontal={true}
        bounces={false}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >
        <ImageBackground
          source={ASSETS.backgrounds[roomData.background]}
          style={{ width: totalRoomWidth, height: totalRoomHeight }}
          resizeMode="cover" // scales up the image to fit in the background intended size (even if that means cropping the image)
        >
          {/* Filter out anything that shouldn't be visible */}
          {/* Loop through only the ones that survived */}
          {roomData.interactables
            ?.filter((interactable) => canRender(interactable, gameState))
            .map((interactable, index) => {
              const spriteSource = ASSETS.sprites[interactable.img];
              if (!spriteSource) {
                console.warn(
                  `[ExplorationView] Sprite for "${interactable.img}" is missing`,
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
                    // backgroundColor: "rgba(255, 0, 0, 0.4)", // UNCOMMENT THIS LINE WHILE DEVELOPING TO SEE THE HITBOXES:
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
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
