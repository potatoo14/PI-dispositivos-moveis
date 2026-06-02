import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useRef,
} from "react";
import { loadGameFromCloud, saveGameToCloud } from "./SaveManager";

const initialState = {
  inventory: [],
  flags: {},
  currentRoom: "garden",
  activeEvent: null,
  isPaused: false,
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
        flags: { ...state.flags, [action.flag]: !state.flags[action.flag] },
      };

    case "room_change":
      return { ...state, currentRoom: action.targetRoom };

    case "set_event":
      return { ...state, activeEvent: action.targetEvent };

    case "set_paused":
      return {
        ...state,
        isPaused: action.value,
      };

    case "load_game":
      return action.payload;

    default:
      // The dispatcher ignores visual actions like "dialogue"
      return state;
  }
}

const GameStateContext = createContext();

export function GameStateProvider({ children }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  // I really hated this
  // Having to fight react's state managment once again
  const syncStatus = useRef('BOOTING'); 

  // Initial Cloud Fetch, only runs once at component mount
  useEffect(() => {
    (async () => {
      const savedState = await loadGameFromCloud();
      
      if (savedState) {
        console.log("[GameStateContext] Cloud Save found. Transitioning to HYDRATING.");
        syncStatus.current = 'HYDRATING'; 
        dispatch({ type: "load_game", payload: savedState });
      } else {
        console.log("[GameStateContext] No cloud save. Transitioning directly to ACTIVE.");
        syncStatus.current = 'ACTIVE';
      }
    })();
  }, []);

  // Keeps track of the current state, auto-saving progress
  useEffect(() => {
    if (syncStatus.current === 'BOOTING') return;

    if (syncStatus.current === 'HYDRATING') {
      console.log("[GameStateContext] Intercepted hydration render. Activating engine.");
      syncStatus.current = 'ACTIVE'; 
      return;
    }

    (async () => {
      console.log("[GameStateContext] Auto-saving progression to cloud...");
      await saveGameToCloud(gameState);
    })();

  }, [gameState.currentRoom, gameState.inventory, gameState.flags]);

  return (
    <GameStateContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
}

export const useGameState = () => useContext(GameStateContext);
