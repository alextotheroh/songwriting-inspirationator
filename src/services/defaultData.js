export var instruments = [
  {name: "Acoustic Guitar", type: "guitar"},
  {name: "Electric Guitar (Clean)", type: "guitar"},
  {name: "Electric Guitar (Overdrive/Distortion)", type: "guitar"},
  {name: "Electric Guitar (Fuzz)", type: "guitar"},
  {name: "Electric Guitar (Wah)", type: "guitar"},
  {name: "Electric Guitar (Tremolo)", type: "guitar"},
  {name: "Electric Bass", type: "bass"},
  {name: "Organ", type: "keys"},
  {name: "Gooey Synth", type: "keys"},
  {name: "Aggressive Synth", type: "keys"},
  {name: "Piano", type: "keys"},
  {name: "Creepy/Eerie/Unsettling Sounds", type: "ambient"},
  {name: "Pads", type: "ambient"},
  {name: "Ride-Heavy Drums", type: "drums"},
  {name: "Tight-Hat Drums", type: "drums"},
  {name: "Hand Drums", type: "drums"}
];

export var songAttributes = {

  timeSignatures: {
    enabled: true,
    values: [
    "4/4",
    "Not 4/4"
  ]},

  instrumentToRecordFirst: {
    enabled: true
  },

  instrumentToRecordSecond: {
    enabled: true
  },

  instrumentToRecordThird: {
    enabled: true
  },

  instrumentToRecordFourth: {
    enabled: false
  },

  rhymingScheme: {
    enabled: true,
    values: [
      "ABAB",
      "AABBCCDD",
      "ABBA",
      "Freeform"
    ]
  },

  songLength: {
    enabled: true,
    values: [
      "short",
      "medium",
      "long"
    ]
  },

  lyricsFeel: {
    enabled: true,
    values: [
      "uplifting",
      "pensive",
      "angry",
      "gritty",
      "playful/silly",
      "serenity",
      "joy",
      "ecstasy",
      "fear",
      "amazement",
      "rage",
      "freeform / emphasis on word sounds not meaning"
    ]
  },

  overallMusicFeel: {
    enabled: true,
    values: [
      "catchy",
      "jammy/jazzy"
    ]
  },

  chorusFeel: {
    enabled: true,
    values: [
      "loud/emotional, powerful",
      "simple and pretty, tender"
    ]
  },

  verseFeel: {
    enabled: true,
    values: [
      "chill",
      "aggressive",
      "droning",
      "jammy",
      "building lots of tension"
    ]
  },

  // verse, bridge, chorus, guitar solo, synth solo, drum solo, another guitar solo, etc.
  numberOfSongSections: {
    enabled: true,
    values: [
      "normal",
      "less",
      "more"
    ]
  },

  lyricalConcepts: {
    enabled: false,
    values: []
  },

  totalInstrumentCount: {
    enabled: true,
    min: 1,
    max: 8
  },

  guitarCount: {
    enabled: true,
    min: 0,
    max: 3
  },

  keysCount: {
    enabled: true,
    min: 0,
    max: 3
  },

  ambientCount: {
    enabled: true,
    min: 0,
    max: 1
  },

  bassCount: {
    enabled: true,
    min: 0,
    max: 1
  },

  bassCount: {
    enabled: true,
    min: 0,
    max: 2
  }

};
