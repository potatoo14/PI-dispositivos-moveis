import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useGameState } from "../core/GameStateContext";
import { SEQUENCES } from "../core/Content";
import DialogueView from "./DialogueView";

export default function EventManager() {
  const { gameState, dispatch } = useGameState();
  const [actionIndex, setActionIndex] = useState(0);
  const [trackedEvent, setTrackedEvent] = useState(gameState.activeEvent);

  // EventManager reset
  if (gameState.activeEvent !== trackedEvent) {
    setTrackedEvent(gameState.activeEvent);
    setActionIndex(0);
    return null;
  }

  // Se estiver pausado ou não houver evento, não renderiza nada
  if (gameState.isPaused || !gameState.activeEvent) {
    return null;
  }

  // Busca a sequência em SEQUENCES
  const eventSequence = Array.isArray(gameState.activeEvent)
    ? gameState.activeEvent
    : SEQUENCES[gameState.activeEvent];

  if (
    !eventSequence ||
    !Array.isArray(eventSequence) ||
    eventSequence.length === 0
  ) {
    console.error(
      `[EventManager] O evento "${gameState.activeEvent}" não foi encontrado.`,
    );
    return null;
  }

  const currentAction = eventSequence[actionIndex];

  if (!currentAction) return null;

  const nextAction = () => {
    if (gameState.isPaused) return;

    if (actionIndex < eventSequence.length - 1) {
      setActionIndex((prev) => prev + 1);
    } else {
      // Limpa o evento ao terminar a sequência
      dispatch({
        type: "set_event",
        targetEvent: null,
      });
    }
  };

  useEffect(() => {
    if (!currentAction || gameState.isPaused) return;

    // Ações que não são diálogo avançam sozinhas
    if (currentAction.type !== "dialogue" && currentAction.type !== "wait") {
      dispatch(currentAction); // 1. Despacha a ação (ex: mudar uma flag)
      nextAction(); // 2. Pula para o próximo passo da lista
    }
  }, [actionIndex, currentAction, gameState.isPaused]);

  if (currentAction.type === "dialogue" && currentAction.type !== "wait") {
    // Busca o ID que você definiu no Content.js
    const dialogueId = currentAction.sequence || currentAction.id;

    if (!dialogueId) {
      console.error(
        `[EventManager] Faltando 'id' ou 'sequence' em:`,
        currentAction,
      );
      return null;
    }

    return (
      <DialogueView
        key={`${gameState.activeEvent}-${actionIndex}`}
        sequenceId={dialogueId}
        onComplete={nextAction}
      />
    );
  }

  if (currentAction.type === "wait") {
    return (
      // invisible full-screen button that just advances the event when tapped
      <TouchableWithoutFeedback onPress={nextAction}>
        <View style={StyleSheet.absoluteFill} />
      </TouchableWithoutFeedback>
    );
  }

  // Retornar null é o correto para ações invisíveis.
  return null;
}
