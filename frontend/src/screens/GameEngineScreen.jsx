import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";

import { useGameState } from "../core/GameStateContext";
import EventManager from "../components/EventManager";
import ExplorationView from "../components/ExplorationView";

export default function GameEngineScreen({ navigation }) {
  const { gameState } = useGameState();

  const handleOpenConfig = () => {
  
    dispatch({ type: "set_paused", value: true });
    navigation.navigate("ConfigMenu");
  };

  return (
    <View style={styles.container}>
      <ExplorationView />

      {gameState.activeEvent ? <EventManager /> : null}

      {/* Botão de ir para o menu de configurações */}
      <TouchableOpacity
        style={styles.configbutton}
        onPress={() => navigation.navigate("ConfigMenu")}
      >
        <Image source={require('../../assets/extra/option_button.png')}
          style={styles.buttonImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  configbutton: {
    position: "absolute",
    top: "5%",    // Um pequeno recuo do topo para não cobrir a barra de status
    right: "0%",  // "Literalmente do lado da direita, sem distância"
    width: "10%", // MESMO WIDTH DO IBUTTON
    height: "20%", // MESMO HEIGHT DO IBUTTON
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonImage: {
    width: "200%",
    height: "200%",
  },
});