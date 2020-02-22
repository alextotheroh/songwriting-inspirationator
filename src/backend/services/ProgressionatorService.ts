import Chord from '../models/Chord';
import Scale from '../models/Scale';
import WesternMusicScale from '../models/WesternMusicScale';
import {chordTypes, modePatterns} from '../defaultData';

// this class holds the functions that frontend components will call, so it tries to minimize the number of calls the frontend will have to make. 
class ProgressionatorService {
  ALL_CHORDS_LIST_KEY: string = 'ALL_CHORDS_LIST_KEY';
  ALL_SCALES_LIST_KEY: string = 'ALL_SCALES_LIST_KEY';
  private westernMusicScale: WesternMusicScale;

  constructor(westernMusicScale: WesternMusicScale) {
    this.westernMusicScale = westernMusicScale;
  }

  getChordByName(name: string): Chord {
    // assumes name is passed 'root space chordType'
    var root: string = name.split(" ")[0];
    var chordType: string = name.split(" ")[1];
    var scale: Scale = new Scale(root, "Ionian");
    var degrees: string[] = chordTypes[chordType];
    return new Chord(scale.getNotes(), degrees);
  }

  getTopXSimilarChords(chord: Chord, numberToGet: number): Chord[] {
    if (localStorage.getItem(this.ALL_CHORDS_LIST_KEY) === null) {
      var allChords: Chord[] = this.getAllChordsThatAppKnowsNamesFor();
      var objectToPutInLocalStorage = [];

      for (let chord of allChords) {
        objectToPutInLocalStorage.push({'scale': chord.getScale(), 'degrees': chord.getDegrees()});
      }

      localStorage.setItem(this.ALL_CHORDS_LIST_KEY, JSON.stringify(objectToPutInLocalStorage));
    }

    var chordSimilarityScores = []
    var chordsFromLocalStorageJSON: string | null = localStorage.getItem(this.ALL_CHORDS_LIST_KEY);
    var chordsFromLocalStorage: {[key: string]: string[]}[] = chordsFromLocalStorageJSON ? JSON.parse(chordsFromLocalStorageJSON) : '';

    for (let chordJSONObj of chordsFromLocalStorage) {
      var currentChord = new Chord(chordJSONObj.scale, chordJSONObj.degrees);
      chordSimilarityScores.push( {'chordName': currentChord.getName(), 'notesInCommon': chord.numberOfNotesInCommon(currentChord)} );
    }

    chordSimilarityScores.sort(function(a, b) {
      if (a['notesInCommon'] > b['notesInCommon']) {
        return -1;
      }

      if (a['notesInCommon'] < b['notesInCommon']) {
        return 1;
      }

      return 0;
    })

    var topXSimilarChords: Chord[] = [];
    var currentIndex = 0;
    while (topXSimilarChords.length < numberToGet) {
      var currentChord = this.getChordByName(chordSimilarityScores[currentIndex]['chordName']);
      currentIndex++;
      if (chord.getNotes()[0] != currentChord.getNotes()[0]) { // we don't return chords of the same root
        topXSimilarChords.push(currentChord);
      }
    }

    return topXSimilarChords;
    
  }

  //getTopXSimilarScales(scale: Scale, numberToGet: number): Scale[] {
    
  //}

  getAllChordsThatAppKnowsNamesFor(): Chord[] {
    var chords = [];

    for (let note of this.westernMusicScale.getNotes()) {
      for (let chordType of Object.keys(chordTypes)) {
        var scale = new Scale(note, 'Ionian');
        var chord = new Chord(scale.getNotes(), chordTypes[chordType]);
        chords.push(chord);
      }
    }

    return chords;
  }

  getModeNames(): string[] {
    return Object.keys(modePatterns);
  }

  //getAllScalesThatAppKnowsNamesFor(): Scale[] {

  //}
}

export default ProgressionatorService;