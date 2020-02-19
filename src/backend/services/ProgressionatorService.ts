import Chord from '../models/Chord';
import Scale from '../models/Scale';
import WesternMusicScale from '../models/WesternMusicScale';

// this class holds the functions that frontend components will call, so it tries to minimize the number of calls the frontend will have to make. 
class ProgressionatorService {
  private westernMusicScale: WesternMusicScale;

  constructor(westernMusicScale: WesternMusicScale) {
    this.westernMusicScale = westernMusicScale;
  }

  getTopXSimilarChords(chord: Chord, numberToGet: number) {
    
  }

  getTopXSimilarScales(scale: Scale, numberToGet: number) {

  }
}

export default ProgressionatorService;