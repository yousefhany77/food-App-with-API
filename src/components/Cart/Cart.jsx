import React from "react";
import Icon from "./Icon";
import "./cart.css";

import { useShoppingCart } from "../../context/CartContext";
const Cart = () => {
  const { cartQuantity, openCart } = useShoppingCart();

  return (
    <div className="cart-container" onClick={openCart}>
      <span>
        <i>{cartQuantity}</i>
      </span>
      <Icon />
    </div>
  );
};

export default Cart;
