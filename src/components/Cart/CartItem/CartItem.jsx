import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { Context } from "../../../utils/context";
import "./CartItem.scss";

const CartItem = () => {
  const { cartItems, removeFromCart, cartProductQuantity } =
    useContext(Context);

  return (
    <>
      <div className="cart-products">
        {cartItems?.map((item) => {
          return (
            <div key={item.id} className="product">
              <div className="image">
                <img
                  src={
                    process.env.REACT_APP_URL +
                    item.attributes.image.data[0].attributes.url
                  }
                  alt="cartItem"
                />
              </div>
              <div className="product-details">
                <span className="name">{item.attributes.title}</span>
                <MdClose
                  className="close-btn"
                  onClick={() => removeFromCart(item)}
                />
                <div className="quantity-buttons">
                  <span onClick={() => cartProductQuantity("dec", item)}>
                    -
                  </span>
                  <span>{item.attributes.quantity}</span>
                  <span onClick={() => cartProductQuantity("inc", item)}>
                    +
                  </span>
                </div>
                <div className="text">
                  <span>{item.attributes.quantity}</span>
                  <span>x</span>
                  <span className="highlight">
                    Rs.{item.attributes.price * item.attributes.quantity}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CartItem;
