import React, { createContext, useContext, useReducer } from "react";
import cartReducer, { initialState } from "./cartReducer";

// Prepares the dataLayer
export const CartContext = createContext();

// Wrap our app and provide the Data layer
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Pull information from the data layer
export const useCart = () => useContext(CartContext);
