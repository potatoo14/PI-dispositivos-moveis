import React, { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";

import DialogueBox from "./DialogueBox";
import CharacterSprite from "./CharacterSprite";
import ChoiceMenu from "./ChoiceMenu";

import { useGameState } from "../core/GameStateContext";
import storyData from "../core/story.json";
import { ASSETS } from "../core/assetsMap";

export default function DialogueView() {
  const { activeEvent, setActiveEvent } = useGameState();
  const [frameIndex, setFrameIndex] = useState(0);

  if (!activeEvent || !storyData[activeEvent]) return null;

  const sceneFrames = storyData[activeEvent];
  const currentFrame = sceneFrames[frameIndex];

  // If React is mid-transition and currentFrame is missing, just wait.
  if (!currentFrame) return null;

  const handleScreenTap = () => {
    if (currentFrame.choices) return;

    if (frameIndex < sceneFrames.length - 1) {
      setFrameIndex((prev) => prev + 1);
    } else {
      setActiveEvent(null);
    }
  };

  const handleChoice = (targetNode) => {
    setFrameIndex(0); 
    setActiveEvent(targetNode);
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenTap}>
      <View style={StyleSheet.absoluteFill}>
          <View style={styles.spriteLayer}>
            {currentFrame.sprites?.map((sprite, index) => (
              <CharacterSprite
                key={index}
                character={sprite.character}
                position={sprite.position}
              />
            ))}
          </View>

          {currentFrame.choices && (
            <ChoiceMenu
              choices={currentFrame.choices}
              onChoose={handleChoice}
            />
          )}

          <DialogueBox
            speaker={currentFrame.speaker}
            text={currentFrame.text}
          />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  spriteLayer: {
    position: "absolute",
    bottom: 150,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    height: "60%",
  },
});
