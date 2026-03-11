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
  intro_event: [
    {
      speaker: "Narrador",
      text: "Agora depois de abrir a porta certa, encontraria uma outra sala, menor, com uma mesa ao meio, sem nada por cima, e logo poderia avistar uma pequena cortina baixa, abriu a cortina, e deparou-se com uma pontinha com uma maçaneta falante.",
      sprites: [
        { character: "one", position: "left" },
        { character: "two", position: "right" },
      ],
    },
    {
      speaker: "Narrador",
      text: "A porta era muito pequena, e após uma breve conversa, Alice perguntou-se como poderia passar por lá, decidiu olhar pela sala, e ao mostrar a tela da sala de novo, uma garrafa havia aparecido encima da mesa",
      sprites: [{ character: "two", position: "center" }],
      choices: [
        { label: "Yes, let's go!", targetEvent: "intro_event" },
        { label: "I'm a bit nervous.", targetEvent: "ready" },
      ],
    },
  ],
  ready: [
    {
      speaker: "Narrador",
      text: "Alice havia a altura agora para passar a portinha, porém, não havia pegado a chave na mesa, bem maior do que ela, ficou confusa até que então, em um efeito pop up, apareceria um prato com 3 biscoitos, após Alice obter os biscoitos, e interagir com o objeto, ela cresceria, assim de novo alterando o cenário da sala, com ela gigantesca e finalmente podendo pegar a chave para destrancar a porta",
      sprites: [{ character: "two", position: "center" }],
    },
  ],
  intro_room: {
    background: "doors",
    interactables: [
      {
        id: "door_key",
        x: "60%",
        y: "60%",
        width: "10%",
        height: "20%",
        onInteract: {
          type: "room_change",
          targetRoom: "idk",
        },
      },
      {
        id: "two",
        x: "30%",
        y: "30%",
        width: "10%",
        height: "20%",
        onInteract: {
          type: "dialogue",
          targetEvent: "ready",
        },
      },
    ],
  },
  idk: {
    background: "five",
    interactables: [
      {
        id: "door_key",
        x: "50%",
        y: "50%",
        width: "10%",
        height: "20%",
        onInteract: {
          type: "collect",
          itemId: "shiny_key",
          targetEvent: "key_found",
        },
        hideIfFlag: "has_key",
      },
    ],
  },
  key_found: [
    {
      text: "you found a key!",
    },
  ],
};
