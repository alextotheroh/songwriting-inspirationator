import { modePatterns } from '../defaultData';
import WesternMusicScale from './WesternMusicScale';
import Chord from './Chord';

class Scale {

  private feel: string[];
  private alternateNames: string[];
  private notes: string[];

  constructor(root: string, modeName: string) {
    var westernMusicScale = new WesternMusicScale();

    if (!(modeName in modePatterns)) {
      throw "mode name ${modeName} is not supported.";
    }

    this.feel = modePatterns[modeName].feel;
    this.alternateNames = modePatterns[modeName].alternateNames ? modePatterns[modeName].alternateNames : [];
    this.notes = westernMusicScale.getNoteCollection(root, modePatterns[modeName].intervals);
    if (this.notes.length == 8) {
      this.notes.pop();
    }
  }

  getDiatonicChords(): Chord[] {
    // return the diatonic chords (each a Chord object) for this mode
    // Chord constructor takes a name.  How do we determine the name of the chord from here?
    return [
      new Chord(this.notes, ['1', '3', '5']),
      new Chord(this.notes, ['2', '4', '6']),
      new Chord(this.notes, ['3', '5', '7']),
      new Chord(this.notes, ['4', '6', '8']),
      new Chord(this.notes, ['5', '7', '9']),
      new Chord(this.notes, ['6', '8', '10']),
      new Chord(this.notes, ['7', '9', '11'])
    ];
  }

  getNotes() {
    return this.notes;
  }

}

export default Scale;