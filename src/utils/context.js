import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Context = createContext();

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(1);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const location = useLocation();

  // Scroll to Top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // How many items in the cart
  useEffect(() => {
    let count = 0;
    cartItems.map((item) => (count += item.attributes.quantity));
    setCartCount(count);
  }, [cartItems]);

  // display cart items from local storage when ever refresh the page
  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCartItems(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, []);

  // Saving cart items in localstorage
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subTotal = 0;
    myCart.map(
      (item) => (subTotal += item.attributes.price * item.attributes.quantity)
    );

    setCartSubtotal(subTotal);
  };

  // Add items to Cart
  const addToCart = (product, quantity) => {
    let items = [...cartItems];
    let index = items.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      items[index].attributes.quantity += quantity;
    } else {
      product.attributes.quantity = quantity;
      items = [...items, product];
    }

    setCartItems(items);
    saveCart(items);
  };

  // Remove items from cart
  const removeFromCart = (product) => {
    let items = [...cartItems];
    items = items.filter((item) => item.id !== product.id);
    setCartItems(items);
    saveCart(items);
  };

  // Handle quantity of products
  const cartProductQuantity = (type, product) => {
    let items = [...cartItems];
    let index = items?.findIndex((p) => p.id === product?.id);
    if (type === "inc") {
      items[index].attributes.quantity += 1;
    } else if (type === "dec") {
      if (items[index].attributes.quantity === 1) return;
      items[index].attributes.quantity -= 1;
    }
    setCartItems(items);
    saveCart(items);
  };

  return (
    <Context.Provider
      value={{
        categories,
        setCategories,
        products,
        setProducts,
        cartItems,
        setCartItems,
        cartCount,
        setCartCount,
        cartSubtotal,
        setCartSubtotal,
        addToCart,
        removeFromCart,
        cartProductQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
