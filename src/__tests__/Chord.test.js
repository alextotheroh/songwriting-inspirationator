import Chord from "../backend/Chord";

test('constructor generates expected notes for chord', () => {
  var cmajChord = new Chord("C major", ['c', 'd', 'e', 'f', 'g', 'a', 'b'], ['1', '3', '5']);
  var cminChord = new Chord("C minor", ['c', 'd', 'e', 'f', 'g', 'a', 'b'], ['1', 'f3', '5']);
  var cmaj7Chord = new Chord("C major 7", ['c', 'd', 'e', 'f', 'g', 'a', 'b'], ['1', '3', '5', '7']);
  var fsmin7Chord = new Chord("F# minor 7", ['f#', 'g#', 'a', 'b', 'c#', 'd', 'e'], ['1', '3', '5', '7']);
  var cdom7Chord = new Chord("C dom 7", ['c', 'd', 'e', 'f', 'g', 'a', 'b'], ['1', '3', '5', 'f7']);
  var sixthChordOfCmaj = new Chord("C major", ['c', 'd', 'e', 'f', 'g', 'a', 'b'], ['6', '8', '10']);
  var crazyChord = new Chord("who knows", ['c', 'd', 'e', 'f', 'g', 'a', 'b'], ['16', 'f18', 'f20', '22', '24']);

  expect(cmajChord.getNotes()).toEqual(['c', 'e', 'g']);
  expect(cminChord.getNotes()).toEqual(['c', 'd#', 'g']);
  expect(cmaj7Chord.getNotes()).toEqual(['c', 'e', 'g', 'b']);
  expect(fsmin7Chord.getNotes()).toEqual(['f#', 'a', 'c#', 'e']);
  expect(cdom7Chord.getNotes()).toEqual(['c', 'e', 'g', 'a#']);
  expect(sixthChordOfCmaj.getNotes()).toEqual(['a', 'c', 'e']);
  expect(crazyChord.getNotes()).toEqual(['d', 'e', 'g#', 'c', 'e']);
});