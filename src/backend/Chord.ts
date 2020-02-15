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

    for (let oneIndexedDegree of degrees) {
      //degrees are passed in 1 indexed, but our arrays are 0 indexed, so subtract 1
      var degree;
      if (oneIndexedDegree.length == 1) {
        degree = (parseInt(oneIndexedDegree) - 1) + '';
      } else if (oneIndexedDegree.length == 2) {
        degree = oneIndexedDegree[0] + (parseInt(oneIndexedDegree[1]) - 1);
      } else {
        throw "Unexpected degree string";
      }  

      if ( degree[0].indexOf('f') == 0 || degree[0].indexOf('s') == 0 ) { // if first character is a letter, then we're seeking a modified scale degree
      console.log('11111111111111');
        if (degree[0] === 'f') {
          console.log('22222222222222222');
          this.notes.push( this.westernMusicScale.getInterval(scale[degree[1]], -1) );
        } else if (degree[0] === 's') {
          console.log('33333333333333333333');
          this.notes.push( this.westernMusicScale.getInterval(scale[degree[1]], 1) );
        }
      } else if (degree.length == 1 && typeof(parseInt(degree) === 'number')) {
        console.log('44444444444444444444');
        this.notes.push(scale[parseInt(degree)]);
      } else {
        throw "Unexpected argument passed in degrees array";
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