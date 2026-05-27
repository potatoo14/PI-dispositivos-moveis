export const ASSETS = {
  backgrounds: {
    b1: require("../../assets/backgrounds/sala_meio.png"),
    dog_house: require("../../assets/backgrounds/dog-house.png"),
    gate: require("../../assets/backgrounds/gate.png"),
    forest1: require("../../assets/backgrounds/forest1.png"),
    forest2: require("../../assets/backgrounds/forest2.jpg"),
    forest3: require("../../assets/backgrounds/forest3.jpg"),
    falling: require("../../assets/backgrounds/falling.jpg"),
    place1: require("../../assets/backgrounds/place1.jpg"),
    place2: require("../../assets/backgrounds/place2.jpg"),
    place3: require("../../assets/backgrounds/place3.jpg"),
    place4: require("../../assets/backgrounds/place4.jpg"),
    place5: require("../../assets/backgrounds/place5.png"),
    door_open: require("../../assets/backgrounds/door_open.png"),
    end: require("../../assets/backgrounds/end.png"),
  },
  sprites: {
    alice: require("../../assets/sprites/alice_def.png"),
    arrow: require("../../assets/sprites/arrow.png"),
    ibutton: require("../../assets/sprites/info_button.png"),
    table: require("../../assets/sprites/table.png"),
    key: require("../../assets/sprites/key.png"),
    door: require("../../assets/sprites/door.png"),
  },
};

export const SEQUENCES = {
  // --- Text Conversations ---
  alice_intro: [
    { speaker: "Alice", text: "Para aonde foi o coelho branco?" },
    { speaker: "Alice", text: "Eu preciso encontrá-lo!" },
  ],
  forest_dialogue1: [{ speaker: "Alice", text: "Ali está ele!!!" }],
  forest_dialogue2: [{ speaker: "Alice", text: "Entrou pela toca..." }],
  falling_dialogue: [{ speaker: "Alice", text: "AHHHHHHHH!" }],
  door_locked_dialogue: [
    { speaker: "Alice", text: "Trancada, devo procurar por uma chave..." },
  ],
  place_dialogue1: [{ speaker: "Alice", text: "Volte aqui, senhor coelho!!!" }],
  door_open_dialogue: [{ speaker: "Alice", text: "A porta foi aberta..." }],

  // --- Complex Scripted Cutscene Events (Processed sequentially by EventManager) ---
  alice_intro_event: [
    { type: "dialogue", sequence: "alice_intro" },
    { type: "set_flag", flag: "initial_dialogue" },
  ],
  forest_event: [
    { type: "room_change", targetRoom: "forest1" },
    { type: "dialogue", sequence: "forest_dialogue1" },
    { type: "room_change", targetRoom: "forest2" },
    { type: "dialogue", sequence: "forest_dialogue2" },
    { type: "room_change", targetRoom: "forest3" },
    { type: "wait" },
    { type: "room_change", targetRoom: "falling" },
    { type: "dialogue", sequence: "falling_dialogue" },
  ],
  place_event: [
    { type: "room_change", targetRoom: "place1" },
    { type: "wait" },
    { type: "room_change", targetRoom: "place2" },
    { type: "dialogue", sequence: "place_dialogue1" },
    { type: "room_change", targetRoom: "place3" },
    { type: "wait" },
    { type: "room_change", targetRoom: "place4" },
  ],
  pickup_key_event: [{ type: "set_flag", flag: "has_key" }],
  door_open_event: [
    { type: "room_change", targetRoom: "door_open" },
    { type: "dialogue", sequence: "door_open_dialogue" },
    { type: "room_change", targetRoom: "end" },
  ],
};

export const ACTIONS = {
  // Pure Room Navigation
  GO_GARDEN: { type: "move", to: "garden" },
  GO_DOGHOUSE: { type: "move", to: "dog_house" },
  GO_GATE: { type: "move", to: "gate" },

  // Basic Conversations
  TALK_ALICE_INTRO: { type: "event", id: "alice_intro_event" },
  DOG_NOTICE: { type: "dialogue", id: "alice_intro" },

  // Cutscenes & Scripted Timeline Triggers
  TRIGGER_FOREST: { type: "event", id: "forest_event" },
  TRIGGER_PLACE: { type: "event", id: "place_event" },
  PICKUP_KEY: { type: "event", id: "pickup_key_event" },

  // Dynamic Door Logic Options
  USE_DOOR_LOCKED: { type: "dialogue", id: "door_locked_dialogue" },
  USE_DOOR_UNLOCKED: { type: "event", id: "door_open_event" },
};

export const ROOMS = {
  garden: {
    background: "b1",
    interactables: [
      {
        img: "alice",
        x: "3%",
        y: "15%",
        w: "45%",
        h: "95%",
        action: "TALK_ALICE_INTRO",
        hideIfFlag: "initial_dialogue",
      },
      {
        img: "ibutton",
        x: "0%",
        y: "30%",
        w: "10%",
        h: "20%",
        action: "GO_DOGHOUSE",
        showIfFlag: "initial_dialogue",
      },
      {
        img: "ibutton",
        x: "25%",
        y: "20%",
        w: "10%",
        h: "20%",
        action: "GO_GATE",
        showIfFlag: "initial_dialogue",
      },
      {
        img: "ibutton",
        x: "90%",
        y: "40%",
        w: "10%",
        h: "20%",
        action: "TRIGGER_FOREST",
        showIfFlag: "initial_dialogue",
      },
    ],
  },
  dog_house: {
    background: "dog_house",
    scrollWidth: 1.2,
    interactables: [
      {
        img: "arrow",
        x: "85%",
        y: "50%",
        w: "20%",
        h: "20%",
        action: "GO_GARDEN",
      },
    ],
  },
  gate: {
    background: "gate",
    interactables: [
      {
        img: "arrow",
        x: "45%",
        y: "80%",
        w: "10%",
        h: "20%",
        action: "GO_GARDEN",
        rotation: "90deg",
      },
    ],
  },
  // Transitional Cutscene Rooms (No interactable hitboxes)
  forest1: { background: "forest1" },
  forest2: { background: "forest2" },
  forest3: { background: "forest3" },
  falling: {
    background: "falling",
    scrollHeight: 3,
    interactables: [
      {
        img: "arrow",
        x: "45%",
        y: "92%",
        w: "10%",
        h: "8%",
        action: "TRIGGER_PLACE",
        rotation: "90deg",
      },
    ],
  },
  place1: { background: "place1" },
  place2: { background: "place2" },
  place3: { background: "place3" },
  place4: {
    background: "place4",
    interactables: [
      {
        img: "table",
        x: "25%",
        y: "85%",
        w: "10%",
        h: "10%",
        action: "USE_DOOR_LOCKED",
      },
      {
        img: "key",
        x: "26%",
        y: "80%",
        w: "8%",
        h: "8%",
        action: "PICKUP_KEY",
        hideIfFlag: "has_key",
      },
      // Duplicate hitboxes that toggle visibility contextually based on flags
      {
        img: "door",
        x: "48%",
        y: "79%",
        w: "5%",
        h: "10%",
        action: "USE_DOOR_LOCKED",
        hideIfFlag: "has_key",
      },
      {
        img: "door",
        x: "48%",
        y: "79%",
        w: "5%",
        h: "10%",
        action: "USE_DOOR_UNLOCKED",
        showIfFlag: "has_key",
      },
    ],
  },
  door_open: { background: "door_open", interactables: [] },
  end: { background: "end", interactables: [] },
};
