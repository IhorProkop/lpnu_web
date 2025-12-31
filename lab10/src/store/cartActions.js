export const ADD_TO_CART = "cart/add";
export const INCREASE_QTY = "cart/increaseQty";
export const DECREASE_QTY = "cart/decreaseQty";
export const REMOVE_FROM_CART = "cart/remove";
export const CLEAR_CART = "cart/clear";

export function addToCart(product, quantity = 1) {
  return {
    type: ADD_TO_CART,
    payload: { product, quantity },
  };
}

export function increaseQty(id) {
  return {
    type: INCREASE_QTY,
    payload: id,
  };
}

export function decreaseQty(id) {
  return {
    type: DECREASE_QTY,
    payload: id,
  };
}

export function removeFromCart(id) {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
}

export function clearCart() {
  return { type: CLEAR_CART };
}
