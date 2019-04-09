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

export var songAttributes = [

  {
    name: "Time Signatures",
    enabled: true,
    values: [
    "4/4",
    "Not 4/4"
    ],
    disabledValues: []
  },

  {
    name: "Part to Write First",
    enabled: true,
    selectsFromInstruments: true
  },

  {
    name: "Part to Write Second",
    enabled: true,
    selectsFromInstruments: true
  },

  {
    name: "Part to Write Third",
    enabled: true,
    selectsFromInstruments: true
  },

  {
    name: "Part to Write Fourth",
    enabled: false,
    selectsFromInstruments: true
  },

  {
    name: "Rhyming Scheme",
    enabled: true,
    values: [
      "ABAB",
      "AABBCCDD",
      "ABBA",
      "Freeform"
    ],
    disabledValues: []
  },

  {
    name: "Song Length",
    enabled: true,
    values: [
      "short",
      "medium",
      "long"
    ],
    disabledValues: []
  },

  {
    name: "Lyrics Feel",
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
      "focus on words sound not meaning"
    ],
    disabledValues: []
  },

  {
    name: "Overall Music Feel",
    enabled: true,
    values: [
      "catchy",
      "jammy/jazzy"
    ],
    disabledValues: []
  },

  {
    name: "Chorus Feel",
    enabled: true,
    values: [
      "loud/emotional, powerful",
      "simple and pretty, tender"
    ],
    disabledValues: []
  },

  {
    name: "Verse Feel",
    enabled: true,
    values: [
      "chill",
      "aggressive",
      "droning",
      "jammy",
      "building lots of tension"
    ],
    disabledValues: []
  },

  // verse, bridge, chorus, guitar solo, synth solo, drum solo, another guitar solo, etc.
  {
    name: "Number of Song Sections",
    enabled: true,
    values: [
      "normal",
      "less",
      "more"
    ],
    disabledValues: []
  },

  {
    name: "Lyrical Concepts",
    enabled: false,
    values: [],
    disabledValues: []
  },

  {
    name: "Guitar Count",
    enabled: true,
    countsInstrumentType: "guitar",
    min: 0,
    max: 3
  },

  {
    name: "Keys Count",
    enabled: true,
    countsInstrumentType: "keys",
    min: 0,
    max: 3
  },

  {
    name: "Ambient Count",
    enabled: true,
    countsInstrumentType: "ambient",
    min: 0,
    max: 1
  },

  {
    name: "Bass Count",
    enabled: true,
    countsInstrumentType: "bass",
    min: 0,
    max: 1
  },

  {
    name: "Drums Count",
    enabled: true,
    countsInstrumentType: "drums",
    min: 0,
    max: 2
  },

  {
    name: "Minimum Instruments Count",
    enabled: true,
    value: 3
  }

];
