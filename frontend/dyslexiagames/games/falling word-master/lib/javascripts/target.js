
const words = ["adult", "aeroplane", "air", "aircraft", "carrier", "airforce", "airport", "album", "alphabet", "apple", "arm", "army", "baby", "baby", "backpack", "balloon", "banana", "bank", "barbecue", "bathroom", "bathtub", "bed", "bed", "bee", "bible", "bible", "bird", "bomb", "book", "boss", "bottle", "bowl", "box", "boy", "brain", "bridge", "butterfly", "button", "cappuccino", "car", "carpet", "carrot", "cave", "chair", "chess", "board", "chief", "child", "chisel", "chocolates", "church", "church", "circle", "circus", "circus", "clock", "clown", "coffee", "comet", "compact", "disc", "compass", "computer", "crystal", "cup", "cycle", "data", "base", "desk", "diamond", "dress", "drill", "drink", "drum", "dung", "ears", "earth", "egg", "electricity", "elephant", "eraser", "explosive", "eyes", "family", "fan", "feather", "festival", "film", "finger", "fire", "floodlight", "flower", "foot", "fork", "freeway", "fruit", "fungus", "game", "garden", "gas", "gate", "gemstone", "girl", "gloves", "god", "grapes", "guitar", "hammer", "hat", "hieroglyph", "highway", "horoscope", "horse", "hose", "ice", "insect", "jet", "fighter", "junk", "kitchen", "knife", "leather", "jacket", "leg", "library", "liquid", "magnet", "man", "map", "maze", "meat", "meteor", "microscope", "milk", "milkshake", "mist", "money", "monster", "mosquito", "mouth", "nail", "navy", "necklace", "needle", "onion", "paintbrush", "pants", "parachute", "passport", "pebble", "pendulum", "pepper", "perfume", "pillow", "plane", "planet", "pocket", "potato", "printer", "prison", "pyramid", "radar", "rainbow", "record", "restaurant", "rifle", "ring", "robot", "rock", "rocket", "roof", "room", "rope", "saddle", "salt", "sandpaper", "sandwich", "satellite", "school", "ship", "shoes", "shop", "shower", "signature", "skeleton", "slave", "snail", "software", "solid", "space", "shuttle", "spectrum", "sphere", "spice", "spiral", "spoon", "spot", "light", "square", "staircase", "star", "stomach", "sun", "sunglasses", "surveyor", "swimming", "pool", "sword", "table", "tapestry", "teeth", "telescope", "television", "tennis", "racquet", "thermometer", "tiger", "toilet", "tongue", "torch", "torpedo", "train", "treadmill", "triangle", "tunnel", "typewriter", "umbrella", "vacuum", "vampire", "videotape", "vulture", "water", "weapon", "web", "wheelchair", "window", "woman", "worm"];


class Target {
  constructor() {
    this.target = words[Math.floor(Math.random() * words.length)];

    this.screenWidth = 900;
    this.x = Math.random() * (this.screenWidth - 200) + 100;
    this.y = 0;

    this.solved = false;
    this.speed = 20;
    this.paused = false;

    this.drop();

  }

  drop() {
    const fallSpeed = setInterval(() => {
      if (!this.paused) {
        this.y += 1.5;
      }
    }, this.speed);
  }

  pause() {
    this.paused = true;
  }

  unpause() {
    this.paused = false;
  }

}

export default Target;
