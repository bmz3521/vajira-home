/*
 *
 * Promotions actions
 *
 */

import { PromotionsConstants } from '@constants';

/* GET PROMOTIONS */
export function getPromotions(data) {
  return {
    type: PromotionsConstants.GET_PROMOTIONS_REQUEST,
    data,
  };
}
export function getPromotionsSuccess(result) {
  return {
    type: PromotionsConstants.GET_PROMOTIONS_SUCCESS,
    result,
  };
}
export function getPromotionsFailure(error) {
  return {
    type: PromotionsConstants.GET_PROMOTIONS_FAILURE,
    error,
  };
}
