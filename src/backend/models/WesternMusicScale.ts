export default class WesternMusicScale {

  private notes: string[];

  constructor() {
    this.notes = ['c 4', 'c# 4', 'd 4', 'd# 4', 'e 4', 'f 4', 'f# 4', 'g 4', 'g# 4', 'a 4', 'a# 4', 'b 4', 'c 5', 'c# 5', 'd 5', 'd# 5', 'e 5', 'f 5', 'f# 5', 'g 5', 'g# 5', 'a 5', 'a# 5', 'b 5', 'c 6', 'c# 6', 'd 6', 'd# 6', 'e 6', 'f 6', 'f# 6', 'g 6', 'g# 6', 'a 6', 'a# 6', 'b 6'];
  }

  getNotes(): string[] {
    return this.notes;
  }

  // can get chords or scales
  // takes the root note and an array of intervals.
  // 2 is whole step, 1 is half step
  // ex: [2, 2, 1, 2, 2, 2, 1] is major scale
  // applies the intervals onto the root note
  getNoteCollection(root: string, intervals: number[]) {
    // add octave number if doesn't exist
    if (root.split(" ").length < 2) {
      root += " 4";
    }
    var indexOfRoot = -1;

    // set index to index of root note in above this.notes array
    for (var i = 0; i < this.notes.length; i++) {
      if (this.notesAreEnharmonic(this.notes[i], root)) {
        indexOfRoot = i;
        break;
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

  // ignores octave right now- only cares about note!
  // That is unexpected!
  // ex: c4 is enharmonic to b# 1, because this function discards the octave number
  notesAreEnharmonic(n1: string, n2: string) {
    const notesToEnharmonics: {[key: string]: Set<string>} = {
      'c 4': new Set(['b# 3']), 
      'c# 4': new Set(['df 4']), 
      'd 4': new Set([]), 
      'd# 4': new Set(['ef 4']), 
      'e 4': new Set(['ff 4']), 
      'f 4': new Set(['e# 4']), 
      'f# 4': new Set(['gf 4']), 
      'g 4': new Set([]), 
      'g# 4': new Set(['af 4']), 
      'a 4': new Set([]), 
      'a# 4': new Set(['bf 4']), 
      'b 4': new Set(['cf 5']),
      'c 5': new Set(['b# 4']), 
      'c# 5': new Set(['df 5']), 
      'd 5': new Set([]), 
      'd# 5': new Set(['ef 5']), 
      'e 5': new Set(['ff 5']), 
      'f 5': new Set(['e# 5']), 
      'f# 5': new Set(['gf 5']), 
      'g 5': new Set([]), 
      'g# 5': new Set(['af 5']), 
      'a 5': new Set([]), 
      'a# 5': new Set(['bf 5']), 
      'b 5': new Set(['cf 6']),
      'c 6': new Set(['b# 5']), 
      'c# 6': new Set(['df 6']), 
      'd 6': new Set([]), 
      'd# 6': new Set(['ef 6']), 
      'e 6': new Set(['ff 6']), 
      'f 6': new Set(['e# 6']), 
      'f# 6': new Set(['gf 6']), 
      'g 6': new Set([]), 
      'g# 6': new Set(['af 6']), 
      'a 6': new Set([]), 
      'a# 6': new Set(['bf 6']), 
      'b 6': new Set(['cf 7'])
    }

    return (n1 === n2) || 
      ( (n1 in notesToEnharmonics && notesToEnharmonics[n1].has(n2)) ) ||
      ( (n2 in notesToEnharmonics && notesToEnharmonics[n2].has(n1)) );
  }

  // given a note and a number of half-steps, returns the note that many half steps away
  // accepts negative numbers
  getInterval(note: string, interval: number): string {
    var indexOfStartingNote: number = -1;

    for (var i = 0; i < this.notes.length; i++) {
      if (this.notes[i] === note || this.notesAreEnharmonic(note, this.notes[i])) {
        indexOfStartingNote = i;
      }
    }

    if (indexOfStartingNote < 0) {
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
      5: '4',
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
      throw `couldn't find one of the notes passed to getNumberOfHalfStepsBetweenNotes().  Notes passed were: ${n1} and ${n2}`;
    }

    var halfStepsAway = indexOfN2 - indexOfN1;

    if (halfStepsAway < 0) {
      halfStepsAway += this.notes.length;
    }

    return halfStepsAway;
    
  }
}
