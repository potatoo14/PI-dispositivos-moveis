import React, { useState, useEffect } from "react";
import { useGameState } from "../core/GameStateContext";
import { STORY } from "../core/Content";
import DialogueView from "./DialogueView";

export default function EventManager() {
  const { gameState, dispatch } = useGameState();
  const [actionIndex, setActionIndex] = useState(0);
  const [trackedEvent, setTrackedEvent] = useState(gameState.activeEvent);

  // EventManager reset, using this instead of useEffect to avoid race condition
  if (gameState.activeEvent !== trackedEvent) {
    setTrackedEvent(gameState.activeEvent);
    setActionIndex(0);
    return null;
  }

  if (!gameState.activeEvent) {
    // This usually means the parent (GameEngineScreen) failed to unmount this component
    // when the event finished. It's safe to return null, but worth noting.
    return null;
  }

  const eventSequence = STORY[gameState.activeEvent];

  if (
    !eventSequence ||
    !Array.isArray(eventSequence) ||
    eventSequence.length === 0
  ) {
    console.error(
      `[EventManager] The event "${gameState.activeEvent}" is either missing from STORY, is not an array, or is totally empty`,
    );
    return null;
  }

  const currentAction = eventSequence[actionIndex];

  if (!currentAction) {
    console.error(
      `[EventManager] Tried to read action index ${actionIndex} in "${gameState.activeEvent}", but it doesn't exist (Sequence length is ${eventSequence.length})`,
    );
    return null;
  }

  if (!currentAction.type) {
    console.warn(
      `[EventManager] The action at index ${actionIndex} in "${gameState.activeEvent}" has no 'type' property`,
      currentAction,
    );
  }

  const nextAction = () => {
    if (actionIndex < eventSequence.length - 1) {
      setActionIndex((prev) => prev + 1);
    } else {
      dispatch({ type: "set_event", targetEvent: null });
    }
  };

  useEffect(() => {
    if (!currentAction) return;

    dispatch(currentAction);

    if (currentAction.type !== "dialogue") {
      nextAction();
    }
  }, [actionIndex, currentAction]);

  if (currentAction.type === "dialogue") {
    if (!currentAction.sequence) {
      console.error(
        `[EventManager] Dialogue action in "${gameState.activeEvent}" is missing a 'sequence' property`,
        currentAction,
      );
    }

    return (
      <DialogueView
        key={`${gameState.activeEvent}-${actionIndex}`}
        sequenceId={currentAction.sequence}
        onComplete={nextAction}
      />
    );
  }

  // These are for invisible logic actions (not Dialogue), so returning null is perfectly normal and correct.
  return null;
}
