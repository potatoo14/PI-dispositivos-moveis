import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GameStateProvider } from "../core/GameStateContext";

import MainMenuScreen from "../screens/MainMenuScreen";
import GameEngineScreen from "../screens/GameEngineScreen";
import InventoryScreen from "../screens/InventoryScreen";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <GameStateProvider>
      <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainMenu" component={MainMenuScreen} />
            <Stack.Screen name="GameEngine" component={GameEngineScreen} />
            <Stack.Screen name="Inventory" component={InventoryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </GameStateProvider>
  );
}
