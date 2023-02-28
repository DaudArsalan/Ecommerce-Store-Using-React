import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import { Context } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "../../utils/api";

import "./Cart.scss";

const Cart = ({ setToggleCart }) => {
  const { cartItems, cartSubtotal } = useContext(Context);
  const navigate = useNavigate();

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makePaymentRequest.post("/api/orders", {
        products: cartItems,
      });
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (err) {
      return err;
    }
  };

  return (
    <>
      <div className="cart">
        <div className="opacity"></div>
        <div className="cart-content">
          <div className="cart-header">
            <span className="heading">Shopping Cart</span>
            <span className="close-btn" onClick={() => setToggleCart(false)}>
              <MdClose />
              <span className="text">close</span>
            </span>
          </div>

          {!cartItems?.length && (
            <div className="empty">
              <BsCartX /> <span>No product in the cart</span>
              <button className="return-btn" onClick={() => navigate("/")}>
                RETURN TO SHOP
              </button>
            </div>
          )}

          {!!cartItems?.length && (
            <>
              <CartItem />

              <div className="cart-footer">
                <div className="subtotal">
                  <span className="text">Subtotal:</span>
                  <span className="text total">Rs.{cartSubtotal}</span>
                </div>
                <div className="btn">
                  <button className="checkout" onClick={handlePayment}>
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
