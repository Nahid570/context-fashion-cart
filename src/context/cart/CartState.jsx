import { useReducer, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { CartReducer, sumItems } from "./CartReducer";
import {
  ADD_TO_CART,
  CHEKOUT_CART,
  CLEAR_CART,
  DECRESE_CART,
  INCRESE_CART,
  REMOVE_ITEM_FROM_CART,
} from "./CartTypes";

// Get products from Local Storage
const storage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const CartState = ({ children }) => {
  const [theme, setTheme] = useState(null);
  const [search, setSearch] = useState("");
  const initialState = {
    cartItems: storage,
    ...sumItems(storage),
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  // Theme provider
  useEffect(() => {
    const localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme) {
      setTheme(localStorageTheme);
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

// End of Theme Provider

  const addToCart = (payload) => {
    dispatch({ type: ADD_TO_CART, payload });
  };
  const increseCart = (payload) => {
    dispatch({ type: INCRESE_CART, payload });
  };
  const decreseCart = (payload) => {
    dispatch({ type: DECRESE_CART, payload });
  };
  const removeItemFromCart = (payload) => {
    dispatch({ type: REMOVE_ITEM_FROM_CART, payload });
  };
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const checkoutCart = () => {
    dispatch({ type: CHEKOUT_CART });
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartItems: state.cartItems,
        increseCart,
        decreseCart,
        removeItemFromCart,
        clearCart,
        checkoutCart,
        search,
        setSearch,
        theme,
        setTheme,
        // To access the total, we need to pass in the state
        ...state,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
