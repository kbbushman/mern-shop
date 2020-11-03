import { CART_ADD_ITEM } from '../constants/cartConstants';

const initialState = {cartItems: []};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const itemExists = state.cartItems.find((x) => x.product === item.prodcut);

      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => x.product === itemExists.product ? item : x),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;
  }
}
