import React, { createContext, useContext, useReducer } from "react";
import cartReducer, { initialState } from "./cartReducer";

// Prepares the dataLayer
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

// Wrap our app and provide the Data layer
export const CartProvider = ({ children }) => {
    // Initialize from localStorage if available
    const initializer = (initialValue) => {
        try {
            const localData = localStorage.getItem("amazonCloneCart");
            return localData ? JSON.parse(localData) : initialValue;
        } catch (error) {
            console.error("Error reading from localStorage", error);
            return initialValue;
        }
    };

    const [state, dispatch] = useReducer(cartReducer, initialState, initializer);

    // Save to localStorage whenever state changes
    React.useEffect(() => {
        localStorage.setItem("amazonCloneCart", JSON.stringify(state));
    }, [state]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Pull information from the data layer
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
