import {
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  View,
  Text,
} from "react-native";
import { useGameState } from "../core/GameStateContext";
import { ASSETS, DIALOGUES, ROOMS, ACTIONS } from "../core/Content";

export default function ExplorationView() {
  const { gameState, dispatch } = useGameState();

  if (!ROOMS) {
    return <Text>Erro: Objeto ROOMS não importado!</Text>;
  }

  const roomData = ROOMS[gameState.currentRoom];

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  if (!roomData) {
    console.log("SALA ATUAL NO ESTADO:", gameState.currentRoom);
    console.log("SALAS DISPONÍVEIS NO CONTENT:", Object.keys(ROOMS));

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
        }}
      >
        <Text style={{ color: "white" }}>
          Erro: Sala "{gameState.currentRoom}" não encontrada!
        </Text>
        <Text style={{ color: "white" }}>
          Verifique seu GameStateContext ou Content.js
        </Text>
      </View>
    );
  }

  const handleInteract = (interactable) => {
    const action = ACTIONS[interactable.action];

    if (!action) {
      console.warn(
        `[ExplorationView] Ação "${interactable.action}" não encontrada em ACTIONS`,
      );
      return;
    }

    if (action.type === "move") {
      dispatch({ type: "room_change", targetRoom: action.to });
    } else if (action.type === "dialogue") {
      dispatch({
        type: "set_event",
        targetEvent: [{ type: "dialogue", sequence: action.id }],
      });
    } else if (action.type === "event") {
      dispatch({ type: "set_event", targetEvent: action.id });
    }
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
              }

              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    position: "absolute",
                    left: interactable.x,
                    top: interactable.y,
                    width: interactable.w,
                    height: interactable.h,
                    // backgroundColor: "rgba(255, 0, 0, 0.4)", // UNCOMMENT THIS LINE WHILE DEVELOPING TO SEE THE HITBOXES:
                  }}
                  onPress={() => handleInteract(interactable)}
                >
                  <Image
                    style={[
                      styles.container,
                      {
                        transform: [
                          { rotate: interactable.rotation || "0deg" },
                          { scale: interactable.scale || 1 },
                        ],
                      },
                    ]}
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
