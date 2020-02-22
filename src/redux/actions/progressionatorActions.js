export function changeRootNote(rootNote) {
  return {type: 'changeRoot', rootNote};
}

export function changeMode(modeName) {
  return {type: 'changeMode', modeName};
}