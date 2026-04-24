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
    alice: require("../../assets/sprites/alice def.png"),
    arrow: require("../../assets/sprites/arrow.png"),
    ibutton: require("../../assets/sprites/info_button.png"),
    table: require("../../assets/sprites/table.png"),
    key: require("../../assets/sprites/key.png"),
    door: require("../../assets/sprites/door.png"),
  },

  extra: {
    main_menu: require("../../assets/extra/main_menu.png"),
  },
  
};
export const STORY = {
  intro_room: {},
  intro_event: [
    { type: "room_change", targetRoom: "garden" },
    { type: "set_event", targetEvent: "garden_event" },
  ],
  garden_event: [
    { type: "dialogue", sequence: "alice_dialogue" },
    { type: "set_flag", flag: "initial_dialogue" },
  ],
  garden: {
    background: "b1",
    interactables: [
      {
        img: "alice",
        x: "3%",
        y: "15%",
        width: "45%",
        height: "95%",
        hideIfFlag: "initial_dialogue",
      },
      {
        img: "ibutton",
        x: "0%",
        y: "30%",
        width: "10%",
        height: "20%",
        targetRoom: "quintal_esq",
        showIfFlag: "initial_dialogue",
      },
      {
        img: "ibutton",
        x: "25%",
        y: "20%",
        width: "10%",
        height: "20%",
        targetRoom: "gate",
        showIfFlag: "initial_dialogue",
      },
      {
        img: "ibutton",
        x: "90%",
        y: "40%",
        width: "10%",
        height: "20%",
        targetEvent: "forest_event",
        showIfFlag: "initial_dialogue",
      },
    ],
  },
  alice_dialogue: [{ speaker: "Alice", text: "Para onde o coelho foi?" }],

  quintal_esq: {
    background: "dog_house",
    scrollWidth: 1.4,
    interactables: [
      {
        img: "arrow",
        x: "90%",
        y: "50%",
        width: "10%",
        height: "25%",
        targetRoom: "garden",
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
        width: "10%",
        height: "20%",
        targetRoom: "garden",
        rotation: "90deg",
      },
    ],
  },

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
  forest1: {
    background: "forest1",
  },
  forest2: {
    background: "forest2",
  },
  forest3: {
    background: "forest3",
  },
  forest_dialogue1: [{ speaker: "Alice", text: "Ali está ele!!!" }],
  forest_dialogue2: [{ speaker: "Alice", text: "Entrou pela toca..." }],

  falling: {
    background: "falling",
    scrollHeight: 5,
    interactables: [
      {
        img: "arrow",
        x: "45%",
        y: "95%",
        width: "12%",
        height: "5%",
        targetEvent: "place_event",
        rotation: "90deg",
      },
    ],
  },
  falling_dialogue: [{ speaker: "Alice", text: "AHHHHHHHH!" }],

  place_event: [
    { type: "room_change", targetRoom: "place1" },
    { type: "wait" },
    { type: "room_change", targetRoom: "place2" },
    { type: "dialogue", sequence: "place_dialogue1" },
    { type: "room_change", targetRoom: "place3" },
    { type: "wait" },
    { type: "room_change", targetRoom: "place4" },
  ],
  place1: {
    background: "place1",
  },
  place2: {
    background: "place2",
  },
  place3: {
    background: "place3",
  },
  place4: {
    background: "place4",
    interactables: [
      {
        img: "table",
        x: "25%",
        y: "85%",
        width: "10%",
        height: "10%",
      },
      {
        img: "key",
        x: "26%",
        y: "80%",
        width: "8%",
        height: "8%",
        hideIfFlag: "has_key",
        targetEvent: "pickup_key_event",
      },
      {
        img: "door",
        x: "48%",
        y: "79%",
        width: "5%",
        height: "10%",
        hideIfFlag: "has_key",
        targetDialogue: "door_locked_dialogue",
      },
      {
        img: "door",
        x: "48%",
        y: "79%",
        width: "5%",
        height: "10%",
        targetEvent: "door_open_event",
        showIfFlag: "has_key",
      },
    ],
  },
  door_locked_dialogue: [
    { speaker: "Alice", text: "Trancada, devo procurar por uma chave..." },
  ],
  pickup_key_event: [{ type: "set_flag", flag: "has_key" }],
  place5: {
    background: "place5",
  },
  place_dialogue1: [{ speaker: "Alice", text: "Volte aqui, senhor coelho!!!" }],
  place_dialogue2: [{ speaker: "Alice", text: "A porta foi aberta..." }],
  door_open_event: [
    { type: "room_change", targetRoom: "door_open" },
    { type: "dialogue", sequence: "door_open_dialogue" },
    { type: "room_change", targetRoom: "end" },
  ],
  door_open_dialogue: [{ speaker: "Alice", text: "A porta foi aberta..." }],
  door_open: {
    background: "door_open",
  },
  end: {
    background: "end",
  },
};
