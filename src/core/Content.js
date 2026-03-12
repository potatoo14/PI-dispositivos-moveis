export const ASSETS = {
  backgrounds: {
    doors: require("../../assets/backgrounds/doors.jpeg"),
    five: require("../../assets/backgrounds/5.png"),
  },
  sprites: {
    one: require("../../assets/sprites/where-is-my-plushie-woman.webp"),
    two: require("../../assets/sprites/ultraviolet.jpg"),
    door_key: require("../../assets/sprites/unnamed.webp"),
  },
};
export const STORY = {
  // 1. The Room
  intro_room: {
    background: "doors",
    interactables: [
      {
        id: "door_key",
        x: "60%",
        y: "60%",
        width: "10%",
        height: "20%",
        targetEvent: "pickup_key_event",
        hideIfFlag: "has_key",
      },
    ],
  },
  // 2. The Event Manager reads this top-to-bottom
  pickup_key_event: [
    { type: "dialogue", sequence: "found_key_talk" }, // Pauses to talk
    { type: "give_item", itemId: "door_key" }, // Invisible logic
    { type: "set_flag", flag: "has_key" }, // Invisible logic
    { type: "dialogue", sequence: "happy_talk" }, // Pauses to talk again
  ],
  // 3. The Dialogue View reads these
  found_key_talk: [{ speaker: "Alice", text: "Oh look, a key!" }],
  happy_talk: [{ speaker: "Alice", text: "Now I can open the door!" }],
  intro_event: [{}], // the engine requires an intro_room and intro_event to start with
};
