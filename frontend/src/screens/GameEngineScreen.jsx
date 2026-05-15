import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { useGameState } from "../core/GameStateContext";
import EventManager from "../components/EventManager";
import ExplorationView from "../components/ExplorationView";

export default function GameEngineScreen({ navigation }) {
  const { gameState, dispatch } = useGameState();

  // LOG DE DEBUG - Olhe o terminal do seu VS Code/Expo!
  console.log("--- DEBUG GAME ENGINE ---");
  console.log("Sala atual:", gameState.currentRoom);
  console.log("Evento ativo:", gameState.activeEvent);

  const handleOpenConfig = () => {
    dispatch({ type: "set_paused", value: true });
    navigation.navigate("ConfigMenu");
  };

  return (
    <View style={styles.container}>
      {/* 1. O Cenário */}
      <ExplorationView />

      {/* 2. Camada de Eventos */}
      {gameState.activeEvent ? <EventManager /> : null}

      {/* 3. Seus Botões com a sua lógica de CSS */}
      <TouchableOpacity
        style={styles.configbutton}
        onPress={handleOpenConfig}
      >
        <Image 
          source={require('../../assets/extra/option_button.png')}
          style={styles.buttonImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.inventorybutton}
        onPress={() => navigation.navigate("Inventory")}
      >
        <Image 
          source={require('../../assets/extra/item_button.png')}
          style={styles.buttonImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Mudei para azul marinho para você saber que este código novo entrou em vigor
  container: { flex: 1, backgroundColor: "#000080" },

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