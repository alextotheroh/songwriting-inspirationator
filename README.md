# Songwriting Inspirationator
Generate randomized song outlines! Write songs by filling in the blanks!

### live app
https://www.songwriting-inspirationator.com/

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### deploy
move contents of `build` dir after doing `npm run build` to previously configured s3 bucket
have to invalidate cloudfront caches to see changes immediately

### favicon
GIMP project file exists in `/resources`, which can be used to make alterations to favicon

### progressionator and improvisation helperator notes
- can start with a common progression, then expand or alter it with more interesting chords
- enumerate each chord type and its function (tonic, dominant, subdominant, etc.)
- once have progression generated for a key, identify and conveniently diagram the notes that are  "good" or "interesting" to play during a chord change, which is a function of the chord and the key (either where they overlap, or the chord's notes that aren't in the scale), maybe color coded in "tiers of goodness" (some will sound more satisfying than others considering the chord being played, to my ear the chord's notes that are out of key sound particularly good)
- for each chord in the generated progression, provide a way to easily view the inversions and common substitutions, including negative harmony substitutions
- also provide easy way to view the arpeggio for a chord
- assorted "tricks" that can be used in progressions: chaining descending 5ths to get where you want to go, series of all the diminished 7ths that use the same notes (sounds cool), (2m, 2m7, 1), other turnarounds that you make up, common blues, jazz, rock, pop turnarounds, maybe find or write some "getaways" that are like the opposite of turnarounds, they don't build tension toward the tonic, but rather take you far away from home with no clear resolution path
- current hypothesis with very limited understanding of music theory: can pick any major or minor scale, which will guide generating a chord progression (long, short, medium), which will guide generating the improv "good notes" to use on chord change.
- come up with a chord function in a minor key that is unique to your style (is not used much, but you will use often)
- for each chord
- Chords in the major keys follow the pattern:     Major minor minor Major Major minor dim
- Chords in natural minor keys follow the pattern: minor dim major minor minor major major
