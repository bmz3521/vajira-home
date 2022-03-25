const glucoseState = {
  glucoseDone: 300,
  glucoseGoal: 1200,
  glucose: [
    {
      id: 0,
      glucose: 100,
    }
  ],
  glucosePeriod: [
    {
      id: 0,
      period: 'Breakfast',
      measurements: [
        {
          id: 0,
          name: 'Eggs',
          calories: 300,
          quantity: '200 grams'
        },
        {
          id: 1,
          name: 'Milk',
          calories: 100,
          quantity: '200 liters'
        }
      ]
    },
    {
      id: 1,
      period: 'lunch',
      measurements: [
        {
          id: 0,
          name: 'Chicken',
          calories: 150,
          quantity: '200 grams'
        },
        {
          id: 1,
          name: 'Rice',
          calories: 300,
          quantity: '100 grams'
        }
      ]
    }
  ]
};

export const glucoseReducer = (state = glucoseState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_PERIOD': {
      newState.glucose.push(action.glucose);
      break;
    }
    case 'REMOVE_PERIOD': {
      for (let i = 0; i < newState.glucose.length; i++) {
        if (newState.glucose[i].id == action.glucoseId) {
          newState.glucose.splice(i, 1);
        }
      }
      break;
    }
    default:
      return state;
  }
  return newState;
};
