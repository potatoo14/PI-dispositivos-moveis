import { GameStateProvider, useGameState } from "../core/GameStateContext";
import GameEngineScreen from "../screens/GameEngineScreen";
import MainMenuScreen from "../screens/MainMenuScreen.jsx";

function MainRouter () {
    const { gameState } = useGameState();
    if (gameState.currentScreen === "MENU"){
      return <MainMenuScreen/>;
    }
    return <GameEngineScreen/>;
}

export default function Index() {
  return (
    <GameStateProvider>
      <MainRouter/>
    </GameStateProvider>
  );
}


