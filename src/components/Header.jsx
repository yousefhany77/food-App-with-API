import classes from "./header.module.css";
import React, { useState } from "react";
import Cart from "./Cart/Cart";
import { MealsForm } from "./Menu/MealsForm";
const Header = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <header className={classes.header}>
      <h1>Food.</h1>
      <div className={classes.controler}>
        <span className="fw-bolder" onClick={() => setClicked((prev) => !prev)}>
          Add New Meal{" "}
          <img src="https://img.icons8.com/ios-filled/35/000000/plus-2-math.png" />
        </span>

        <Cart />
        {clicked && (
          <>
            <div className={classes.formContainerHeader}>
              {" "}
              <MealsForm />
            </div>
            <div
              className={`modal-backdrop fade show ${classes.overlay}` }
              onClick={() => setClicked(false)}
            ></div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
