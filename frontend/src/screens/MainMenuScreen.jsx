import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

import { useGameState } from "../core/GameStateContext.jsx";

export default function MainMenuScreen() {
  const { dispatch } = useGameState();
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/extra/main_menu.png")}
    >
      <Text style={styles.text}>Alice no País das maravilhas</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch({ type: "START_GAME" })}
      ></TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    // height: "30%",
    // width: "20%",
    top: "33%",
    left: "31.5%",
    position: "absolute",
    color: "#FC0266",
    fontSize: 22,
    fontWeight: "bold",
  },
  button: {
    height: "30%",
    width: "20%",
    top: "55%",
    left: "30%",
    position: "absolute",
  },
});
