const nutritionState = {
  nutritionDone: 300,
  nutritionGoal: 1200,
  nutrition: []
};

export const nutritionReducer = (state = nutritionState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_MEAL': {
      newState.nutrition.push(action.meal);
      break;
    }
    case 'REMOVE_MEAL': {
      for (let i = 0; i < newState.nutrition.length; i++) {
        if (newState.nutrition[i].id == action.mealId) {
          newState.nutrition.splice(i, 1);
        }
      }
      break;
    }
    default:
      return state;
  }
  return newState;
};
