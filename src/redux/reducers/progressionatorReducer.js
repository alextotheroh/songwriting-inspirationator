import ProgressionatorService from "../../backend/services/ProgressionatorService";
import WesternMusicScale from "../../backend/models/WesternMusicScale";
import Scale from "../../backend/models/Scale";

var progressionatorService = new ProgressionatorService(new WesternMusicScale())

var defaultState = {
  rootNote: 'c',
  modeName: 'Ionian',
  knownChordNames: progressionatorService.getAllChordsThatAppKnowsNamesFor().map(chord => chord.getName()),
  diatonicChordsForSelectedMode: getDiatonicChords('c', 'Ionian'),
  add7th: false,
  add9th: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'changeRoot':
      return Object.assign({}, state, {
        rootNote: action.rootNote,
        diatonicChordsForSelectedMode: getDiatonicChords(action.rootNote, state.modeName, state.add7th, state.add9th)
      });
    case 'changeMode':
      return Object.assign({}, state, {
        modeName: action.modeName,
        diatonicChordsForSelectedMode: getDiatonicChords(state.rootNote, action.modeName, state.add7th, state.add9th)
      });
    case 'changeAdd7th':
      return Object.assign({}, state, {
        add7th: action.newVal,
        diatonicChordsForSelectedMode: getDiatonicChords(state.rootNote, state.modeName, action.newVal, state.add9th)
      });
    case 'changeAdd9th':
      return Object.assign({}, state, {
        add9th: action.newVal,
        diatonicChordsForSelectedMode: getDiatonicChords(state.rootNote, state.modeName, state.add7th, action.newVal)
      });
    default:
      return state;
  }
};

function getDiatonicChords(rootNote, modeName, add7th, add9th) {
  var scale = new Scale(rootNote, modeName, add7th, add9th);
  return scale.getDiatonicChords();
}