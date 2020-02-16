import { modePatterns } from './defaultData';
import WesternMusicScale from './WesternMusicScale';

class Scale {

  private feel: string;
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
  }

  /*
  // todo will allow a scale to be constructed from any ol' notes
  constructor(notes) {
    
  }*/

  playaudio() {
    // play the audio for this mode
  }

  getDiatonicChords() {
    // return the diatonic chords (each a Chord object) for this mode
    // Chord constructor takes a name.  How do we determine the name of the chord from here?
    for (let note of this.notes) {
      
    }
  }

  getNotes() {
    return this.notes;
  }

}

export default Scale;