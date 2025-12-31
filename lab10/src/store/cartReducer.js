import {
  ADD_TO_CART,
  INCREASE_QTY,
  DECREASE_QTY,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "./cartActions";

const initialState = {
  items: [],
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const { product, quantity } = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            alt: product.alt,
            quantity,
          },
        ],
      };
    }

    case INCREASE_QTY: {
      const id = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    case DECREASE_QTY: {
      const id = action.payload;
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }

    case REMOVE_FROM_CART: {
      const id = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== id),
      };
    }

    case CLEAR_CART:
      return initialState;

    default:
      return state;
  }
}
