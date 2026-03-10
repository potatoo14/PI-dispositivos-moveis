// 1. You no longer need useEffect, so you can remove it from the import
import React, { useState } from "react";
import { StyleSheet, View, ImageBackground, TouchableWithoutFeedback } from "react-native";

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

  const handleChoice = (targetScene) => {
    setFrameIndex(0); 
    setActiveEvent(targetScene);
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenTap}>
      <View style={StyleSheet.absoluteFill}>
        <ImageBackground
          source={ASSETS.backgrounds[currentFrame.background]}
          style={styles.background}
        >
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
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  spriteLayer: {
    position: "absolute",
    bottom: 150,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    height: "60%",
  },
});
