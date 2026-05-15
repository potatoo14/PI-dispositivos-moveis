import React from 'react';
import { View, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ASSETS, ROOMS, ACTIONS, DIALOGUES } from './Content';

export default function SceneComponent({ sceneId, onNavigate }) {
  // Puxa os dados da sala atual da "receita"
  const data = STORY[sceneId];

  if (!room) return null;

  return (
    <ImageBackground 
      source={ASSETS.backgrounds[room.background]} 
      style={styles.full}
    >
      {/* Percorre a lista de itens interativos daquela sala específica */}
      {data.interactables.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            const intent = ACTIONS[item.action];
            
            if (intent.type === "navigate") {
              onNavigate(intent.targetRoom);
            }

            else if (intent.type == "dialogue") {
                onShowDialogue(DIALOGUES[intent.dialogueId]);
            }

          }} // Executa a navegação
          style={[styles.hitbox, { 
            left: item.x, 
            top: item.y, 
            width: item.w, 
            height: item.h,
            transform: [{ rotate: item.rotation || '0deg' }]
          }]}
        >
          <Image 
            source={ASSETS.sprites[item.img]} 
            style={styles.img} 
            resizeMode="contain" 
          />
        </TouchableOpacity>
      ))}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    full: { flex: 1 },
    hitbox: { position: 'absolute', justifyContent: 'center', alignItems: 'center' },
    img: { width: '100%', height: '100%' }
});