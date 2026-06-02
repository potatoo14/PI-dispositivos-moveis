import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api'; // Change to your local IP if testing on a physical device
const TOKEN_KEY = '@game_token';

const getValidToken = async () => {
  let token = await AsyncStorage.getItem(TOKEN_KEY);

  if (!token) {
    try {
      const response = await fetch(`${API_URL}/init-device`, { method: 'POST' });
      const data = await response.json();
      token = data.token;
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error("[SaveManager] Failed to initialize device:", error);
      return null;
    }
  }
  return token;
};

export const saveGameToCloud = async (gameState) => {
  const token = await getValidToken();
  if (!token) return false;

  try {
    const response = await fetch(`${API_URL}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ gameState })
    });
    
    return response.ok;
  } catch (error) {
    console.error("[SaveManager] Failed to save game:", error);
    return false;
  }
};

export const loadGameFromCloud = async () => {
  const token = await getValidToken();
  if (!token) return null;

  try {
    const response = await fetch(`${API_URL}/load`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.gameState; // Returns the raw state object
    } else {
      console.log("[SaveManager] No save found or error loading.");
      return null;
    }
  } catch (error) {
    console.error("[SaveManager] Failed to fetch save:", error);
    return null;
  }
};
