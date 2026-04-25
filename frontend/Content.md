# How to make content for the engine

## Part 1: How the System Works (The Basics)

The engine is a "dumb" machine. It doesn't know what the story is, who the characters are, or what the puzzles are. It just reads whatever you put on the Content.js and plays it on the screen.

### The Game Loop
Everything in the game revolves around a simple cycle:
1. **Explore:** The player looks at a Room and taps an Object on the screen.
2. **Trigger:** Tapping that object tells the engine to start an **Event**.
3. **Action:** The Event gives the player an item, changes a story flag, or shows dialogue.
4. **Update:** The engine updates the world, and the player goes back to exploring.

### The "State"
To make puzzles work, the engine remembers things for you in the background. This is called the "State". The State tracks four things:
* **Current Room:** Where you are standing.
* **Active Event:** What cutscene or action is currently happening.
* **Inventory:** A list of items you are carrying (e.g., `["blue_key", "map"]`).
* **Flags:** A list of true/false switches for the story (e.g., `"door_is_unlocked": true`).

You just tell the engine to change the **State** using **Events**.

---

## Part 2: Writing `Content.js` (The Details)

Your `Content.js` file is divided into two main sections: `ASSETS` and `STORY`. 

### 1. `ASSETS` (Your Art Folder)
Before you can put an image in the game, you must register it here. Give it a short, easy-to-type nickname.

```javascript
export const ASSETS = {
  backgrounds: {
    spooky_room: require("../../assets/backgrounds/spooky.jpeg"),
  },
  sprites: {
    key_art: require("../../assets/sprites/key.jpeg"),
    hero_smile: require("../../assets/sprites/hero_smile.jpeg"),
  },
};
```

---

### 2. `STORY` (The Master Game File)
The `STORY` object holds every single room, event, and conversation in your game. 

#### A. ROOMS (What the player sees)
A Room is what the player stares at when they aren't in a conversation. It requires a background image and a list of clickable objects (Interactables).

```javascript
  start_room: {
    background: "spooky_room",
    interactables: [
      {
        id: "key_art",          // What image to show
        x: "50%", y: "50%",     // Where to put it on screen
        width: "20%", height: "20%", // How big it is
        targetEvent: "pickup_key_event", // What happens when you tap it
        
        // --- PUZZLE LOGIC (Optional) ---
        // Use these to make items appear or disappear!
        hideIfItem: "door_key",    // Hides if the player ALREADY HAS the key
        showIfItem: "treasure",    // ONLY shows up if they HAVE the treasure
        hideIfFlag: "room_dark",   // Hides if the room is dark
        showIfFlag: "lights_on",   // ONLY shows up if lights are on
      }
    ]
  },
```

#### B. EVENTS (What happens in the background)
When a player taps an object or makes a choice, it triggers an Event. An Event is a top-to-bottom list of instructions for the engine.

Here are the **only 7 actions** you can put inside an event:

**Inventory Actions:**
* `{ type: "give_item", itemId: "door_key" }` -> Puts an item in your pocket.
* `{ type: "take_item", itemId: "door_key" }` -> Destroys an item from your pocket.

**Story Flags (Booleans):**
* `{ type: "set_flag", flag: "door_unlocked" }` -> Turns a switch ON.
* `{ type: "remove_flag", flag: "door_unlocked" }` -> Turns a switch OFF.
* `{ type: "toggle_flag", flag: "flashlight_on" }` -> Flips the switch.

**Flow Actions:**
* `{ type: "room_change", targetRoom: "outside_room" }` -> Move the player to a new room.
* `{ type: "dialogue", sequence: "my_conversation" }` -> Pauses the invisible logic to show text on the screen.

```javascript
  // Example of a puzzle event:
  unlock_door_event: [
    { type: "dialogue", sequence: "unlocking_text" }, 
    { type: "take_item", itemId: "door_key" },       // The key breaks!
    { type: "set_flag", flag: "door_open" },         // The door is now open!
    { type: "room_change", targetRoom: "hallway" }   // Move to the next room!
  ],
```

#### C. DIALOGUES (What the characters say)
When an event uses `{ type: "dialogue" }`, the engine looks for a Dialogue Sequence. This is a list of text frames. The player taps the screen to read the next frame.

```javascript
  my_conversation: [
    { 
      speaker: "Hero", 
      text: "Who goes there?!",
      sprites: [{ character: "hero_smile", position: "left" }] 
    },
    { 
      speaker: "Ghost", 
      text: "Just a spooky ghost. Do you want my treasure?",
      // Choices stop the player from tapping and show buttons instead!
      choices: [
        { label: "Yes, take treasure", targetEvent: "take_treasure_event" },
        { label: "No, run away", targetEvent: "run_away_event" }
      ]
    }
  ],
```

---

### Putting it all together: A 3-Step Example
If you want to create a scenario where a player finds a key on a table and picks it up, you write exactly three things in `Content.js`:

**1. The Room (The setup)**
```javascript
  bedroom: {
    background: "bedroom_bg",
    interactables: [
      {
        id: "key_sprite",
        x: "50%", y: "50%", width: "10%", height: "10%",
        targetEvent: "found_key_event", 
        hideIfItem: "rusty_key" // Magic! The key vanishes from the table once picked up!
      }
    ]
  },
```

**2. The Event (The mechanics)**
```javascript
  found_key_event: [
    { type: "give_item", itemId: "rusty_key" }, // Gives the item instantly
    { type: "dialogue", sequence: "key_talk" }  // Triggers the text
  ],
```

**3. The Dialogue (The text)**
```javascript
  key_talk: [
    { speaker: "Hero", text: "Hey, a rusty key! This might be useful later." }
  ]
```
