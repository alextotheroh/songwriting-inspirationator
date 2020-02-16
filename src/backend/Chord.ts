import WesternMusicScale from "./WesternMusicScale";

class Chord {
  private name: string;
  private scale: string[];
  private degrees: string[];
  private notes: string[];
  private westernMusicScale: WesternMusicScale;

  constructor(name: string, scale: string[], degrees: string[]) {
    if (scale.length != 7) {
      throw `Chord constructor currently accepts only scales of length 7 
        (and assumes the scale wraps around).  You passed a scale of length ${scale.length}`;
    }

    this.westernMusicScale = new WesternMusicScale();
    this.name = name;
    this.scale = scale; // the notes the chord draws from
    this.degrees = degrees; // str array: the degrees of the notes in the scale to voice (ex: [1, 3, 5], [1, f3, 5], [1, s3, 5])
    this.notes = []; // the notes the chord is currently voicing

    for (let oneIndexedDegree of degrees) {
      //degrees are passed in 1 indexed, but our arrays are 0 indexed, so subtract 1
      var degree;
      if (oneIndexedDegree[0] === 'f' || oneIndexedDegree[0] === 's') {
        degree = oneIndexedDegree[0] + (parseInt(oneIndexedDegree.substring(1)) - 1);
      } else if (!isNaN(parseInt(oneIndexedDegree))) {
        degree = (parseInt(oneIndexedDegree) - 1) + '';
      } else {
        throw "Unexpected degree string";
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

  playAudio() {
    // play the audio for this chord
  }

}

export default Chord;