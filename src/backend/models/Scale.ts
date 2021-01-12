import { modePatterns } from '../defaultData';
import WesternMusicScale from './WesternMusicScale';
import Chord from './Chord';

class Scale {

  private feel: string[];
  private alternateNames: string[];
  private notes: string[];
  private add7th: boolean;
  private add9th: boolean;

  constructor(root: string, modeName: string, add7th: boolean, add9th: boolean) {
    var westernMusicScale = new WesternMusicScale();

    if (!(modeName in modePatterns)) {
      throw "mode name ${modeName} is not supported.";
    }

    this.feel = modePatterns[modeName].feel;
    this.alternateNames = modePatterns[modeName].alternateNames ? modePatterns[modeName].alternateNames : [];
    this.notes = westernMusicScale.getNoteCollection(root, modePatterns[modeName].intervals);
    this.add7th = add7th;
    this.add9th = add9th;
    if (this.notes.length == 8) {
      this.notes.pop();
    }
  }

  getDiatonicChords(): Chord[] {
    // return the diatonic chords (each a Chord object) for this mode
    // Chord constructor takes a name.  How do we determine the name of the chord from here?
    var chordNotesCollection = [
      ['1', '3', '5'],
      ['2', '4', '6'],
      ['3', '5', '7'],
      ['4', '6', '8'],
      ['5', '7', '9'],
      ['6', '8', '10'],
      ['7', '9', '11']
    ];

    if (this.add7th) {
      for (var i = 0; i < chordNotesCollection.length; i++) {
        chordNotesCollection[i].push('' + (i + 7));
      }
    }

    if (this.add9th) {
      for (var i = 0; i < chordNotesCollection.length; i++) {
        chordNotesCollection[i].push('' + (i + 9));
      }
    }

    return chordNotesCollection.map(chordNotes => {
      return new Chord(this.notes, chordNotes)
    });

    // return [
    //   new Chord(this.notes, ['1', '3', '5']),
    //   new Chord(this.notes, ['2', '4', '6']),
    //   new Chord(this.notes, ['3', '5', '7']),
    //   new Chord(this.notes, ['4', '6', '8']),
    //   new Chord(this.notes, ['5', '7', '9']),
    //   new Chord(this.notes, ['6', '8', '10']),
    //   new Chord(this.notes, ['7', '9', '11'])
    // ];
  }

  getNotes() {
    return this.notes;
  }

}

export default Scale;