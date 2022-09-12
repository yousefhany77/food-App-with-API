import classes from "../Menu/MenuItem.module.css";
import { useShoppingCart } from "../../context/CartContext";
import { priceFormatter } from "../../utilities/priceFormater";
const MenuItem = ({ id, name, price, image }) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const itemCartQuantity = getItemQuantity(id);

  return (
    <div className={classes.MenuItem}>
      <div className={classes.MealDetails}>
        <img className={classes.Menuimg} src={image} alt={name} />
        <span>
          <h2 className="fw-bold fs-2">{name}</h2>
          <h3 className="text-muted fs-4">{priceFormatter(price)}</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            accusamus ipsa sunt ab eveniet nam est suscipit corporis.
            Praesentium, maiores?
          </p>
        </span>
      </div>
      <form
        className={classes.menuForm}
        onSubmit={() => event.preventDefault()}
      >
        <button
          onClick={() => decreaseCartQuantity(id)}
          className={classes.Formbutton}
        >
          -
        </button>
        <input
          type="number"
          name="quantity"
          min="1"
          max="10"
          value={itemCartQuantity}
          readOnly={true}
        />
        <button
          onClick={() => increaseCartQuantity(id)}
          className={classes.Formbutton}
        >
          +
        </button>
        <button
          onClick={() => removeFromCart(id)}
          className={classes.removeFromCart}
        >
          Remove
        </button>
      </form>
    </div>
  );
};

export default MenuItem;
