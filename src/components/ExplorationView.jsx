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
import storyData from "../core/story.json";
import { ASSETS } from "../core/assetsMap";

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
  const roomData = storyData[currentRoom];

  const handleInteract = (interactable) => {
    const { onInteract } = interactable;
    if (!onInteract) return;

    // ACTION 1: Inspecting something (Triggers a Dialogue Overlay)
    if (onInteract.type === "dialogue") {
      setActiveEvent(onInteract.targetEvent);
    }

    // ACTION 2: Picking up an item
    else if (onInteract.type === "collect") {
      addToInventory(onInteract.itemId);

      // If the interactable has a hideIfFlag, set it to true so the item disappears from the room
      if (interactable.hideIfFlag) {
        setFlag(interactable.hideIfFlag, true);
      }

      if (onInteract.message) {
        Alert.alert("Item Found!", onInteract.message);
        // Note: You could also change this to setActiveEvent("found_key_dialogue")
        // if you want characters to talk when an item is found!
      }
    }

    // ACTION 3: Moving to a new room (e.g., clicking a door)
    else if (onInteract.type === "scene_change") {
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
