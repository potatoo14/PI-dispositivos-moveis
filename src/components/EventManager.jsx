import React, { useState, useEffect } from "react";
import { useGameState } from "../core/GameStateContext";
import { STORY } from "../core/Content";
import DialogueView from "./DialogueView";

export default function EventManager() {
  const { gameState, dispatch } = useGameState();
  const [actionIndex, setActionIndex] = useState(0);

  useEffect(() => {
    setActionIndex(0);
  }, [gameState.activeEvent]);

  // Safely grab the sequence and action (default to empty array/null if missing)
  const eventSequence = STORY[gameState.activeEvent] || [];
  const currentAction = eventSequence[actionIndex];

  const nextAction = () => {
    if (actionIndex < eventSequence.length - 1) {
      setActionIndex((prev) => prev + 1);
    } else {
      dispatch({ type: "set_event", targetEvent: null });
    }
  };

  useEffect(() => {
    // If there's no action, do nothing
    if (!currentAction) return;

    dispatch(currentAction);

    // If it's not dialogue, advance automatically
    if (currentAction.type !== "dialogue") {
      nextAction();
    }
  }, [actionIndex, currentAction]);

  if (!eventSequence.length) {
    console.warn(`Event "${gameState.activeEvent}" not found or has zero elements`);
    return null;
  }
  if (!currentAction) {
    return null;
  }

  if (currentAction.type === "dialogue") {
    return (
      <DialogueView
        sequenceId={currentAction.sequence}
        onComplete={nextAction}
      />
    );
  }

  // Fallback for invisible logic actions
  return null;
}
