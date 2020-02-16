import Scale from "../backend/Scale";

test('constructor generates expected notes for chord', () => {
  var cmajScale = new Scale('c', 'Ionian');
  var asharpMixolydianScale = new Scale('a#', 'Mixolydian');

  var chords = cmajScale.getDiatonicChords();
  expect(chords[0].getNotes()).toEqual(['c', 'e', 'g']);
  expect(chords[1].getNotes()).toEqual(['d', 'f', 'a']);
  expect(chords[2].getNotes()).toEqual(['e', 'g', 'b']);
  expect(chords[3].getNotes()).toEqual(['f', 'a', 'c']);
  expect(chords[4].getNotes()).toEqual(['g', 'b', 'd']);
  expect(chords[5].getNotes()).toEqual(['a', 'c', 'e']);
  expect(chords[6].getNotes()).toEqual(['b', 'd', 'f']);

  chords = asharpMixolydianScale.getDiatonicChords();
  expect(chords[0].getNotes()).toEqual(['a#', 'd', 'f']);
  expect(chords[1].getNotes()).toEqual(['c', 'd#', 'g']);
  expect(chords[2].getNotes()).toEqual(['d', 'f', 'g#']);
  expect(chords[3].getNotes()).toEqual(['d#', 'g', 'a#']);
  expect(chords[4].getNotes()).toEqual(['f', 'g#', 'c']);
  expect(chords[5].getNotes()).toEqual(['g', 'a#', 'd']);
  expect(chords[6].getNotes()).toEqual(['g#', 'c', 'd#']);

});