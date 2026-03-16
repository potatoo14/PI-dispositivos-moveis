import { createContext, useReducer, useContext } from "react";

const initialState = {
  inventory: [],
  flags: {},
  currentRoom: "intro_room",
  activeEvent: "intro_event",
};

function gameReducer(state, action) {
  switch (action.type) {
    case "give_item":
      // if (state.inventory.includes(action.itemId)) return state;
      return { ...state, inventory: [...state.inventory, action.itemId] };

    case "take_item":
      return {
        ...state,
        inventory: state.inventory.filter((id) => id !== action.itemId),
      };

    case "set_flag":
      return { ...state, flags: { ...state.flags, [action.flag]: true } };

    // case "remove_flag":
    //   return { ...state, flags: { ...state.flags, [action.flag]: true } };

    // case "toggle_flag":
    //   return { ...state, flags: { ...state.flags, [action.flag]: true } };

    case "room_change":
      return { ...state, currentRoom: action.targetRoom };

    case "set_event":
      return { ...state, activeEvent: action.targetEvent };

    default:
      // console.warn(`action "${action}" is unknown, doing nothing`);
      // the dispatcher ignores actions when appropriate, like "dialogue"
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
