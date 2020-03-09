import WesternMusicScale from "./WesternMusicScale";
import { chordTypes } from '../defaultData';

class Chord {
  private name: string;
  private chordFunction: string = 'error';
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
    this.scale = this.extendScaleByOneOctave(scale); // the notes the chord draws from
    this.degrees = degrees; // str array: the degrees of the notes in the scale to voice (ex: [1, 3, 5], [1, f3, 5], [1, 4, 5])
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
      } else if (typeof(parseInt(degree)) === 'number') {
        this.notes.push(this.getNoteAtIndex(parseInt(degree)));
      } else {
        throw `Unexpected argument passed in degrees array: ${degree}`;
      }
    }

    this.updateChordName();
    this.updateChordFunction();
  }

  // takes a 7 note scale of form ['c 4', 'd 4', 'e 4', ...]
  // double array length by adding the next octave ['c 5', 'd 5', 'e 5', ...]
  extendScaleByOneOctave(scale: string[]) {
    var extendedScale: string[] = [];
    for (let note of scale) {
      extendedScale.push(note);
    }
    for (let note of scale) {
      var noteNote = note.split(" ")[0];
      var noteOctave = parseInt(note.split(" ")[1]) + 1
      var noteOctaveUp: string = noteNote + " " + noteOctave;
      extendedScale.push(noteOctaveUp);
    }
    return extendedScale;
  }

  getNotes(): string[] {
    return this.notes;
  }

  getName(): string {
    return this.name;
  }

  getScale(): string[] {
    return this.scale;
  }

  getDegrees(): string[] {
    return this.degrees;
  }

  getFunction(): string {
    return this.chordFunction;
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

  // current data model and logic assumes that chords are built starting at the root.
  // If a chord doesn't start at the root, then it's name cannot be determined right now.
  updateChordName(): void {
    // find the intervals between each note in the chord in the root's major scale
    // (to convert to chord notation like [1, 3, 5], [1, f3, 5], etc.)
    var root = this.notes[0].split(" ")[0]
    var chordNoteIntervals: string[] = this.westernMusicScale.getChordStyleNoteFunctions(this.notes);

    for (let key of Object.keys(chordTypes)) {
      if (sameArray(chordTypes[key], chordNoteIntervals)) {
        this.name = root + ' ' + key;
        return;
      }
    }
  }

  updateChordFunction(): void {
    // this.degress[0] tells us the roman numeral
    var numeral: string;
    switch (this.degrees[0]) {
      case "1":
        numeral = "I";
        break;
      case "2":
        numeral = "II";
        break;
      case "3":
        numeral = "III";
        break;
      case "4":
        numeral = "IV";
        break;
      case "5":
        numeral = "V";
        break;
      case "6":
        numeral = "VI";
        break;
      case "7":
        numeral = "VII";
        break;
      default:
        numeral = "error"
    }

    var modifier: string = '';
    var lowerCase: boolean = false;
    if (this.name.split(" ")[1].includes("min")) { // where shes going awry
      lowerCase = true;
    }
    if (this.name.split(" ")[1].includes("dim")) {
      modifier = "dim";
    }
    if (this.name.split(" ")[1].includes("aug")) {
      modifier = "aug";
    }

    var chordFunction: string = numeral + modifier;
    if (lowerCase) {
      this.chordFunction = chordFunction.toLowerCase();
    } else {
      this.chordFunction = chordFunction;
    }
  }

  numberOfNotesInCommon(chord: Chord) {
    var count = 0;

    for (let note of chord.getNotes()) {
      if (this.notes.includes(note)) {
        count++;
      }
    }

    return count;
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