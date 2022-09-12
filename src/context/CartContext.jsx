import { useState, createContext, useContext, useEffect } from "react";
import ShoppingCart from "../components/Cart/ShoppingCart";

const cartContext = createContext({});

export function useShoppingCart() {
  return useContext(cartContext);
}

export function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const jsonData = localStorage.getItem("shoppingCart");
    if (jsonData != null) {
      return JSON.parse(jsonData);
    }
    return [];
  });
  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
    // return ()=>{
    //   localStorage.removeItem("shoppingCart");
    // }
  }, [cartItems]);
  const [isOpen, setIsOpen] = useState(false);
  function getItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseCartQuantity(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(id) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }
  function clearCart() {
    setCartItems([]);
  }
  const cartQuantity = cartItems.reduce((quantity, item) => {
    return quantity + item.quantity;
  }, 0);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  return (
    <cartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        clearCart,
        setIsOpen,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </cartContext.Provider>
  );
}
