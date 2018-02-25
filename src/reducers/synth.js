var initialState = {
  oscillator: {
    type: "triangle"
  },
  envelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0.3,
    release: 1
  } 
}

export default(state = initialState, action) => {
  switch (action.type) {
    case 'SET_OSCILLATOR':
      // TODO
    default:
      return state;
  }
}
