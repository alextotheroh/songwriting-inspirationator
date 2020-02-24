import ProgressionatorService from "../../backend/services/ProgressionatorService";
import WesternMusicScale from "../../backend/models/WesternMusicScale";
import Scale from "../../backend/models/Scale";

var progressionatorService = new ProgressionatorService(new WesternMusicScale())

var defaultState = {
  rootNote: 'c',
  modeName: 'Ionian',
  knownChordNames: progressionatorService.getAllChordsThatAppKnowsNamesFor().map(chord => chord.getName()),
  diatonicChordsForSelectedMode: getDiatonicChords('c', 'Ionian')
}

export default(state=defaultState, action) => {
  switch (action.type) {
      case 'changeRoot':
        return Object.assign({}, state, {
          rootNote: action.rootNote,
          diatonicChordsForSelectedMode: getDiatonicChords(action.rootNote, state.modeName)
        });
      case 'changeMode':
        return Object.assign({}, state, {
          modeName: action.modeName,
          diatonicChordsForSelectedMode: getDiatonicChords(state.rootNote, action.modeName)
        })
      default:
        return state;
  }
};

function getDiatonicChords(rootNote, modeName) {
  var scale = new Scale(rootNote, modeName);
  return scale.getDiatonicChords();
}