import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { cartReducer, productReducer } from "./Reducers";
import axios from "axios";

const Cart = createContext();

const Context = ({ children }) => {
  const [post, setPost] = useState([]);

  const [state, dispatch] = useReducer(cartReducer, {
    products: post,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    searchQuery: "",
  });

  const getProducts = () => {
    axios.get("/api/products").then((res) => {
      const list = res.data.map((item) => ({
        id: item._id,
        name: item.nombre,
        price: Number(item.precio.$numberDecimal),
        image: item.img,
        inStock: item.stock,
        category: item.departamento,
      }));

      setPost(list);
      dispatch({ type: "FETCH_PRODUCTS", payload: { data: list } });
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
