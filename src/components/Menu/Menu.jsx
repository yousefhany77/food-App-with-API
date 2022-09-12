import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { useMealsContext } from "../../context/MealsContext.jsx";
import "./Menu.css";
import { nanoid } from "nanoid";

const Menu = () => {
  const [mealsData, setMeals] = useState([]);
  const { meals, loading, errors } = useMealsContext();
  useEffect(() => {
    const menuData = meals.map((menuItem, index) => (
      <MenuItem
        key={nanoid()}
        id={menuItem.id}
        name={menuItem.name}
        price={menuItem.price}
        image={menuItem.image}
      />
    ));
    setMeals((prevMenuMeals) => menuData);
  }, [meals]);
  if (errors) {
    return (
      <div className="menu-countainer">
        <div className="error fw-bold fs-">{errors}</div>
      </div>
    );
  }
  return (
    <div className="menu-countainer">
      <h1>MENU</h1>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <div className="menu-items">{mealsData}</div>
      )}
    </div>
  );
};

export default Menu;
