class WesternMusicScale {

  constructor() {
    this.notes = 'c, c#, d, d#, e, f, f#, g, g#, a, a#, b';
  }

  // can get chords or scales
  // takes the root note and an array of intervals.
  // 2 is whole step, 1 is half step
  // ex: [2, 2, 1, 2, 2, 2, 1] is major scale
  // applies the intervals onto the root note
  getNoteCollection(root, intervals) {
    var indexOfRoot = -1;

    // set index to index of root note in above this.notes array
    for (var i = 0; i < this.notes.length; i++) {
      if (this.notesAreEnharmonic(this.notes[i], root)) {
        indexOfRoot = i;
      }
    }

    if (currentIndex == -1) {
      throw `Couldn't find root note ${root}!`;
    }
  }

  notesAreEnharmonic(n1, n2) {
    const notesToEnharmonics = {
      'c': new Set(['b#']), 
      'c#': new Set(['df']), 
      'd': new Set([]), 
      'd#': new Set(['ef']), 
      'e': new Set(['ff']), 
      'f': new Set(['e#']), 
      'f#': new Set(['gf']), 
      'g': new Set([]), 
      'g#': new Set(['af']), 
      'a': new Set([]), 
      'a#': new Set(['bf']), 
      'b': new Set(['cf'])
    }

    return (n1 === n2) || 
      ( (n1 in notesToEnharmonics && notesToEnharmonics[n1].has(n2)) ) ||
      ( (n2 in notesToEnharmonics && notesToEnharmonics[n2].has(n1)) );
  }
}

export default WesternMusicScale;