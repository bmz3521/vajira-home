const diaryState = {
  diaryDone: 0,
  diaryGoal: 0,
  diaryPeriod: []
};

function nextDiaryId(diaries) {
  const maxId = diaries.reduce((maxId, diary) => Math.max(diary.id, maxId), -1)
  return maxId + 1
}

export const diaryReducer = (state = diaryState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_DIARY': {
      console.log("action");
      console.log(nextDiaryId(state.diaryPeriod));

      console.log(action.diary);
      newState.diaryPeriod.push({
        ...action.diary,
        id: nextDiaryId(state.diaryPeriod),
      });
      break;
    }
    case 'REMOVE_DIARY': {
      for (let i = 0; i < newState.diary.length; i++) {
        if (newState.diary[i].id == action.diaryId) {
          newState.diary.splice(i, 1);
        }
      }
      break;
    }
    default:
      return state;
  }
  return newState;
};
