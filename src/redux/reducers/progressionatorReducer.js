import ProgressionatorService from "../../backend/services/ProgressionatorService";
import WesternMusicScale from "../../backend/models/WesternMusicScale";

var progressionatorService = new ProgressionatorService(new WesternMusicScale())

var defaultState = {
  rootNote: 'c',
  modeName: 'Ionian',
  knownChordNames: progressionatorService.getAllChordsThatAppKnowsNamesFor().map(chord => chord.getName())
}

export default(state=defaultState, action) => {
  switch (action.type) {
      case 'changeRoot':
        return Object.assign({}, state, {
          rootNote: action.rootNote
        });
      case 'changeMode':
        return Object.assign({}, state, {
          modeName: action.modeName
        })    
      default:
        return state;
  }
};