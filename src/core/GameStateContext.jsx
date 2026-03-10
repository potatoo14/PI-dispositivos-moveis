import React, { createContext, useState, useContext } from "react";

const GameStateContext = createContext();

export function GameStateProvider({ children }) {
  const [inventory, setInventory] = useState([]);
  const [flags, setFlags] = useState({});

  // 1. BASE LAYER: Where is the player standing?
  const [currentRoom, setCurrentRoom] = useState("not_ready_scene");

  // 2. OVERLAY LAYER: Who are they talking to?
  const [activeEvent, setActiveEvent] = useState("intro");

  const addToInventory = (itemId) => {
    if (!inventory.includes(itemId)) setInventory([...inventory, itemId]);
  };

  const removeFromInventory = (itemId) => {
    setInventory(inventory.filter((id) => id !== itemId));
  };

  const setFlag = (flagName, value = true) => {
    setFlags((prev) => ({ ...prev, [flagName]: value }));
  };

  const checkFlag = (flagName) => !!flags[flagName];

  return (
    <GameStateContext.Provider
      value={{
        inventory,
        addToInventory,
        removeFromInventory,
        flags,
        setFlag,
        checkFlag,
        currentRoom,
        setCurrentRoom,
        activeEvent,
        setActiveEvent,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

export const useGameState = () => useContext(GameStateContext);
