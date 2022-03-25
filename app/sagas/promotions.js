import { takeLatest, put, call } from 'redux-saga/effects';
import { PromotionAPI } from '@api';
import { PromotionsActions } from '@actions';
import { PromotionsConstants } from '@constants';

function* getPromotions({ data }) {
  try {
    const result = yield call(PromotionAPI.getPromotions, data);
    yield put(PromotionsActions.getPromotionsSuccess(result));
  } catch (e) {
    yield put(PromotionsActions.getPromotionsFailure(e));
  }
}

// Individual exports for testing
export default function* watchPromotionsSaga() {
  // Take Last Action Only
  yield takeLatest(PromotionsConstants.GET_PROMOTIONS_REQUEST, getPromotions);
}
