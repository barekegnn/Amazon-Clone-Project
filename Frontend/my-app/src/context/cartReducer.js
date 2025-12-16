export const initialState = {
  basket: [],
  user: null,
  savedForLater: [],
  promoCode: "",
  discount: 0,
};

// Selector
export const getCartTotal = (basket) => 
  basket?.reduce((amount, item) => (item.price * (item.quantity || 1)) + amount, 0);

const cartReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_CART":
      // Logic to check if item exists and increment quantity is better for a real app,
      // but standard Amazon clone tutorials often just push to array. 
      // The prompt asks to "increase the quantity if the item already exists".
      
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.item.id
      );
      
      let newBasket = [...state.basket];

      if (index >= 0) {
        // Item exists, update quantity if the item has a quantity prop, 
        // or effectively just push another one if we treat basket as a list of items.
        // Let's assume items have a 'quantity' property.
        
         newBasket[index] = {
           ...newBasket[index],
           quantity: (newBasket[index].quantity || 1) + 1
         };
         return {
            ...state,
            basket: newBasket,
         };

      } else {
         return {
            ...state,
            basket: [...state.basket, { ...action.item, quantity: 1, gift: false }],
         };
      }

    case "REMOVE_FROM_BASKET": // Renamed action type
       const indexToRemove = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasketRemove = [...state.basket];

      if (indexToRemove >= 0) {
        // If item exists, remove it
        newBasketRemove.splice(indexToRemove, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        )
      }

      return {
        ...state,
        basket: newBasketRemove
      };

    case "ADJUST_QUANTITY":
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.id ? { ...item, quantity: action.quantity } : item
        ),
      };

    case "SAVE_FOR_LATER":
      const itemToSave = state.basket.find((item) => item.id === action.id);
      if (!itemToSave) return state;

      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.id),
        savedForLater: [...state.savedForLater, itemToSave],
      };

    case "MOVE_TO_BASKET":
      const itemToMove = state.savedForLater.find((item) => item.id === action.id);
      if (!itemToMove) return state;

      return {
        ...state,
        savedForLater: state.savedForLater.filter((item) => item.id !== action.id),
        basket: [...state.basket, itemToMove],
      };

    case "REMOVE_FROM_SAVED":
      return {
        ...state,
        savedForLater: state.savedForLater.filter((item) => item.id !== action.id),
      };

    case "TOGGLE_GIFT":
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.id ? { ...item, gift: !item.gift } : item
        ),
      };

    case "APPLY_PROMO_CODE":
      if (action.promoCode === "DISCOUNT10") {
        return {
          ...state,
          promoCode: action.promoCode,
          discount: 0.1, // 10% discount
        };
      }
      return state;

    case "SET_USER":
      return {
        ...state,
        user: action.user
      }

    default:
      return state;
  }
};

export default cartReducer;
