import Chord from "../backend/Chord";

test('constructor generates expected notes for chord', () => {
  var cmajChord = new Chord(['c', 'd', 'e', 'f', 'g', 'a', 'b'], ['1', '3', '5']);
  var cminChord = new Chord(['c', 'd', 'e', 'f', 'g', 'a', 'b'], ['1', 'f3', '5']);
  var cmaj7Chord = new Chord(['c', 'd', 'e', 'f', 'g', 'a', 'b'], ['1', '3', '5', '7']);
  var fsmin7Chord = new Chord(['f#', 'g#', 'a', 'b', 'c#', 'd', 'e'], ['1', '3', '5', '7']);
  var cdom7Chord = new Chord(['c', 'd', 'e', 'f', 'g', 'a', 'b'], ['1', '3', '5', 'f7']);
  var sixthChordOfCmaj = new Chord(['c', 'd', 'e', 'f', 'g', 'a', 'b'], ['6', '8', '10']);
  var crazyChord = new Chord(['c', 'd', 'e', 'f', 'g', 'a', 'b'], ['16', 'f18', 'f20', '22', '24']);

  expect(cmajChord.getNotes()).toEqual(['c', 'e', 'g']);
  expect(cmajChord.getName()).toEqual('c major');
  expect(cminChord.getNotes()).toEqual(['c', 'd#', 'g']);
  expect(cminChord.getName()).toEqual('c minor');
  expect(cmaj7Chord.getNotes()).toEqual(['c', 'e', 'g', 'b']);
  expect(cmaj7Chord.getName()).toEqual('c maj7');
  expect(fsmin7Chord.getNotes()).toEqual(['f#', 'a', 'c#', 'e']);
  expect(fsmin7Chord.getName()).toEqual('f# min7');
  expect(cdom7Chord.getNotes()).toEqual(['c', 'e', 'g', 'a#']);
  expect(cdom7Chord.getName()).toEqual('c 7');
  expect(sixthChordOfCmaj.getNotes()).toEqual(['a', 'c', 'e']);
  expect(sixthChordOfCmaj.getName()).toEqual('a minor');
  expect(crazyChord.getNotes()).toEqual(['d', 'e', 'g#', 'c', 'e']);
  expect(crazyChord.getName()).toEqual('unknown');
});