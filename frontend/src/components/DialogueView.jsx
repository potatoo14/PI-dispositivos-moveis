import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DIALOGUES } from "../core/Content";

export default function DialogueView({ sequenceId, onComplete }) {
  const [lineIndex, setLineIndex] = useState(0);

  // 1. Buscamos o array de falas usando o ID que veio do EventManager
  const dialogueLines = DIALOGUES[sequenceId];

  // 2. Verificação de segurança: se 'dialogueLines' não existir, paramos aqui
  if (!dialogueLines || !Array.isArray(dialogueLines)) {
    console.error(`[DialogueView] Erro: ID "${sequenceId}" não encontrado em DIALOGUES.`);
    return null;
  }

  // 3. Só agora pegamos a linha atual, pois sabemos que 'dialogueLines' existe
  const currentLine = dialogueLines[lineIndex];

  const nextLine = () => {
    if (lineIndex < dialogueLines.length - 1) {
      setLineIndex(prev => prev + 1);
    } else {
      // Se era a última fala, avisa o EventManager para fechar a caixa
      onComplete();
    }
  };

  return (
    <TouchableOpacity 
      activeOpacity={1} 
      onPress={nextLine} 
      style={styles.overlay}
    >
      <View style={styles.dialogueBox}>
        {/* Usamos o opcional chaining ?. para evitar quebras se o objeto vier estranho */}
        <Text style={styles.speakerText}>{currentLine?.speaker || "???"}</Text>
        <Text style={styles.dialogueText}>{currentLine?.text || "..."}</Text>
        
        <View style={styles.footer}>
          <Text style={styles.continueText}>Toque para continuar</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end", // Balão fica na parte de baixo
    padding: 20,
    zIndex: 2000, // Garante que fica na frente do cenário e botões
  },
  dialogueBox: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#000",
    minHeight: 150,
  },
  speakerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E86C1",
    marginBottom: 8,
  },
  dialogueText: {
    fontSize: 18,
    lineHeight: 24,
    color: "#333",
  },
  footer: {
    marginTop: 15,
    alignItems: "flex-end",
  },
  continueText: {
    fontSize: 12,
    color: "#AAA",
    fontStyle: "italic",
  },
});