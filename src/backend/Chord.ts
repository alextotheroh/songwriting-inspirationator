import WesternMusicScale from "./WesternMusicScale";

class Chord {
  private name: string;
  private scale: string[];
  private degrees: string[];
  private notes: string[];
  private westernMusicScale: WesternMusicScale;

  constructor(name: string, scale: string[], degrees: string[]) {
    this.westernMusicScale = new WesternMusicScale();
    this.name = name;
    this.scale = scale; // the notes the chord draws from
    this.degrees = degrees; // str array: the degrees of the notes in the scale to voice (ex: [1, 3, 5], [1, f3, 5], [1, s3, 5])
    this.notes = []; // the notes the chord is currently voicing

    for (let degree of degrees) {
      if (degree[0].match(/[a-z]/) ) { // if first character is a letter, then we're seeking a modified scale degree
        if (degree[0] === 'f') {
          this.notes.push( this.westernMusicScale.getInterval(scale[degree[1]], 1) );
        } else if (degree[0] === 's') {
          this.notes.push( this.westernMusicScale.getInterval(scale[degree[1]], -1) );
        }
      } else if (degree.length == 1 && parseInt(degree)) {
        this.notes.push(scale[parseInt(degree)]);
      }
    }
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