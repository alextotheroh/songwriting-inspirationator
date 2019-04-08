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
    ]
  },

  {
    name: "Instrument to Record First",
    enabled: true,
    selectsFromInstruments: true
  },

  {
    name: "Instrument to Record Second",
    enabled: true,
    selectsFromInstruments: true
  },

  {
    name: "Instrument to Record Third",
    enabled: true,
    selectsFromInstruments: true
  },

  {
    name: "Instrument to Record Fourth",
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
    ]
  },

  {
    name: "Song Length",
    enabled: true,
    values: [
      "short",
      "medium",
      "long"
    ]
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
      "freeform / emphasis on word sounds not meaning"
    ]
  },

  {
    name: "Overall Music Feel",
    enabled: true,
    values: [
      "catchy",
      "jammy/jazzy"
    ]
  },

  {
    name: "Chorus Feel",
    enabled: true,
    values: [
      "loud/emotional, powerful",
      "simple and pretty, tender"
    ]
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
    ]
  },

  // verse, bridge, chorus, guitar solo, synth solo, drum solo, another guitar solo, etc.
  {
    name: "Number of Song Sections",
    enabled: true,
    values: [
      "normal",
      "less",
      "more"
    ]
  },

  {
    name: "Lyrical Concepts",
    enabled: false,
    values: []
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
