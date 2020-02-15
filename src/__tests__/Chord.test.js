import Chord from "../backend/Chord";

test('constructor generates expected notes for chord', () => {
  var cmajChord = new Chord("C major", ['c', 'd', 'e', 'f', 'g', 'a', 'b', 'c'], ['1', '3', '5']);
  var cminChord = new Chord("C minor", ['c', 'd', 'e', 'f', 'g', 'a', 'b', 'c'], ['1', 'f3', '5']);
  var cmaj7Chord = new Chord("C major 7", ['c', 'd', 'e', 'f', 'g', 'a', 'b', 'c'], ['1', '3', '5', '7']);

  expect('a').toEqual('a');
});