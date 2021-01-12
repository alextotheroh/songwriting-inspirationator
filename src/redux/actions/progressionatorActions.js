export function changeRootNote(rootNote) {
  return { type: 'changeRoot', rootNote };
}

export function changeMode(modeName) {
  return { type: 'changeMode', modeName };
}

export function changeAdd7th(newVal) {
  return { type: 'changeAdd7th', newVal }
}

export function changeAdd9th(newVal) {
  return { type: 'changeAdd9th', newVal }
}

// export function changeAdd11th(newVal) {
//   return {type: 'changeAdd11th', newVal}
// }