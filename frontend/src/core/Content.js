const arrowLeft = (target, x = "2%", y = "45%") => ({
  img: "arrow_left",
  targetRoom: target,
  x,
  y,
  width: "10%",
  height: "15%",
});

const arrowRight = (target, x = "88%", y = "45%") => ({
  img: "arrow_right",
  targetRoom: target,
  x,
  y,
  width: "10%",
  height: "15%",
});

const arrowUp = (target, x = "45%", y = "5%") => ({
  img: "arrow_up",
  targetRoom: target,
  x,
  y,
  width: "15%",
  height: "10%",
});

export const ASSETS = {
  backgrounds: {
    b1: require("../../assets/backgrounds/sala_meio.png"),
    dog_house: require("../../assets/backgrounds/dog-house.png"),
  },
  sprites: {
    alice: require("../../assets/sprites/alice def.png"),
    arrow_left: require("../../assets/sprites/arrow left.png"),
    arrow_right: require("../../assets/sprites/arrow right.png"),
  },
};
export const STORY = {
  intro_room: {
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
      arrowLeft("quintal_esq"),
    ],
  },

  quintal_esq: {
    background: "dog_house",
    scrollWidth: 1.4,
    interactables: [
      {
        img: "dir-direta",
        targetRoom: "intro_room",
        x: "80%",
        y: "20%",
        width: "10%",
        height: "30%",
      },
    ],
  },

  portao_norte: {},

  alice_dialogue: [{ text: "Para onde o coelho foi?" }],

  intro_event: [{ type: "dialogue", sequence: "alice_dialogue" }, { type: "set_flag", flag: "initial_dialogue"}],
};
