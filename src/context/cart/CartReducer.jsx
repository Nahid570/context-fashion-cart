import {
  ADD_TO_CART,
  CHEKOUT_CART,
  CLEAR_CART,
  DECRESE_CART,
  INCRESE_CART,
  REMOVE_ITEM_FROM_CART,
} from "./CartTypes";

// Save cartItems to the local storage
const Storage = (cartItems) => {
  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

// Export function to calculate the total price of the cart and the total quantity of the cart
export const sumItems = (cartItems) => {
  Storage(cartItems);
  let itemCount = cartItems?.reduce(
    (total, product) => total + product.newQuantity,
    0
  );
  let total = cartItems
    .reduce((total, product) => total + product.newQuantity * product.price, 0)
    .toFixed(2);
  return { itemCount, total };
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          newQuantity: 1,
        });
      }
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
    case INCRESE_CART:
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload.id &&
        action.payload.newQuantity < action.payload.quantity
          ? { ...action.payload, newQuantity: action.payload.newQuantity + 1 }
          : item
      );
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
    case DECRESE_CART:
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload.id && action.payload.newQuantity > 1
          ? { ...action.payload, newQuantity: action.payload.newQuantity - 1 }
          : item
      );
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
    case REMOVE_ITEM_FROM_CART:
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        ...Storage([]),
      };
    case CHEKOUT_CART:
      return {
        ...state,
        cartItems: [],
        ...Storage([]),
      };

    default:
      return state;
  }
};
