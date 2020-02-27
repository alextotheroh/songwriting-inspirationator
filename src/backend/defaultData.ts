import {ModeObject} from './interfaces/ModeObject';

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

export var modePatterns: {[key: string]: ModeObject}  = {
  'Ionian': {
    intervals: [2, 2, 1, 2, 2, 2, 1], // 2 is whole step, 1 is half step
    feel: ['happy', 'normal', 'cliche'],
    alternateNames: ['major']
  },
  'Dorian': {
    intervals: [2, 1, 2, 2, 2, 1, 2],
    feel: ['excited', 'giddy', 'anxious'],
    alternateNames: []
  },
  'Phrygian': {
    intervals: [1, 2, 2, 2, 1, 2, 2],
    feel: ['alert', 'pessimistic', 'slightly dark'],
    alternateNames: []
  },
  'Lydian': {
    intervals: [2, 2, 2, 1, 2, 2, 1],
    feel: ['triumphant', 'eager', 'playful'],
    alternateNames: []
  },
  'Mixolydian': {
    intervals: [2, 2, 1, 2, 2, 1, 2],
    feel: ['lydian++'],
    alternateNames: []
  },
  'Aeolian': {
    intervals: [2, 1, 2, 2, 1, 2, 2],
    feel: ['sad', 'humble', 'emotional'],
    alternateNames: ['natural minor']
  },
  'Locrian': {
    intervals: [ 1, 2, 2, 1, 2, 2, 2],
    feel: ['extremely unsettled'],
    alternateNames: []
  }
};

export var chordTypes: {[key: string]: string[]} = {
  'major': ['1', '3', '5'], 
  'minor': ['1', 'f3', '5'], 
  '7': ['1', '3', '5', 'f7'], 
  'maj7': ['1', '3', '5', '7'], 
  'min7': ['1', 'f3', '5', 'f7'], 
  'dim7': ['1', 'f3', 'f5', '6'],
  'aug': ['1', '3', 's5'], 
  'dim': ['1', 'f3', 'f5'],
  'maj6': ['1', '3', '5', '6'],
  'min6': ['1', 'f3', '5', '6'],
  'sus2': ['1', '2', '5'],
  'sus4': ['1', '4', '5']
}

// NOTE this was a first attempt at storing chord names and their notes.
// Now rolling with strategy of storing chord types (major, minor, etc)
// and figuring out the chord name based on the root note, and the intervals between the notes
// only contains chords that start at root
// inversions (etc.) cannot be looked up here, and must get
// their name set in a different way todo
export var chords = {
  'A': ['a', 'c#', 'e'],
  'A minor': ['a', 'c', 'e'],
  'A7': ['a', 'c#', 'e', 'g'],
  'A maj7': ['a', 'c#', 'e', 'g#'],
  'A min7': ['a', 'c', 'e', 'g'],
  'A aug': ['a', 'c#', 'e#'],
  'A dim': ['a', 'c', 'd#'],
  'B': ['b', 'd#', 'f#'],
  'B minor': ['b', 'd', 'f#'],
  'B7': ['b', 'd#', 'f#', 'a'],
  'B maj7': ['b', 'd#', 'f#', 'a#'],
  'B min7': ['b', 'd', 'f#', 'a'],
  'B aug': ['b', 'd#', 'g'],
  'B dim': ['b', 'd', 'f'],
  'C': ['c', 'e', 'g'],
  'C minor': ['c', 'd#', 'g'],
  'C7': ['c', 'e', 'g', 'a#'],
  'C maj7': ['c', 'e', 'g', 'b'],
  'C min7': ['c', 'd#', 'g', 'a#'],
  'C aug': ['c', 'e', 'g#'],
  'C dim': ['c', 'd#', 'f#'],
  'D': ['d', 'f#', 'a'],
  'D minor': ['d', 'f', 'a'],
  'D7': ['d', 'f#', 'a', 'c'],
  'D maj7': ['d', 'f#', 'a', 'c#'],
  'D min7': ['d', 'f', 'a', 'c'],
  'D aug': ['d', 'f#', 'a#'],
  'D dim': ['d', 'f', 'g#'],
  'E': ['e', 'g#', 'b'],
  'E minor': ['e', 'g', 'b'],
  'E7': ['e', 'g#', 'b', 'd'],
  'E maj7': ['e', 'g#', 'b', 'd#'],
  'E min7': ['e', 'g', 'b', 'd'],
  'E aug': ['e', 'g#', 'c'],
  'E dim': ['e', 'g', 'a#'],
  'F': ['f', 'a', 'c'],
  'F minor': ['f', 'g#', 'c'],
  'F7': ['f', 'a', 'c', 'd#'],
  'F maj7': ['f', 'a', 'c', 'e'],
  'F min7': ['f', 'g#', 'c', 'd#'],
  'F aug': ['f', 'a', 'c#'],
  'F dim': ['f', 'g#', 'b'],
  'F# min7': ['f#', 'a', 'c#', 'e'],
  'G': ['g', 'b', 'd'],
  'G minor': ['g', 'a#', 'd'],
  'G7': ['g', 'b', 'd', 'f'],
  'G maj7': ['g', 'b', 'd', 'f#'],
  'G min7': ['g', 'a#', 'd', 'f'],
  'G aug': ['g', 'b', 'd#'],
  'G dim': ['g', 'a#', 'c#']
}
