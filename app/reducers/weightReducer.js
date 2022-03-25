const weightState = {
  weightDone: 300,
  weightGoal: 1200,
  weight: []
};

export const weightReducer = (state = weightState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_WEIGHT': {
      newState.weight.push(action.weight);
      break;
    }
    case 'REMOVE_PERIOD': {
      for (let i = 0; i < newState.weight.length; i++) {
        if (newState.weight[i].id == action.weightId) {
          newState.weight.splice(i, 1);
        }
      }
      break;
    }
    default:
      return state;
  }
  return newState;
};
