import WesternMusicScale from "./WesternMusicScale";
import { chordTypes } from '../defaultData';

class Chord {
  private name: string;
  private scale: string[];
  private degrees: string[];
  private notes: string[];
  private westernMusicScale: WesternMusicScale;

  constructor(scale: string[], degrees: string[]) {
    if (scale.length != 7) {
      throw `Chord constructor currently accepts only scales of length 7 
        (and assumes the scale wraps around).  You passed a scale of length ${scale.length}`;
    }

    this.westernMusicScale = new WesternMusicScale();
    this.scale = scale; // the notes the chord draws from
    this.degrees = degrees; // str array: the degrees of the notes in the scale to voice (ex: [1, 3, 5], [1, f3, 5], [1, s3, 5])
    this.notes = []; // the notes the chord is currently voicing
    this.name = 'unknown';

    for (let oneIndexedDegree of degrees) {
      //degrees are passed in 1 indexed, but our arrays are 0 indexed, so subtract 1
      var degree;
      if (oneIndexedDegree[0] === 'f' || oneIndexedDegree[0] === 's') {
        degree = oneIndexedDegree[0] + (parseInt(oneIndexedDegree.substring(1)) - 1);
      } else if (!isNaN(parseInt(oneIndexedDegree))) {
        degree = (parseInt(oneIndexedDegree) - 1) + '';
      } else {
        throw `Unexpected degree string ${oneIndexedDegree}`;
      }

      if ( degree[0].indexOf('f') == 0 || degree[0].indexOf('s') == 0 ) { // if first character is a letter, then we're seeking a modified scale degree
        if (degree[0] === 'f') {
          this.notes.push( this.westernMusicScale.getInterval(this.getNoteAtIndex(parseInt(degree.substring(1))), -1) );
        } else if (degree[0] === 's') {
          this.notes.push( this.westernMusicScale.getInterval(this.getNoteAtIndex(parseInt(degree.substring(1))), 1) );
        }
      } else if (typeof(parseInt(degree) === 'number')) {
        this.notes.push(this.getNoteAtIndex(parseInt(degree)));
      } else {
        throw `Unexpected argument passed in degrees array: ${degree}`;
      }
    }

    this.updateChordName();
  }

  // wraps around the this.scale array like music notes do
  getNoteAtIndex(index: number): string { 
    if (index >= this.scale.length) {
      var normalizedIndex = index;
      while (normalizedIndex >= this.scale.length) {
        normalizedIndex -= this.scale.length;
      }
      return this.scale[normalizedIndex];
    }
    return this.scale[index];
  }

  getNotes(): string[] {
    return this.notes;
  }

  getName(): string {
    return this.name;
  }

  // current data model and logic assumes that chords are built starting at the root.
  // If a chord doesn't start at the root, then it's name cannot be determined right now.
  updateChordName(): void {
    // find the intervals between each note in the chord in the root's major scale
    // (to convert to chord notation like [1, 3, 5], [1, f3, 5], etc.)
    var root = this.notes[0]
    var chordNoteIntervals: string[] = this.westernMusicScale.getChordStyleNoteFunctions(this.notes); 

    for (let key of Object.keys(chordTypes)) {
      if (sameArray(chordTypes[key], chordNoteIntervals)) {
        this.name = root + ' ' + key;
        return;
      }
    }

    console.log(`root: ${root}`)
    console.log(`this.notes: ${this.notes}`)
    console.log(`chordNoteIntervals: ${chordNoteIntervals}`)
    console.error(`No chord name found for notes: ${this.notes}`);

  }

  playAudio() {
    // play the audio for this chord
  }

}

function sameArray(a1: string[], a2: string[]): boolean {
  if (a1.length != a2.length) {
    return false;
  }

  for (var i = 0; i < a1.length; i++) {
    if (a1[i] != a2[i]) {
      return false;
    }
  }

  return true;
}

export default Chord;