import { GameStateProvider } from "../core/GameStateContext";
import GameEngineScreen from "../screens/GameEngineScreen";

export default function Index() {
  return (
    <GameStateProvider>
      <GameEngineScreen></GameEngineScreen>
    </GameStateProvider>
  );
}
