export var instruments = [
  {name: "Acoustic Guitar", type: "guitar", enabled: true},
  {name: "Electric Guitar (Clean)", type: "guitar", enabled: true},
  {name: "Electric Guitar (Overdrive/Distortion)", type: "guitar", enabled: true},
  {name: "Electric Guitar (Fuzz)", type: "guitar", enabled: true},
  {name: "Electric Guitar (Wah)", type: "guitar", enabled: true},
  {name: "Electric Guitar (Tremolo)", type: "guitar", enabled: true},
  {name: "Electric Bass", type: "bass", enabled: true},
  {name: "Organ", type: "keys", enabled: true},
  {name: "Gooey Synth", type: "keys", enabled: true},
  {name: "Aggressive Synth", type: "keys", enabled: true},
  {name: "Piano", type: "keys", enabled: true},
  {name: "Creepy/Eerie/Unsettling Sounds", type: "ambient", enabled: true},
  {name: "Pads", type: "ambient", enabled: true},
  {name: "Ride-Heavy Drums", type: "drums", enabled: true},
  {name: "Tight-Hat Drums", type: "drums", enabled: true},
  {name: "Hand Drums", type: "drums", enabled: true},
  {name: "Electronic Drum Sounds", type: "drums", enabled: true}
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
    min: 3
  }

];

export var waysToStartASong = [
  "Pick an interesting scale or mode, and build chords from it, building a progression. Don't be afraid to try inversions. Try apreggiating chords. After have chordal stuff, get a cool melody going on top of it. Don't be afraid to try this on guitar and piano.",
  "Develop a cool synth sound and create a riff/melody based on where it takes you.",
  "Develop an interesting drum beat, then write a melody that works with it",
  "Take an interesting lyric and find a melody that works perfectly with it and build from there",
  "Start with a simple, catchy chord progression and melody and make it more interesting later (synth drones, weird sounds, etc.)",
  "Develop a cool guitar sound (lots of effects) and create a riff/melody based on where it takes you"
]

export var instrumentsByFrequency = [
  {'category': 'High Frequency Percussion', 'instruments': ['claps', 'shaker', 'tambourine']},
  {'category': 'Bass', 'instruments': ['low piano', 'synth', 'bass guitar', 'organ', 'pitch-shifted guitar', 'seq/arp on deepmind']},
  {'category': 'Guitar', 'instruments': ['flanged/watery guitar', 'dirty verbed guitar', 'guitar plus octave above', 'clean yet interesting guitar', 'acoustic guitar']},
  {'category': 'Flexible Frequency', 'instruments': ['synth', 'piano', 'organ', 'sound effects', 'seq/arp on deepmind']}
]

// these are just from the A minor scale in that 5th fret position.
// can transpose based on that. 
export var basslineConfig = {
  numberOfNotesToGenerate: 4,
  notes: ["E5", "E7", "E8", "A5", "A7", "A8", "D5", "D7", "D9", "G5", "G7"]
}
