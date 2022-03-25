const pressureState = {
  pressureDone: 300,
  pressureGoal: 1200,
  pressure: []
};

export const pressureReducer = (state = pressureState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_PRESSURE': {
      newState.pressure.push(action.pressure);
      break;
    }
    case 'REMOVE_PERIOD': {
      for (let i = 0; i < newState.pressure.length; i++) {
        if (newState.pressure[i].id == action.pressureId) {
          newState.pressure.splice(i, 1);
        }
      }
      break;
    }
    default:
      return state;
  }
  return newState;
};
