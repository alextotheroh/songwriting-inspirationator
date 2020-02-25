import ProgressionatorService from '../backend/services/ProgressionatorService';
import WesternMusicScale from '../backend/models/WesternMusicScale';
import Chord from '../backend/models/Chord';

var progressionatorService = new ProgressionatorService(new WesternMusicScale());

test('getChordByName() works', () => {
  var cmaj = progressionatorService.getChordByName("c major");
  var fsmin = progressionatorService.getChordByName("f# minor");
  var asdim7 = progressionatorService.getChordByName("a# dim7");

  expect(cmaj.getNotes()).toEqual(['c', 'e', 'g']);
  expect(fsmin.getNotes()).toEqual(['f#', 'a', 'c#']);
});

// only tests that it doesn't throw an error, doesn't 
test('getAllChordsThatAppKnowsNamesFor() works', ()=> {
  var allChords = progressionatorService.getAllChordsThatAppKnowsNamesFor();
  expect(allChords.length).toEqual(144);
});

test('getTopXSimilarChords() works', () => {
  var similarChordsAmin5 = progressionatorService.getTopXSimilarChords(progressionatorService.getChordByName("a minor"), 5);
  var similarChordsFsaug20 = progressionatorService.getTopXSimilarChords(progressionatorService.getChordByName("f# aug"), 20);

  expect(similarChordsAmin5.map(chord => chord.getName())).toEqual(["c maj6", "f maj7", "c min6", "d 7", "d min7"]);
  expect(similarChordsFsaug20.map(chord => chord.getName())).toEqual(["d aug", "a# aug", "d# min7", "b minor", "a# maj6", "d 7", "d major", "d maj7", "d maj6", "d# minor", "d# maj7", "b min6", "d# min6", "b min7", "a# maj7", "a# major", "a# 7", "b maj7", "g minor", "g maj7"]);
});