import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
// import { clickHandler } from "../components/Menu/MealsForm";
const MealsContext = createContext([]);

export function useMealsContext() {
  return useContext(MealsContext);
}

export function MealsContextProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState();
  const fetchMeals = useCallback(async () => {
    console.log("Fetching...");
    setLoading(true);
    const response = await fetch(
      "https://food-api-10a66-default-rtdb.europe-west1.firebasedatabase.app/meals/-NAnw4t7-OqgA5Gyi_p1/meals.json"
    );
    if (!response.ok) {
      throw new Error("");
    }
    const data = await response.json();

    const MealsData = [];
    for (let key in data) {
      MealsData.push({
        id: data[key].idMeal,
        name: data[key].strMeal,
        image: data[key].strMealThumb,
        price: data[key].price || +data[key].idMeal % 100,
      });
    }

    setMeals(MealsData);
  }, []);
  useEffect(() => {
    fetchMeals().catch((error) => {
      setLoading(false);
      setErrors(error.message);
    });
    setLoading(false);
  }, []);

  return (
    <MealsContext.Provider value={{ meals, loading, errors }}>
      {children}
    </MealsContext.Provider>
  );
}
