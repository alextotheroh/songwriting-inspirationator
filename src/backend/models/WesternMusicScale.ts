class WesternMusicScale {

  private notes: string[];

  constructor() {
    this.notes = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
  }

  // can get chords or scales
  // takes the root note and an array of intervals.
  // 2 is whole step, 1 is half step
  // ex: [2, 2, 1, 2, 2, 2, 1] is major scale
  // applies the intervals onto the root note
  getNoteCollection(root: string, intervals: number[]) {
    var indexOfRoot = -1;

    // set index to index of root note in above this.notes array
    for (var i = 0; i < this.notes.length; i++) {
      if (this.notesAreEnharmonic(this.notes[i], root)) {
        indexOfRoot = i;
      }
    }

    if (indexOfRoot == -1) {
      throw `Couldn't find root note ${root}!`;
    }

    var collection = [root];
    var currentIndex = indexOfRoot;
    for (let interval of intervals) {
      var normalizedIndex = currentIndex + interval;

      if (normalizedIndex >= this.notes.length) {
        while (normalizedIndex >= this.notes.length) {
          normalizedIndex -= this.notes.length; // wrap around
        }

      }

      collection.push(this.notes[normalizedIndex]);
      currentIndex = normalizedIndex;
    }

    return collection;
  }

  notesAreEnharmonic(n1: string, n2: string) {
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

  // given a note and a number of half-steps, returns the note that many half steps away
  // accepts negative numbers
  getInterval(note: string, interval: number): string {
    var indexOfStartingNote = null;

    for (var i = 0; i < this.notes.length; i++) {
      if (this.notes[i] === note || this.notesAreEnharmonic(note, this.notes[i])) {
        indexOfStartingNote = i;
      }
    }

    if (isNaN(indexOfStartingNote)) {
      throw "Couldn't find note";
    }

    var indexOfInterval = indexOfStartingNote + interval;

    if (indexOfInterval < 0) {
      indexOfInterval += this.notes.length;
      return this.notes[indexOfInterval];
    } else if (indexOfInterval >= this.notes.length) {
      indexOfInterval -= this.notes.length;
      return this.notes[indexOfInterval];
    } else {
      return this.notes[indexOfInterval];
    }
  }

  // given an array of notes, and assuming that the first note is the 1,
  // return an array of chord note functions
  // ex: [c, e, g] -> [1, 3, 5]
  //     [c, d#, g] -> [1, f3, 5]
  getChordStyleNoteFunctions(chordNotes: string[]): string[] {
    var asHalfStepsAwayFromRoot = []
    var noteFunctions = ['1'];

    for (var i = 1; i < chordNotes.length; i++) {
      asHalfStepsAwayFromRoot.push(this.getNumberOfHalfStepsBetweenNotes(chordNotes[0], chordNotes[i]));
    }

    const halfStepsToChordFunction: {[key: number]: string}  = {
      0: '1',
      1: 'f2',
      2: '2',
      3: 'f3',
      4: '3',
      5: 's3',
      6: 'f5',
      7: '5',
      8: 's5',
      9: '6',
      10: 'f7',
      11: '7'
    }

    for (let intervalInHalfSteps of asHalfStepsAwayFromRoot) {
      noteFunctions.push(halfStepsToChordFunction[intervalInHalfSteps])
    }

    return noteFunctions;
  }

  private getNumberOfHalfStepsBetweenNotes(n1: string, n2: string): number {
    var indexOfN1;
    var indexOfN2;

    for (var i = 0; i < this.notes.length; i++) {
      if (this.notesAreEnharmonic(this.notes[i], n1)) {
        indexOfN1 = i;
      }

      if (this.notesAreEnharmonic(this.notes[i], n2)) {
        indexOfN2 = i;
      }
    }

    if (indexOfN1 == null || indexOfN2 == null) {
      throw `couldn't find one of the notes passed to getIntervalBetweenNotes().  Notes passed were: ${n1} and ${n2}`;
    }

    var halfStepsAway = indexOfN2 - indexOfN1;

    if (halfStepsAway < 0) {
      halfStepsAway += this.notes.length;
    }

    return halfStepsAway;
    
  }
}

export default WesternMusicScale;