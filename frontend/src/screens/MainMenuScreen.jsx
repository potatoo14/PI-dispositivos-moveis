import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";

export default function MainMenuScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/extra/main_menu.png")}
    >
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("GameEngine")}
        >
          <Image
            source={require('../../assets/extra/play_menu.png')}
            style={styles.buttonImage}
            resizeMode="contain"
          />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { left: "50%" }]}
        onPress={() => navigation.navigate("ConfigMenu")}
        >
        <Image
            source={require('../../assets/extra/config_menu.png')}
            style={styles.buttonImage}
            resizeMode="contain"
          />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  
  button: {
    height: "30%",
    width: "20%",
    top: "55%",
    left: "30%",
    position: "absolute",
  },
  buttonImage: {
    width: 120,
    height: 60,
  },
});
