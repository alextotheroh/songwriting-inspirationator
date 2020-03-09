import ProgressionatorService from "../../backend/services/ProgressionatorService";
import WesternMusicScale from "../../backend/models/WesternMusicScale";
import Scale from "../../backend/models/Scale";

var progressionatorService = new ProgressionatorService(new WesternMusicScale())

var defaultState = {
  rootNote: 'c',
  modeName: 'Ionian',
  knownChordNames: progressionatorService.getAllChordsThatAppKnowsNamesFor().map(chord => chord.getName()),
  diatonicChordsForSelectedMode: getDiatonicChords('c', 'Ionian'),
  extendChords: false
}

export default(state=defaultState, action) => {
  switch (action.type) {
      case 'changeRoot':
        return Object.assign({}, state, {
          rootNote: action.rootNote,
          diatonicChordsForSelectedMode: getDiatonicChords(action.rootNote, state.modeName, state.extendChords)
        });
      case 'changeMode':
        return Object.assign({}, state, {
          modeName: action.modeName,
          diatonicChordsForSelectedMode: getDiatonicChords(state.rootNote, action.modeName, state.extendChords)
        });
      case 'changeExtendChords':
        return Object.assign({}, state, {
          extendChords: action.newVal,
          diatonicChordsForSelectedMode: getDiatonicChords(state.rootNote, state.modeName, action.newVal)
        });
      default:
        return state;
  }
};

function getDiatonicChords(rootNote, modeName, extendChords) {
  var scale = new Scale(rootNote, modeName, extendChords);
  return scale.getDiatonicChords();
}