import { GameStateProvider } from "../core/GameStateContext.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GameEngineScreen from "../screens/GameEngineScreen.jsx";
import MainMenuScreen from "../screens/MainMenuScreen.jsx";

const Stack = createNativeStackNavigator();


export default function Index() {
  return (
    <GameStateProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainMenu" component={MainMenuScreen} />
          <Stack.Screen name="GameEngine" component={GameEngineScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameStateProvider>
  );
}
