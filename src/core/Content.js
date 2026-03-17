export const ASSETS = {
  backgrounds: {
    b: require("../../assets/backgrounds/b.jpeg"),
    b2: require("../../assets/backgrounds/b2.jpeg"),
  },
  sprites: {
    a: require("../../assets/sprites/a.jpeg"),
    c: require("../../assets/sprites/c.jpeg"),
  },
};
export const STORY = {
  // 1. The Room
  intro_room: {
    background: "b",
    interactables: [
      {
        id: "a",
        x: "60%",
        y: "60%",
        width: "20%",
        height: "20%",
        targetEvent: "other_event",
        // hideIfFlag: "has_key",
      },
    ],
  },
  another_room: {
    background: "b2",
    interactables: [
      {
        id: "c",
        x: "30%",
        y: "30%",
        width: "20%",
        height: "20%",
        targetEvent: "something",
        showIfFlag: "has_key",
      },
    ],
  },
  something: [{ type: "dialogue", sequence: "something_dialogue" }],
  something_dialogue: [
    { text: "CHOICES!" },
    {
      text: "something else",
      choices: [
        { label: "choice 1", targetEvent: "something_event" },
        { label: "choice 2", targetEvent: "something_event2" },
      ],
    },
  ],
  something_event: [{ type: "dialogue", sequence: "something_dialogue" }],
  something_event2: [{ type: "dialogue", sequence: "something_dialogue2" }],
  something_dialogue2: [{ text: "happy ending" }],
  // 2. The Event Manager reads this top-to-bottom
  other_event: [
    { type: "room_change", targetRoom: "another_room" },
    { type: "dialogue", sequence: "found_key_talk" }, // Pauses to talk
    // { type: "give_item", itemId: "door_key" }, // Invisible logic
    { type: "set_flag", flag: "has_key" }, // Invisible logic
    { type: "dialogue", sequence: "happy_talk" }, // Pauses to talk again
  ],
  // 3. The Dialogue View reads these
  found_key_talk: [{ speaker: "Alice", text: "Oh look, a key!" }],
  happy_talk: [{ speaker: "Alice", text: "Now I can open the door!" }],
  intro_event: [{ type: "" }], // the engine requires an intro_room and intro_event to start with
};
