import WesternMusicScale from "../backend/WesternMusicScale.js";

const westernMusicScale = new WesternMusicScale();

test('enharmonic notes are detected as such', () => {
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

test('getNoteCollection() works', () => {
  expect(westernMusicScale.getNoteCollection('c', [2, 2, 1, 2, 2, 2, 1])).toEqual(['c', 'd', 'e', 'f', 'g', 'a', 'b', 'c']);
  expect(westernMusicScale.getNoteCollection('d#', [4, 3])).toEqual(['d#', 'g', 'a#']);
  expect(westernMusicScale.getNoteCollection('gf', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).toEqual(['gf', 'g', 'a', 'c', 'e', 'a', 'd#', 'a#', 'f#', 'd#', 'c#', 'c', 'c']);
})