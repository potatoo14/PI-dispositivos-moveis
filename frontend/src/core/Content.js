export const ASSETS = {
  backgrounds: {
    b1: require("../../assets/backgrounds/sala_meio.png"),
    dog_house: require("../../assets/backgrounds/dog-house.png"),
  },
  sprites: {
    alice: require("../../assets/sprites/alice_def.png"),
    arrow: require("../../assets/sprites/arrow.png"),
  }
};

export const DIALOGUES = {
  alice_intro: [
    { speaker: "Alice", text: "Para aonde foi o coelho branco?" },
    { speaker: "Alice", text: "Eu preciso encontrá-lo!" }
  ]
};

export const ACTIONS = {
  TALK_ALICE: { type: "dialogue", id: "alice_intro" },
  GO_DOGHOUSE: { type: "move", to: "dog_house" },
  GO_GARDEN: { type: "move", to: "garden" },
  DOG_NOTICE: { type: "dialogue", id: "alice_intro" }
}

export const ROOMS = {
    garden: {
        background: "b1",
        interactables: [
            { img: "alice", x: "10%", y: "20%", w: "40%", h: "80%", action: "TALK_ALICE" },
            { img: "arrow", x: "85%", y: "80%", w: "10%", h: "10%", action: "GO_DOGHOUSE" }
        ]
    },
    dog_house: {
        background: "dog_house",
        interactables: [
            { img: "arrow", x: "5%", y: "80%", w: "10%", h: "10%", action: "GO_GARDEN", rotation: "180deg" },
            { img: "alice", x: "40%", y: "40%", w: "20%", h: "40%", action: "DOG_NOTICE" }
        ]
    }
};
