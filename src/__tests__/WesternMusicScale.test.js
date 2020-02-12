import WesternMusicScale from "../backend/WesternMusicScale.js";


test('enharmonic notes are detected as such', () => {
  const westernMusicScale = new WesternMusicScale();
  const enharmonicPairs = [
    ['a#', 'bf'],
    ['b', 'cf'],
    ['c', 'b#'],
    ['c#', 'df'],
    ['e', 'ff'],
    ['f', 'e#'],
    ['f#', 'gf'],
    ['g#', 'af']
  ];

  expect(westernMusicScale.notesAreEnharmonic('g', 'g'));
  expect(westernMusicScale.notesAreEnharmonic('a#', 'a#'));
  expect(westernMusicScale.notesAreEnharmonic('cf', 'cf'));

  // for each pair, expect them to be enharmonic BOTH WAYS! index 0, 1 and index 1, 0
  for (let pair of enharmonicPairs) {
    expect(westernMusicScale.notesAreEnharmonic(pair[0], pair[1]));
    expect(westernMusicScale.notesAreEnharmonic(pair[1], pair[0]));
  }
});