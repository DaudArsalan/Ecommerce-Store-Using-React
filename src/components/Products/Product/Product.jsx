import React from "react";
import "./Product.scss";
import { useNavigate } from "react-router-dom";

const Product = ({ id, data }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="product-card" onClick={() => navigate("/product/" + id)}>
        <div className="image">
          <img
            src={
              process.env.REACT_APP_URL + data?.image?.data[0]?.attributes?.url
            }
            alt="products"
          />
        </div>
        <div className="product-detail">
          <span className="name">{data.title}</span>
          <span className="price">Rs {data.price}</span>
        </div>
      </div>
    </>
  );
};

export default Product;
