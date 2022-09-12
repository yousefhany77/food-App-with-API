import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./MealsForm.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
const formInputValues = {
  idMeal: nanoid(),
  price: "",
  strMeal: "",
  strMealThumb:
    "https://www.themealdb.com/images/media/meals/1549542877.jpg/preview",
};
export function MealsForm() {
  const [formData, setFormData] = useState(formInputValues);
  const [isSumbitting, setIsSumbitting] = useState();
  const [invalid, setInvalid] = useState({
    strMeal: false,
    price: false,
  });
  function submitHandler(event) {
    event.preventDefault();
    const sumbitData = async () => {
      const response = await fetch(
        "https://food-api-10a66-default-rtdb.europe-west1.firebasedatabase.app/meals/-NAnw4t7-OqgA5Gyi_p1/meals.json",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        } 
      );
      setIsSumbitting(true);
      if (response.ok) {
        const submitAnimatioin = setTimeout(function () {
          setIsSumbitting(false);
        }, 600);
        setFormData(formInputValues);
      }
      
    };

    sumbitData();
  }
  function onChangeHandler() {
    const Inpuntname = event.target.name;
    const value = event.target.value
    const strMealRegex = new RegExp(/[0-9]+/, "g");

    setFormData((prev) => {
      return {
        ...prev,
        [Inpuntname]:
          Inpuntname == "strMeal" ? value : value.replace(/\D+/g, ""),
      };
    });

    if (Inpuntname == "strMeal") {
      setInvalid((prev) => {
        return {
          ...prev,
          strMeal: strMealRegex.test(value),
        };
      });
    } else {
      setInvalid((prev) => {
        return {
          ...prev,
          price: !/\d+/g.test(value),
        };
      });
    }
    console.log(invalid, strMealRegex.test(value));
  }

  return (
      <Form
        className="form_ADD_MEAL shadow-sm px-4 py-4  bg-white rounded-3 w-100"
        onSubmit={submitHandler}
      >
        <Form.Group className="mb-3">
          <Form.Label>Meal Name</Form.Label>
          <Form.Control
            onChange={onChangeHandler}
            type="text"
            placeholder="Enter Meal's Name"
            name="strMeal"
            value={formData.strMeal}
            className={invalid.strMeal ? "invalid" : ""}
            required
          />
          {invalid.strMeal && (
            <p className="error">please enter string value</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="Price">
          <Form.Label>Meal Price</Form.Label>
          <Form.Control
            onChange={onChangeHandler}
            type="text"
            placeholder="Price"
            name="price"
            value={formData.price}
            className={invalid.price ? "invalid" : ""}
            required
          />
        </Form.Group>
        {invalid.price && <p className="error">please enter valid price</p>}
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Meals Description</Form.Label>
          <Form.Control
            readOnly={true}
            as="textarea"
            rows={3}
            value="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem dolor atque impedit saepe quia aperiam vel molestiae nemo quasi natus! Quisquam pariatur magni odio doloribus!"
          />
        </Form.Group>
        {isSumbitting && <p>Submitting...</p>}
        <Button variant="primary" type="submit" disabled={isSumbitting}>
          Submit
        </Button>
      </Form>

  );
}
