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
    case TYPES.ADD_FAVORITES_PRODUCTS:
      const { productId: addProductId, productName } = payload;
      return {
        ...state,
        favorites: [
          ...state.favorites,
          {
            id: addProductId,
            name: productName,
          },
        ],
      };
    case TYPES.DELETE_FAVORITES_PRODUCTS:
      const { productId: deleteProductId } = payload;
      const copyState = [...state.favorites];
      const indexOfProduct = copyState.findIndex(
        (item) => item.id === deleteProductId
      );
      const newFavorites = [
        ...copyState.slice(0, indexOfProduct),
        ...copyState.slice(indexOfProduct + 1),
      ];
      return {
        ...state,
        favorites: newFavorites,
      };
    case TYPES.INCREASE_TO_CART:
      const { productId: increaseProductId } = payload;
      const copyIncreaseCart = [...state.cart];
      const isInsideIncreaseCart = copyIncreaseCart.some(
        (item) => item.id === increaseProductId
      );
      if (isInsideIncreaseCart) {
        const indexOfProductCart = copyIncreaseCart.findIndex(
          (item) => item.id === increaseProductId
        );
        return {
          ...state,
          cart: [
            ...copyIncreaseCart.slice(0, indexOfProductCart),
            {
              id: increaseProductId,
              count: copyIncreaseCart[indexOfProductCart].count + 1,
            },
            ...copyIncreaseCart.slice(indexOfProductCart + 1),
          ],
        };
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            id: increaseProductId,
            count: 1,
          },
        ],
      };
    case TYPES.DECREASE_TO_CART:
      const { productId: decreaseProductId } = payload;
      const copyDecreaseCart = [...state.cart];
      const isInsideDecreaseCart = copyDecreaseCart.find(
        (item) => item.id === decreaseProductId && item.count > 1
      );
      const indexOfProductCart = copyDecreaseCart.findIndex(
        (item) => item.id === decreaseProductId
      );
      console.log(isInsideDecreaseCart);
      if (isInsideDecreaseCart) {
        return {
          ...state,
          cart: [
            ...copyDecreaseCart.slice(0, indexOfProductCart),
            {
              id: decreaseProductId,
              count: copyDecreaseCart[indexOfProductCart].count - 1,
            },
            ...copyDecreaseCart.slice(indexOfProductCart + 1),
          ],
        };
      }

      const newCart = [
        ...copyDecreaseCart.slice(0, indexOfProductCart),
        ...copyDecreaseCart.slice(indexOfProductCart + 1),
      ];
      return {
        ...state,
        cart: newCart,
      };
    default:
      return state;
  }
};
