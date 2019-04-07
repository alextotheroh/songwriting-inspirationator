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
    name: "timeSignatures",
    enabled: true,
    values: [
    "4/4",
    "Not 4/4"
    ]
  },

  {
    name: "instrumentToRecordFirst",
    enabled: true,
    selectsFromInstruments: true
  },

  {
    name: "instrumentToRecordSecond",
    enabled: true,
    selectsFromInstruments: true
  },

  {
    name: "instrumentToRecordThird",
    enabled: true,
    selectsFromInstruments: true
  },

  {
    name: "instrumentToRecordFourth",
    enabled: false,
    selectsFromInstruments: true
  },

  {
    name: "rhymingScheme",
    enabled: true,
    values: [
      "ABAB",
      "AABBCCDD",
      "ABBA",
      "Freeform"
    ]
  },

  {
    name: "songLength",
    enabled: true,
    values: [
      "short",
      "medium",
      "long"
    ]
  },

  {
    name: "lyricsFeel",
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
    name: "overallMusicFeel",
    enabled: true,
    values: [
      "catchy",
      "jammy/jazzy"
    ]
  },

  {
    name: "chorusFeel",
    enabled: true,
    values: [
      "loud/emotional, powerful",
      "simple and pretty, tender"
    ]
  },

  {
    name: "verseFeel",
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
    name: "numberOfSongSections",
    enabled: true,
    values: [
      "normal",
      "less",
      "more"
    ]
  },

  {
    name: "lyricalConcepts",
    enabled: false,
    values: []
  },

  {
    name: "totalInstrumentCount",
    enabled: true,
    min: 1,
    max: 8
  },

  {
    name: "guitarCount",
    enabled: true,
    min: 0,
    max: 3
  },

  {
    name: "keysCount",
    enabled: true,
    min: 0,
    max: 3
  },

  {
    name: "ambientCount",
    enabled: true,
    min: 0,
    max: 1
  },

  {
    name: "bassCount",
    enabled: true,
    min: 0,
    max: 1
  },

  {
    name: "drumsCount",
    enabled: true,
    min: 0,
    max: 2
  }

];
