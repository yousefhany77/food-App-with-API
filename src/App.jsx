import "./App.css";
import Menu from "./components/Menu/Menu";
import Header from "./components/Header";
import { ShoppingCartProvider } from "./context/CartContext";
import { MealsContextProvider } from "./context/MealsContext";

function App() {
  return (
    <div className="wraper bg-light">
      <MealsContextProvider>
        <ShoppingCartProvider>
          <Header />
          <Menu />
        </ShoppingCartProvider>
      </MealsContextProvider>
    </div>
  );
}

export default App;
