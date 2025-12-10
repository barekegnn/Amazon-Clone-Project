export const initialState = {
  basket: [],
  user: null,
};

// Selector
export const getCartTotal = (basket) => 
  basket?.reduce((amount, item) => item.price + amount, 0);

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
        // However, "increase quantity" implies object mutation or replacement.
        // Let's assume items have a 'quantity' property.
        // If the incoming item doesn't have quantity, we assume 1.
        
        // Actually, looking at typical clones, they often just allow duplicates in the array. 
        // BUT the prompt explicitly says: "or increases the quantity if the item already exists."
        // So I must handle quantity.
        
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
            basket: [...state.basket, { ...action.item, quantity: 1 }],
         };
      }

    case "REMOVE_FROM_CART":
       const indexToRemove = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasketRemove = [...state.basket];

      if (indexToRemove >= 0) {
        if (newBasketRemove[indexToRemove].quantity > 1) {
             newBasketRemove[indexToRemove] = {
               ...newBasketRemove[indexToRemove],
               quantity: newBasketRemove[indexToRemove].quantity - 1
             };
        } else {
            newBasketRemove.splice(indexToRemove, 1);
        }
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        )
      }

      return {
        ...state,
        basket: newBasketRemove
      };

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
