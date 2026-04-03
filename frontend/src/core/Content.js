const arrowLeft = (target, x = "2%", y = "45%") => ({
  id: "arrow_left", 
  targetRoom: target,
  x, y,
  width: "10%",
  height: "15%",
});

const arrowRight = (target, x = "88%", y = "45%") => ({
  id: "arrow_right",
  targetRoom: target,
  x, y,
  width: "10%",
  height: "15%",
});

const arrowUp = (target, x = "45%", y = "5%") => ({
  id: "arrow_up",
  targetRoom: target,
  x, y,
  width: "15%",
  height: "10%",
});

export const ASSETS = {
  backgrounds: {
    b1: require("../../assets/backgrounds/background(1).png"),
    dog_house: require("../../assets/backgrounds/dog-house.png"),
  },
  sprites: {
    alice: require("../../assets/sprites/alice def.png"),
    arrow_left: require("../../assets/sprites/arrow left.png"),
    arrow_right: require("../../assets/sprites/arrow right.png"),
  },
};
export const STORY = {
  // 1. The Room
  intro_room: {
    background: "b1",
    interactables: [
      {
        id: "alice",
        x: "3%",
        y: "15%",
        width: "45%",
        height: "95%",
        targetEvent: "alice_dialogue_event",
      },
      //Seta esquerda
      arrowLeft("quintal_esq"),
    ],
  },

  quintal_esq:  {
      background: "dog_house",
      interactables: [
        {
        id: "dir-direta",
        targetRoom: 'intro_room',
        x: "80%",
        y: "20%",
        width: "10%",
        height: "30%"
        }
      ],
  },

  portao_norte: {

  },
  
  alice_dialogue_event: [
    { type: "dialogue", sequence: "alice_dialogue"},
  ],

  alice_dialogue: [
    {text: "Para onde o coelho foi?"},
  ],

  intro_event: [
  { type: "room_change", targetRoom: "intro_room" },
],
};
