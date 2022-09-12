import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import { priceFormatter } from "../../utilities/priceFormater";
import { useMealsContext } from "../../context/MealsContext";
import Checkout from "./Checkout";
import classes from "./ShoppingCart.module.css";
import { useState } from "react";
const ShoppingCart = ({ isOpen }) => {
  const { closeCart, cartQuantity, cartItems } = useShoppingCart();
  const { meals } = useMealsContext();
  const [isCheckout, setIsCheckout] = useState(false);
  return (
    <Offcanvas
      show={isOpen}
      placement="end"
      onHide={closeCart}
      className={isCheckout && cartItems.length > 0 && classes.offcanvas}
      style={{ width: "500px" }}
    >
      <div className={classes.shoppingcartBody}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold fs-2">
            Shopping Cart
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {!cartQuantity && <h1>No Items</h1>}
          <Stack gap={3}>
            {cartItems.map((item) => {
              return <CartItem key={item.id} {...item} />;
            })}
          </Stack>
        </Offcanvas.Body>
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            padding: "1rem",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            Total Amount
          </h1>{" "}
          <span
            style={{
              alignSelf: "flex-end",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {priceFormatter(
              cartItems.reduce((total, cartItem) => {
                const item = meals.find((item) => item.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </span>
          <button
            onClick={() => {
              setIsCheckout(true);
            }}
            className={classes.checkoutButton}
          >
            Checkout
          </button>
        </div>
      </div>
      {isCheckout && cartItems.length > 0 && (
        <Checkout
          closeCart={() => setIsCheckout(false)}
          cartItems={cartItems}
        />
      )}
    </Offcanvas>
  );
};

export default ShoppingCart;
