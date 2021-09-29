import * as TYPES from '../base/types';
import { store } from '../states/index';

export const reducer = (state = store, action) => {
  const { payload, type } = action;

  switch (type) {
    case TYPES.FETCH_PRODUCTS:
      const { categories, commerce, products } = payload;
      return {
        ...state,
        shop: {
          commerce,
          products,
          categories,
        },
      };
    default:
      return state;
  }
};
