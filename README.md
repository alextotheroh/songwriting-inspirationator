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
