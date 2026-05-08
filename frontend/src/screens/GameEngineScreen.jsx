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

      {/* Botão de ir para o inventário */}

      <TouchableOpacity
        style={styles.inventorybutton}
        onPress={() => navigation.navigate("Inventory")}
      >
        <Image source={require('../../assets/extra/item_button.png')}
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
    top: "5%",    
    right: "0%",  
    width: "10%", 
    height: "20%", 
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inventorybutton: {
    position: "absolute",
    top: "9%",       
    right: "10%",    
    width: "10%",    
    height: "20%",   
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonImage: {
    width: "200%",
    height: "200%",
  },
});