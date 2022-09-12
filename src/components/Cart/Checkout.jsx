import classes from "./checkout.module.css";
import { useMemo, useState } from "react";
import { useMealsContext } from "../../context/MealsContext";
import { useShoppingCart } from "../../context/CartContext";
import validate from "../../helpers/ValidateInput";

const Checkout = ({ closeCart, cartItems }) => {
  const { meals } = useMealsContext();
  const { clearCart, setIsOpen } = useShoppingCart();
  const [isCheckingout, setIsCheckouting] = useState(false);
  const intialState = useMemo(() => {
    return {
      name: "",
      email: "",
      address: "",
      zip: "",
      cart: cartItems.map((item) => {
        return meals.find((meal) => item.id === meal.id);
      }),
    };
  }, [cartItems]);

  const [formValues, setFormValues] = useState(intialState);
  const [touched, setTouched] = useState({});

  function checkoutHandler(event) {
    event.preventDefault();
    async function checkout() {
      setIsCheckouting(true);
      await fetch(
        "https://food-api-10a66-default-rtdb.europe-west1.firebasedatabase.app/meals/-NAnw4t7-OqgA5Gyi_p1/orders.json",
        {
          method: "POST",
          body: JSON.stringify(formValues),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFormValues(intialState);
      clearCart();
      window.alert("Thanks for your purchase!");
      setIsOpen(false);
      setIsCheckouting(false);
    }
    // validate client information before sending request
    for (const [name, value] of Object.entries(formValues)) {
      const message = validate(name, value);
      setErrors({ ...errors, [name]: message });
      setTouched({
        name: true,
        email: true,
        address: true,
        zip: true,
      });
    }
    Object.values(errors).length !== 0
      ? checkout()
      : setErrors({
          name: "Required field",
          email: "Required field",
          address: "Required field",
          zip: "Required field",
        });
  }
  const [errors, setErrors] = useState({});
  function handleBlur(event) {
    const { name, value } = event.target;
    const message = validate(name, value);
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: message });
  }
  function changeHandler(event) {
    const { name, value } = event.target;
    const message = validate(name, value);
    touched[name] && setErrors({ ...errors, [name]: message });
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  }
  return (
    <div className={classes.formConainer}>
      <h2>Checkout</h2>
      <form onSubmit={checkoutHandler} autoComplete="off">
        <div className={classes.inputControl}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            onChange={changeHandler}
            value={formValues.email}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <p className={classes.error}>{errors.email}</p>
          )}
        </div>
        <div className={classes.inputControl}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            onChange={changeHandler}
            value={formValues.name}
            onBlur={handleBlur}
          />
          {errors.name && <p className={classes.error}>{errors.name}</p>}
        </div>

        <div className={classes.inputControl}>
          <label htmlFor="address">Shipping Address</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Shipping Address"
            onChange={changeHandler}
            value={formValues.address}
            onBlur={handleBlur}
          />
          {errors.address && <p className={classes.error}>{errors.address}</p>}
        </div>
        <div className={classes.inputControl}>
          <label htmlFor="zip">Zip Code</label>
          <input
            type="text"
            name="zip"
            id="zip"
            placeholder="Zip Code"
            onChange={changeHandler}
            value={formValues.zip}
            onBlur={handleBlur}
          />
          {errors.zip && <p className={classes.error}>{errors.zip}</p>}
        </div>

        <div className={classes.formActions}>
          <button
            className="btn btn-outline-danger rounded-5"
            type="button"
            onClick={closeCart}
            disabled={isCheckingout}
          >
            Close
          </button>
          <button disabled={isCheckingout} className={classes.checkoutButton}>
            Checkout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
