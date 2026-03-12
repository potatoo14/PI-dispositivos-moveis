import React, { useState, useEffect } from "react";
import { useGameState } from "../core/GameStateContext";
import { STORY } from "../core/Content";

import DialogueView from "./DialogueView";

// NOTE: sanity checks crash react because of the early return
export default function EventManager() {
  const {
    activeEvent,
    setActiveEvent,
    addToInventory,
    setFlag,
    setCurrentRoom,
  } = useGameState();

  // Each event is a array, this keeps track of the index we are dealing with
  const [actionIndex, setActionIndex] = useState(0);

  // Reset to the first action whenever a new event starts
  useEffect(() => {
    setActionIndex(0);
  }, [activeEvent]);

  if (!activeEvent || !STORY[activeEvent]) {
    console.warn(`Event "${activeEvent}" not found or is null`);
    return null;
  }

  const eventSequence = STORY[activeEvent];
  const currentAction = eventSequence[actionIndex];

  if (!currentAction) {
    console.warn(`Event index "${actionIndex}" not found in "${eventSequence}"`);
    return null;
  }

  // Function to move to the next step in the event
  const nextAction = () => {
    if (actionIndex < eventSequence.length - 1) {
      setActionIndex((prev) => prev + 1);
    } else {
      setActiveEvent(null); // The event is completely finished!
    }
  };

  // --- LOGIC ACTIONS (Run automatically behind the scenes) ---
  // We use useEffect here so React doesn't get mad about updating state during a render
  useEffect(() => {
    let autoAdvance = false;

    if (currentAction.type === "give_item") {
      addToInventory(currentAction.itemId);
      autoAdvance = true;
    } else if (currentAction.type === "set_flag") {
      setFlag(currentAction.flag, true);
      autoAdvance = true;
    } else if (currentAction.type === "room_change") {
      setCurrentRoom(currentAction.targetRoom);
      autoAdvance = true;
    }

    if (autoAdvance) {
      nextAction(); // Immediately trigger the next action
    }
  }, [actionIndex, currentAction]);

  // --- VISUAL ACTIONS (Pauses the manager to wait for the player) ---
  if (currentAction.type === "dialogue") {
    return (
      <DialogueView
        sequenceId={currentAction.sequence} // should be the dialogue node name (string)
        onComplete={nextAction} // Tells dialogue to trigger the next action when done
      />
    );
  }

  return null;
}
