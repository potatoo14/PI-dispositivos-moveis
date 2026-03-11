import React from "react";
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useGameState } from "../core/GameStateContext";
import { ASSETS, STORY } from "../core/Content";

export default function ExplorationView() {
  const {
    currentRoom,
    setCurrentRoom,
    setActiveEvent,
    addToInventory,
    checkFlag,
    setFlag,
  } = useGameState();

  // Grab the data for the room the player is currently standing in
  const roomData = STORY[currentRoom];

  const handleInteract = (interactable) => {
    const { onInteract } = interactable;
    if (!onInteract) return;

    if (onInteract.type === "dialogue") {
      setActiveEvent(onInteract.targetEvent);
    } else if (onInteract.type === "collect") {
      addToInventory(onInteract.itemId);
      setActiveEvent(onInteract.targetEvent);
      // If the interactable has a hideIfFlag, set it to true so the item disappears from the room
      if (interactable.hideIfFlag) {
        setFlag(interactable.hideIfFlag, true);
      }
    } else if (onInteract.type === "room_change") {
      setCurrentRoom(onInteract.targetRoom);
    }
  };

  return (
    <ImageBackground
      source={ASSETS.backgrounds[roomData.background]}
      style={styles.container}
    >
      {/* Loop through all interactables in the JSON for this room */}
      {roomData.interactables?.map((interactable, index) => {
        // If the player already picked this up, don't render the hitbox!
        if (interactable.hideIfFlag && checkFlag(interactable.hideIfFlag)) {
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
              source={ASSETS.sprites[interactable.id]}
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
