import React from "react";
import { useMealsContext } from "../../context/MealsContext";
import { useShoppingCart } from "../../context/CartContext";
import { Stack, Button } from "react-bootstrap";
import { priceFormatter } from "../../utilities/priceFormater";

const CartItem = ({ id, quantity }) => {
  const { meals } = useMealsContext();
  const { removeFromCart } = useShoppingCart();
  const item = meals.find((item) => item.id === id);
  if (item === null) return null;
  return (
    <Stack direction="horizontal" gap="2">
      <img
        src={item.image}
        alt={item.name}
        style={{ width: "7rem", aspectRatio: "1/1", borderRadius: "1rem" }}
      />
      <div className="me-auto">
        <div className="fw-bold">
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted fw-light">x{quantity}</span>
          )}
        </div>
        <div className="text-muted fw-normal">{priceFormatter(item.price)}</div>
      </div>
      <div>{priceFormatter(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(id)}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
