import { Image, StyleSheet } from "react-native";
import { ASSETS } from "../core/Content";

export default function CharacterSprite({ character, position }) {
  if (!character || !ASSETS.sprites[character]) return null;

  // Determine alignment based on the 'position' prop
  let alignmentStyle = { alignSelf: "center" };
  if (position === "left")
    alignmentStyle = {
      alignSelf: "flex-start",
      marginLeft: "3%",
    };
  if (position === "right")
    alignmentStyle = {
      alignSelf: "flex-end",
      marginRight: "3%",
    };

  return (
    <Image
      source={ASSETS.sprites[character]}
      style={[styles.sprite, alignmentStyle]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  sprite: {
    width: "40%",
    height: "100%",
  },
});
