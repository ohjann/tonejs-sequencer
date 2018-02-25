var initialState = {
  playing: false
}

export default(state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_PLAYING':
      return Object.assign({}, state, {
        playing: !state.playing
      });
    default:
      return state;
  }
}
