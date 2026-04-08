import { createContext, useReducer, useContext } from "react";

const initialState = {
  inventory: [],
  flags: {},
  currentRoom: "intro_room",
  activeEvent: "intro_event",
  currentScreen: "MENU",
};

function gameReducer(state, action) {
  switch (action.type) {

    case "give_item":
      if (state.inventory.includes(action.itemId)) return state; // Prevent duplicates
      return { ...state, inventory: [...state.inventory, action.itemId] };

    case "take_item":
      return {
        ...state,
        inventory: state.inventory.filter((id) => id !== action.itemId),
      };

    case "set_flag":
      return { ...state, flags: { ...state.flags, [action.flag]: true } };

    case "remove_flag":
      return { ...state, flags: { ...state.flags, [action.flag]: false } };

    case "toggle_flag":
      return { 
        ...state, 
        flags: { ...state.flags, [action.flag]: !state.flags[action.flag] } 
      };

    case "room_change":
      return { ...state, currentRoom: action.targetRoom };

    case "set_event":
      return { ...state, activeEvent: action.targetEvent };

    case "START_GAME":
      return { 
        ...state, 
        currentScreen: "GAME",
    };

    case "GO_TO_MENU":
      return { 
        ...state, 
        currentScreen: "MENU" 
  };

  default:
      // The dispatcher ignores visual actions like "dialogue"
      return state;
  }
}

const GameStateContext = createContext();

export function GameStateProvider({ children }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameStateContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
}

export const useGameState = () => useContext(GameStateContext);
